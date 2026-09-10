// Plain-text chart format, matching the prototype's getPlainChart() desktop
// path verbatim (dental-charting.html L946-957): title + "=" underline, then
// "S: text" lines and a "P:\n  - step" list, blank line between sections.
// The MVP adds one line for CDT codes, which the prototype does not have.
import { displayValue, isFilled } from "./fieldValue.js";

// An empty blank leaves nothing behind, which strands the punctuation and the
// "#" that were written around it: "#{tooth} {surface} caries," becomes
// " caries," and "LA: {anesthetic} {dose}" becomes "LA:". This puts the sentence
// back together. It is cosmetic only — it never removes a word the template or
// the clinician supplied.
export function tidy(text) {
  return text
    .replace(/\s+/g, " ")
    // "#" belonged to an unfilled tooth number
    .replace(/#(?=[\s.,;:)]|$)/g, "")
    // "()" that held only blanks
    .replace(/\(\s*\)/g, "")
    .replace(/\(\s+/g, "(")
    .replace(/\s+\)/g, ")")
    // no space before closing punctuation
    .replace(/\s+([,.;:%])/g, "$1")
    // a separator that followed a label whose value is gone
    .replace(/:\s*[,;]/g, ":")
    .replace(/[,;]\s*\)/g, ")")
    // runs of separators left by consecutive empty blanks
    .replace(/([,;])(\s*[,;])+/g, "$1")
    .replace(/[,;:]\s*\./g, ".")
    .replace(/\.\s*\./g, ".")
    // a separator with nothing before it
    .replace(/^[\s,;:.]+/, "")
    .replace(/\s+/g, " ")
    .trim();
}

// True when a plan step said nothing except the labels around blanks that were
// left empty ("LA:" once the agent and dose are gone). Such a step is dropped
// rather than printed as a bare label; a step that still carries an instruction
// ("Caries excavation, prep") is kept, because its words came from the template.
export function isEmptyStep(text) {
  return !/[\p{L}\p{N}]/u.test(text) || /:$/.test(text);
}

// A unit written straight after a blank belongs to that blank: "PD {pd}mm" with
// no probing depth should not print "PD mm". Handled on the parts, where the
// association is still visible, rather than on the joined string.
const UNIT_AFTER_BLANK = /^(mm|%|Ncm|cc|\/10)/;

// A clause whose own words are nothing but a label ("PA:", "LA:", "Vitality:").
// With its blanks empty there is nothing left to say, and printing the label
// alone would read as though the test had been done and found nothing.
const LABEL_ONLY = /^[\s.;,]*[\p{L}\p{N} /()-]*:\s*[.;]?\s*$/u;

// A clause that runs into the blank and stops: "Px c/o", "Px for", "premature
// loss of", "Rotary NiTi to". The blank was the object of the phrase, so with it
// gone the words left behind are a sentence fragment, not a finding. The list is
// closed and drawn from the words that actually precede a blank in the
// templates — a clause ending in any other word still says something.
const TRAILING_CONNECTIVE = /(^|\s)(for|c\/o|of|at|to|with|from|by|in|on|per|and|±)\s*[.;,:]?\s*$/i;

// Keep a clause unless every blank in it was left empty AND what remains cannot
// stand on its own: punctuation, a bare label, or a phrase cut off at the
// preposition that introduced the blank. A clause that still carries an
// instruction is kept — those words came from the template, not from a blank.
function keepClause(clause) {
  if (clause.fields === 0 || clause.empty < clause.fields) return true;
  // The "#" of an unfilled tooth number is still in the raw text and would hide
  // the connective behind it ("Px c/o  #." vs "Px c/o ."). tidy() removes it
  // later; the tests below need it gone now.
  const text = clause.staticText.replace(/#(?=[\s.,;:)]|$)/g, "");
  if (!/[\p{L}\p{N}]/u.test(text)) return false;
  return !LABEL_ONLY.test(text) && !TRAILING_CONNECTIVE.test(text);
}

// Renders a line clause by clause — split on "." and ";" — so an empty blank can
// take its label with it. Doing this on the joined string is not possible: by
// then "PA: . Vitality: ." has lost which label belonged to which blank.
function renderParts(parts, fieldValues) {
  const isEmptyField = (part) => part?.type === "field" && !isFilled(fieldValues[part.id]);
  const clauses = [];
  let cur = { out: "", staticText: "", fields: 0, empty: 0 };
  const flush = () => {
    clauses.push(cur);
    cur = { out: "", staticText: "", fields: 0, empty: 0 };
  };

  parts.forEach((part, i) => {
    if (part.type === "field") {
      const value = fieldValues[part.id];
      cur.fields += 1;
      if (isFilled(value)) cur.out += displayValue(part.ph, value);
      else cur.empty += 1;
      return;
    }
    const text = isEmptyField(parts[i - 1])
      ? part.value.replace(UNIT_AFTER_BLANK, "")
      : part.value;
    // split keeps the separators, which close the clause they end
    for (const piece of text.split(/([.;])/)) {
      cur.out += piece;
      cur.staticText += piece;
      if (piece === "." || piece === ";") flush();
    }
  });
  flush();

  // Dropping the last clause takes the full stop with it and leaves the previous
  // clause's ";" ending the line. Put back the terminator the template had.
  const lastText = [...parts].reverse().find((p) => p.type === "text")?.value ?? "";
  const endedWithPeriod = /\.\s*$/.test(lastText);
  const kept = tidy(clauses.filter(keepClause).map((c) => c.out).join(""));
  if (!kept) return "";
  // "," and ";" only. A trailing ":" is left in place: it is what tells
  // isEmptyStep() that a plan step came out as a bare label ("LA:").
  return endedWithPeriod ? kept.replace(/[,;]$/, ".") : kept.replace(/[,;]$/, "");
}

export function getPlainChart({ procedureName, tokens, fieldValues, cdtCodes }) {
  let out = `${procedureName}\n${"=".repeat(procedureName.length)}\n\n`;

  out += `S: ${renderParts(tokens.S, fieldValues)}\n\n`;
  out += `O: ${renderParts(tokens.O, fieldValues)}\n\n`;
  out += `A: ${renderParts(tokens.A, fieldValues)}\n\n`;
  const steps = tokens.P.map((step) => renderParts(step, fieldValues)).filter((t) => !isEmptyStep(t));
  out += `P:\n${steps.map((step) => `  - ${step}`).join("\n")}\n\n`;

  if (cdtCodes.length) {
    out += `CDT: ${cdtCodes.join(", ")}\n\n`;
  }

  return out.trim();
}

// Visit Note format, matching the prototype's getVnPlainText()
// (dental-charting.html L1464): "Procedure — Visit" title + "=" underline,
// a Date line, then S/O/A, the numbered-as-dashes step list, and the two
// closing Outcome/Next lines. Empty steps drop out, as they do there.
export function getPlainVisit({ procedureName, visitLabel, date, tokens, fieldValues, cdtCodes }) {
  const title = `${procedureName} — ${visitLabel}`;
  let out = `${title}\n${"=".repeat(title.length)}\nDate: ${date}\n\n`;

  out += `S: ${renderParts(tokens.S, fieldValues)}\n\n`;
  out += `O: ${renderParts(tokens.O, fieldValues)}\n\n`;
  out += `A: ${renderParts(tokens.A, fieldValues)}\n\n`;

  const steps = tokens.P.map((step) => renderParts(step, fieldValues)).filter((t) => !isEmptyStep(t));
  out += `P:\n${steps.map((step) => `  - ${step}`).join("\n")}\n\n`;

  if (cdtCodes.length) {
    out += `CDT: ${cdtCodes.join(", ")}\n\n`;
  }

  out += `Outcome: ${renderParts(tokens.outcome, fieldValues)}\n`;
  out += `Next: ${renderParts(tokens.next, fieldValues)}\n`;

  return out.trim();
}

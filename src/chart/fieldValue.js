import { MULTI_FIELDS } from "./data/soOptions.js";

// A field value is a string for a normal {ph} blank and an array of selected
// findings for a multi-select {+ph} blank. These helpers keep the difference in
// one place: an empty array counts as unfilled, and arrays render joined by the
// separator the field group declares (", " for symptoms, "; " for findings).
export function isFilled(value) {
  return Array.isArray(value) ? value.length > 0 : Boolean(value);
}

// An `ordered` group reads in the vocabulary's own order rather than the order
// the boxes were ticked: a surface code is written "MOD", never "DMO". Custom
// text that is not in the list keeps its relative position at the end.
function inOptionOrder(value, options) {
  const rank = (v) => {
    const i = options.indexOf(v);
    return i === -1 ? options.length : i;
  };
  return [...value].sort((a, b) => rank(a) - rank(b));
}

// The human name for a blank: multi-select groups carry their own label, the
// rest read the tab's PH_LABELS. Used to tell the clinician which blanks were
// left empty and therefore dropped from the draft.
export function fieldLabel(ph, labels) {
  return MULTI_FIELDS[ph]?.label ?? labels?.[ph] ?? ph;
}

export function displayValue(ph, value) {
  if (!isFilled(value)) return "";
  const group = MULTI_FIELDS[ph];
  if (!Array.isArray(value)) return value;
  const parts = group?.ordered ? inOptionOrder(value, group.options) : value;
  // prefix/suffix let an optional clause carry its own label and punctuation,
  // so the label disappears with the value instead of dangling in the sentence.
  return `${group?.prefix ?? ""}${parts.join(group?.sep ?? ", ")}${group?.suffix ?? ""}`;
}

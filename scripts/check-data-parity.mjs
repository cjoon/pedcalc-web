// Verifies that the chart data modules under src/chart/data are byte-for-byte
// equivalent (as JS values) to the literals in the read-only prototype
// dental-charting.html. Run after any edit to initialTemplates.js / dropdownOptions.js.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const prototypePath = path.join(
  process.env.HOME,
  "projects/charting-template/dental-charting.html"
);

const html = readFileSync(prototypePath, "utf8");

function extractLiteral(source, startMarker, endMarker) {
  const start = source.indexOf(startMarker);
  if (start === -1) throw new Error(`marker not found: ${startMarker}`);
  const braceStart = source.indexOf("{", start);
  const end = source.indexOf(endMarker, braceStart);
  if (end === -1) throw new Error(`end marker not found: ${endMarker}`);
  const literal = source.slice(braceStart, source.lastIndexOf("}", end) + 1);
  return new Function(`return (${literal});`)();
}

const htmlOptions = extractLiteral(html, "const OPTIONS=", "\nconst DEFAULT_OPTIONS");
const htmlPhLabels = extractLiteral(html, "const PH_LABELS=", "\n\n/* ===== FACTORY TEMPLATES");
const htmlFactoryTemplates = extractLiteral(
  html,
  "const FACTORY_TEMPLATES=",
  "\n\n/* ===== STORAGE"
);
const htmlVnTemplates = extractLiteral(html, "const VN_TEMPLATES=", "\nconst VN_OPTIONS");
// VN_OPTIONS is `Object.assign({}, ACTIVE_OPTIONS, { …extras… })`; only the
// third argument (the extras) lives in visitOptions.js.
const htmlVnExtraOptions = (() => {
  const start = html.indexOf("const VN_OPTIONS=");
  if (start === -1) throw new Error("marker not found: const VN_OPTIONS=");
  const line = html.slice(start, html.indexOf("\n", start));
  const literal = line.slice(line.indexOf("{complaint:"), line.lastIndexOf("})") + 1);
  return new Function(`return (${literal});`)();
})();

const { OPTIONS } = await import(
  path.join(repoRoot, "src/chart/data/dropdownOptions.js")
);
const { PH_LABELS } = await import(
  path.join(repoRoot, "src/chart/data/dropdownOptions.js")
);
const { FACTORY_TEMPLATES } = await import(
  path.join(repoRoot, "src/chart/data/initialTemplates.js")
);
const { TEMPLATES } = await import(path.join(repoRoot, "src/chart/data/templates.js"));
const { VISITS } = await import(path.join(repoRoot, "src/chart/data/visits.js"));
const { SO_OVERRIDES } = await import(path.join(repoRoot, "src/chart/data/chartOverrides.js"));
const { VN_OVERRIDES } = await import(path.join(repoRoot, "src/chart/data/vnOverrides.js"));
const { EXTRA_TEMPLATES, EXTRA_VISITS } = await import(
  path.join(repoRoot, "src/chart/data/extraTemplates.js")
);
const { VN_TEMPLATES } = await import(
  path.join(repoRoot, "src/chart/data/visitTemplates.js")
);
const { VN_EXTRA_OPTIONS } = await import(
  path.join(repoRoot, "src/chart/data/visitOptions.js")
);

let ok = true;
function compare(name, expected, actual) {
  const a = JSON.stringify(expected);
  const b = JSON.stringify(actual);
  if (a !== b) {
    ok = false;
    console.error(`MISMATCH: ${name} differs from dental-charting.html`);
  } else {
    console.log(`OK: ${name} matches dental-charting.html`);
  }
}

compare("OPTIONS", htmlOptions, OPTIONS);
compare("PH_LABELS", htmlPhLabels, PH_LABELS);
compare("FACTORY_TEMPLATES", htmlFactoryTemplates, FACTORY_TEMPLATES);
compare("VN_TEMPLATES", htmlVnTemplates, VN_TEMPLATES);
compare("VN_EXTRA_OPTIONS", htmlVnExtraOptions, VN_EXTRA_OPTIONS);

// A rendered template may differ from the prototype only where an override file
// declares it. Anything else — procedure names, tags, category labels, version
// ids and labels, and every field no override names — must still match, and any
// category or item the prototype does not have must come from extraTemplates.js.
//
// This is stricter than the old check, which compared "everything except S and O"
// as a lump: an A or P line can now be overridden, so the script has to know
// which specific fields were meant to change.
function checkRendered({ name, factory, rendered, overrides, extras, subKey, fields }) {
  let overrideCount = 0;
  let extraCount = 0;

  // A dropped category or item would otherwise pass unnoticed: the loops below
  // only walk what the builder produced.
  for (const [catKey, factoryCat] of Object.entries(factory)) {
    if (!rendered[catKey]) {
      ok = false;
      console.error(`MISMATCH: ${name} is missing prototype category "${catKey}"`);
      continue;
    }
    for (const itemKey of Object.keys(factoryCat.items)) {
      if (!rendered[catKey].items[itemKey]) {
        ok = false;
        console.error(`MISMATCH: ${name} is missing prototype item ${catKey}/${itemKey}`);
      }
    }
  }

  for (const [catKey, cat] of Object.entries(rendered)) {
    const factoryCat = factory[catKey];
    if (!factoryCat) {
      if (!extras[catKey]) {
        ok = false;
        console.error(`MISMATCH: ${name} has category "${catKey}" from neither the prototype nor extraTemplates.js`);
        continue;
      }
      extraCount += Object.keys(cat.items).length;
      continue;
    }
    if (cat.label !== factoryCat.label) {
      ok = false;
      console.error(`MISMATCH: ${name} ${catKey} label differs from dental-charting.html`);
    }
    for (const [itemKey, item] of Object.entries(cat.items)) {
      const factoryItem = factoryCat.items[itemKey];
      if (!factoryItem) {
        if (!extras[catKey]?.items?.[itemKey]) {
          ok = false;
          console.error(`MISMATCH: ${name} has ${catKey}/${itemKey} from neither the prototype nor extraTemplates.js`);
          continue;
        }
        extraCount += 1;
        continue;
      }
      if (item.name !== factoryItem.name || item.tag !== factoryItem.tag) {
        ok = false;
        console.error(`MISMATCH: ${name} ${catKey}/${itemKey} name/tag differs from dental-charting.html`);
      }
      const factorySubs = factoryItem[subKey];
      const subs = item[subKey];
      if (subs.length !== factorySubs.length) {
        ok = false;
        console.error(`MISMATCH: ${name} ${catKey}/${itemKey} has ${subs.length} ${subKey}, prototype has ${factorySubs.length}`);
        continue;
      }
      subs.forEach((sub, i) => {
        const factorySub = factorySubs[i];
        if (sub.id !== factorySub.id || sub.label !== factorySub.label) {
          ok = false;
          console.error(`MISMATCH: ${name} ${catKey}/${itemKey}/${sub.id} id/label differs from dental-charting.html`);
        }
        const declared = overrides[catKey]?.[itemKey]?.[factorySub.id] ?? {};
        for (const field of fields) {
          const overridden = declared[field] !== undefined;
          const same = JSON.stringify(sub[field]) === JSON.stringify(factorySub[field]);
          if (overridden) {
            overrideCount += 1;
            if (same) {
              console.warn(`NOTE: ${name} ${catKey}/${itemKey}/${sub.id} ${field} override is identical to the prototype — drop it`);
            }
          } else if (!same) {
            ok = false;
            console.error(`MISMATCH: ${name} ${catKey}/${itemKey}/${sub.id} ${field} differs from dental-charting.html with no override declared`);
          }
        }
      });
    }
  }

  console.log(`OK: ${name} matches dental-charting.html except ${overrideCount} declared override(s); ${extraCount} added item(s)`);
}

checkRendered({
  name: "TEMPLATES",
  factory: htmlFactoryTemplates,
  rendered: TEMPLATES,
  overrides: SO_OVERRIDES,
  extras: EXTRA_TEMPLATES,
  subKey: "versions",
  fields: ["S", "O", "A", "P"],
});

checkRendered({
  name: "VISITS",
  factory: htmlVnTemplates,
  rendered: VISITS,
  overrides: VN_OVERRIDES,
  extras: EXTRA_VISITS,
  subKey: "visits",
  fields: ["S", "O", "A", "steps", "outcome", "next"],
});

if (!ok) process.exit(1);

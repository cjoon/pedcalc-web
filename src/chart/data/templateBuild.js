// Shared plumbing for the two template builders (templates.js for the Initial
// Chart, visits.js for Visit Notes). Both do the same three things to the
// verbatim prototype data: check that an override targets something real, check
// that every "{ph}" in the resulting text resolves to a vocabulary entry, and
// merge in the procedures from extraTemplates.js.
//
// Everything here throws at module load rather than returning an error, so a
// typo in a template surfaces the moment the app or the parity script imports
// the data — not as a "[myTypo]" placeholder in a clinical note.
import { MULTI_FIELDS } from "./soOptions.js";

export function assert(condition, message) {
  if (!condition) throw new Error(message);
}

// Matches "{ph}", "{+ph}" and the optional forms "{?ph}" / "{?+ph}", the same
// grammar tokenize.js parses.
const TOKEN_RE = /\{([?+]*)([^}]+)\}/g;

// Every multi-select blank must name a group in soOptions.js, and every
// single-value blank must have either a dropdown list or a label — a "{ph}" with
// neither is a typo that would render an unfillable blank.
export function validateText(text, where, options, labels) {
  for (const match of text.matchAll(TOKEN_RE)) {
    const [, flags, ph] = match;
    if (flags.includes("+")) {
      assert(MULTI_FIELDS[ph], `${where} references unknown multi-select group "${ph}"`);
    } else {
      assert(
        options[ph] !== undefined || labels[ph] !== undefined,
        `${where} references unknown field "${ph}" (no list in OPTIONS/OPTION_OVERRIDES, no label)`
      );
    }
  }
}

// The reverse of the builders' own lookup: they walk the factory data and ask
// for an override, so an override filed under a category or item key that does
// not exist is simply never consulted. Nothing failed, and the clinical wording
// it was meant to apply just never reached the note. Checking the other
// direction turns that typo into a load-time error.
export function validateOverridePaths(overrides, factory, fileName, subKey) {
  for (const [catKey, cat] of Object.entries(overrides)) {
    const factoryCat = factory[catKey];
    assert(factoryCat, `${fileName}: category "${catKey}" does not exist in the prototype data`);
    for (const [itemKey, item] of Object.entries(cat)) {
      const factoryItem = factoryCat.items[itemKey];
      assert(factoryItem, `${fileName}: ${catKey}/${itemKey} does not exist in the prototype data`);
      for (const subId of Object.keys(item)) {
        assert(
          factoryItem[subKey].some((v) => v.id === subId),
          `${fileName}: ${catKey}/${itemKey}/${subId} does not exist in the prototype data`
        );
      }
    }
  }
}

// Adds the categories and items of `extras` to `base`. New categories are taken
// whole; a category that already exists gains only its new items. Reusing a
// factory item key is rejected: an addition must never silently shadow the
// prototype data the parity script is there to protect.
export function mergeExtras(base, extras) {
  const out = { ...base };
  for (const [catKey, cat] of Object.entries(extras)) {
    const existing = out[catKey];
    if (!existing) {
      out[catKey] = { ...cat, items: { ...cat.items } };
      continue;
    }
    const items = { ...existing.items };
    for (const [itemKey, item] of Object.entries(cat.items)) {
      assert(
        !items[itemKey],
        `extraTemplates.js: ${catKey}/${itemKey} already exists in the prototype data — pick a new key`
      );
      items[itemKey] = item;
    }
    out[catKey] = { ...existing, items };
  }
  return out;
}

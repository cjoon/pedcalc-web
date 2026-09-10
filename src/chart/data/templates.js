import { FACTORY_TEMPLATES } from "./initialTemplates.js";
import { SO_OVERRIDES } from "./chartOverrides.js";
import { EXTRA_TEMPLATES } from "./extraTemplates.js";
import { CHART_OPTIONS, CHART_LABELS } from "./fieldVocabulary.js";
import { assert, validateText, mergeExtras, validateOverridePaths } from "./templateBuild.js";

// Imports carry explicit .js extensions so scripts/check-data-parity.mjs can
// load this module under plain node, not just through Vite.
// The procedure list the Initial Chart tab actually renders: the verbatim
// prototype data with the overridden S/O/A/P lines swapped in, plus the
// procedures from extraTemplates.js. Everything an override does not name
// (name, tag, version labels) is copied through untouched, and the checks below
// fail loudly at module load if an override drifts out of sync.
const OVERRIDABLE_FIELDS = ["S", "O", "A", "P"];

function buildTemplates() {
  validateOverridePaths(SO_OVERRIDES, FACTORY_TEMPLATES, "chartOverrides.js", "versions");
  const out = {};
  for (const [catKey, cat] of Object.entries(FACTORY_TEMPLATES)) {
    const items = {};
    for (const [itemKey, item] of Object.entries(cat.items)) {
      const overrides = SO_OVERRIDES[catKey]?.[itemKey] ?? {};
      items[itemKey] = {
        ...item,
        versions: item.versions.map((version) => {
          const override = overrides[version.id] ?? {};
          const where = `chartOverrides.js: ${catKey}/${itemKey}/${version.id}`;
          const extraKeys = Object.keys(override).filter((k) => !OVERRIDABLE_FIELDS.includes(k));
          assert(
            extraKeys.length === 0,
            `${where} may only override ${OVERRIDABLE_FIELDS.join(", ")} (got ${extraKeys.join(", ")})`
          );
          // A P override replaces the whole step list; there is no per-step merge.
          assert(
            override.P === undefined || Array.isArray(override.P),
            `${where} P override must be an array of steps`
          );
          return {
            ...version,
            S: override.S ?? version.S,
            O: override.O ?? version.O,
            A: override.A ?? version.A,
            P: [...(override.P ?? version.P)],
          };
        }),
      };
    }
    out[catKey] = { ...cat, items };
  }
  return mergeExtras(out, EXTRA_TEMPLATES);
}

function validateTemplates(templates) {
  for (const [catKey, cat] of Object.entries(templates)) {
    for (const [itemKey, item] of Object.entries(cat.items)) {
      for (const version of item.versions) {
        const where = `${catKey}/${itemKey}/${version.id}`;
        for (const field of ["S", "O", "A"]) {
          validateText(version[field], `${where} ${field}`, CHART_OPTIONS, CHART_LABELS);
        }
        version.P.forEach((step, i) =>
          validateText(step, `${where} P[${i}]`, CHART_OPTIONS, CHART_LABELS)
        );
      }
    }
  }
  return templates;
}

export const TEMPLATES = validateTemplates(buildTemplates());

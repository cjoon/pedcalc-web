import { VN_TEMPLATES } from "./visitTemplates.js";
import { VN_OVERRIDES } from "./vnOverrides.js";
import { EXTRA_VISITS } from "./extraTemplates.js";
import { VISIT_OPTIONS, VISIT_LABELS } from "./fieldVocabulary.js";
import { assert, validateText, mergeExtras } from "./templateBuild.js";

// The procedure list the Visit Note tab actually renders: VN_TEMPLATES verbatim
// with the overridden lines swapped in, plus the visits from extraTemplates.js.
// Mirror of templates.js for the Initial Chart; the difference is the shape of a
// version — `visits` with `steps`, `outcome` and `next` instead of `versions`
// with `P`.
const OVERRIDABLE_VISIT_FIELDS = ["S", "O", "A", "steps", "outcome", "next"];

function buildVisits() {
  const out = {};
  for (const [catKey, cat] of Object.entries(VN_TEMPLATES)) {
    const items = {};
    for (const [itemKey, item] of Object.entries(cat.items)) {
      const overrides = VN_OVERRIDES[catKey]?.[itemKey] ?? {};
      for (const visitId of Object.keys(overrides)) {
        assert(
          item.visits.some((v) => v.id === visitId),
          `vnOverrides.js: ${catKey}/${itemKey}/${visitId} has no matching visit in visitTemplates.js`
        );
      }
      items[itemKey] = {
        ...item,
        visits: item.visits.map((visit) => {
          const override = overrides[visit.id] ?? {};
          const where = `vnOverrides.js: ${catKey}/${itemKey}/${visit.id}`;
          const extraKeys = Object.keys(override).filter(
            (k) => !OVERRIDABLE_VISIT_FIELDS.includes(k)
          );
          assert(
            extraKeys.length === 0,
            `${where} may only override ${OVERRIDABLE_VISIT_FIELDS.join(", ")} (got ${extraKeys.join(", ")})`
          );
          assert(
            override.steps === undefined || Array.isArray(override.steps),
            `${where} steps override must be an array`
          );
          return {
            ...visit,
            S: override.S ?? visit.S,
            O: override.O ?? visit.O,
            A: override.A ?? visit.A,
            steps: [...(override.steps ?? visit.steps)],
            outcome: override.outcome ?? visit.outcome,
            next: override.next ?? visit.next,
          };
        }),
      };
    }
    out[catKey] = { ...cat, items };
  }
  return mergeExtras(out, EXTRA_VISITS);
}

function validateVisits(visits) {
  for (const [catKey, cat] of Object.entries(visits)) {
    for (const [itemKey, item] of Object.entries(cat.items)) {
      for (const visit of item.visits) {
        const where = `${catKey}/${itemKey}/${visit.id}`;
        for (const field of ["S", "O", "A", "outcome", "next"]) {
          validateText(visit[field] ?? "", `${where} ${field}`, VISIT_OPTIONS, VISIT_LABELS);
        }
        visit.steps.forEach((step, i) =>
          validateText(step, `${where} steps[${i}]`, VISIT_OPTIONS, VISIT_LABELS)
        );
      }
    }
  }
  return visits;
}

export const VISITS = validateVisits(buildVisits());

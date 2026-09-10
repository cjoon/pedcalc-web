// The two dropdown vocabularies the app renders, assembled in one place so the
// UI (FieldOptionsContext, VisitView) and the template validators
// (templates.js, visits.js, scripts/check-data-parity.mjs) can never disagree
// about which "{ph}" keys exist.
//
// Layering, innermost first:
//   OPTIONS / PH_LABELS      verbatim prototype lists (dropdownOptions.js)
//   OPTION_OVERRIDES / …     audit corrections and new keys (optionOverrides.js)
//   VN_EXTRA_OPTIONS         verbatim Visit-Note-only lists (visitOptions.js)
// The Visit Note order matches the prototype's
// `Object.assign({}, ACTIVE_OPTIONS, {…extras…})` (dental-charting.html L1320),
// so a key the prototype redefines for visit notes still wins there.
//
// Explicit .js extensions: this module is loaded by scripts/check-data-parity.mjs
// under plain node, not only through Vite.
import { OPTIONS, PH_LABELS } from "./dropdownOptions.js";
import { OPTION_OVERRIDES, LABEL_OVERRIDES, VISIT_LABEL_OVERRIDES } from "./optionOverrides.js";
import { VN_EXTRA_OPTIONS } from "./visitOptions.js";

export const CHART_OPTIONS = { ...OPTIONS, ...OPTION_OVERRIDES };
export const CHART_LABELS = { ...PH_LABELS, ...LABEL_OVERRIDES };

export const VISIT_OPTIONS = { ...CHART_OPTIONS, ...VN_EXTRA_OPTIONS };
export const VISIT_LABELS = { ...CHART_LABELS, ...VISIT_LABEL_OVERRIDES };

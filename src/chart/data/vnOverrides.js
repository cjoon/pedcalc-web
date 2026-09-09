// Visit Note S/O/A/steps rewrites layered over VN_TEMPLATES so the prototype
// data in visitTemplates.js stays byte-identical (see
// scripts/check-data-parity.mjs). Same mechanism as chartOverrides.js; the
// fields a visit can override are S, O, A, steps, outcome and next.
//
// Scope, deliberately narrow (2026-09-08 template audit): only the lines that
// were wrong or that contradicted another line in the same note. The rest of the
// Visit Note vocabulary is still the prototype's fixed sentences, which is a
// separate round of clinical review.
//
//   - srp / perio_maint A read "{stage} periodontitis", and {stage} is the
//     dropdown shared with the implant second-stage timing list — it offered
//     "3 mo" as a periodontitis stage. Replaced with the 2017 World Workshop
//     extent / stage / grade blanks, and maintenance now carries the published
//     status wording instead of asserting stability.
//   - The endo A lines named a diagnosis (or none) independently of what was
//     recorded; they now carry the AAE pulpal + periapical categories, matching
//     the Initial Chart.
//   - direct_resto A used {diagnosis}, a five-item list predating the AAE
//     terminology.
//   - extraction v2 O said "impacted/retained root" as one fixed phrase, which
//     cannot express the depth of impaction.
//   - tmd A asserted "Myofascial pain + bruxism"; DC/TMD Axis I has 11
//     categories and bruxism is a behavior, not one of them.
//
// The {dose} cartridge-volume fix that every LA step needs arrives through
// optionOverrides.js instead, so no step list is overridden here.
const PERIO_STAGING = "{?+perioExtent} {?+perioStage} {?+perioGrade}";

export const VN_OVERRIDES = {
  restorative: {
    direct_resto: {
      v1: { A: "#{tooth} {+restoDx}." },
    },
  },
  endo: {
    rct: {
      v1: { A: "#{tooth} {+pulpalDx}; {+periapicalDx}." },
    },
    pulpotomy: {
      v1: { A: "#{tooth} {+pulpalDx}; {+periapicalDx} — pulpotomy indicated." },
    },
    pulpectomy: {
      v1: { A: "#{tooth} {+pulpalDx}; {+periapicalDx} — pulpectomy indicated." },
    },
    apicoectomy: {
      v1: { A: "#{tooth} {+pulpalDx}; {+periapicalDx} — surgical endo indicated." },
    },
  },
  surgical: {
    extraction: {
      v2: { O: "#{tooth} {+impaction}; {+surgFindings}." },
    },
  },
  perio: {
    srp: {
      v1: { A: `${PERIO_STAGING} periodontitis — active SRP.` },
    },
    perio_maint: {
      v1: { A: `${PERIO_STAGING} periodontitis — {+perioStatus}.` },
    },
  },
  general: {
    tmd: {
      v1: { A: "{+tmdDx}; {?+tmdComorbid}." },
    },
  },
};

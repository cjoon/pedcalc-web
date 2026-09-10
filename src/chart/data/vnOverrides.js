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
//
// 2026-09-09, A-line round. Most Visit Note assessments are correct as written:
// a follow-up appointment's A is a statement of what that visit was for ("crown
// delivery", "Post-op review", "Membrane removal"), and the diagnosis belongs to
// the workup, not repeated at every recall. Two cases are not:
//
//   (a) the line asserts a diagnosis that may be wrong — checkup's "Healthy
//       dentition." regardless of what the exam found;
//   (b) it is a procedure's FIRST visit and the note records only what was done,
//       with no diagnosis anywhere — the visit where the treatment is delivered
//       is where the reason for it has to be on the record.
//
// Only those are overridden, and only with vocabulary the Initial Chart already
// uses. Where a diagnosis exists but no group covers it — removable pros
// (edentulism) and frenectomy (aberrant frenum attachment) — the line is left
// alone rather than forced into an approximate category.
const PERIO_STAGING = "{?+perioExtent} {?+perioStage} {?+perioGrade}";

// The periodontal diagnosis clause, same shape as the Initial Chart's. Extent,
// stage and grade are optional, so they vanish on the mucogingival cases where
// staging does not apply and the line stays short.
const PERIO_DX = `${PERIO_STAGING} {+perioDx}`;

export const VN_OVERRIDES = {
  restorative: {
    direct_resto: {
      v1: { A: "#{tooth} {+restoDx}." },
    },
    fixed_pros: {
      v1: { A: "#{tooth} {+restoDx} — full coverage crown indicated." },
    },
    indirect_resto: {
      v1: { A: "#{tooth} {+restoDx} — {restoType} indicated." },
    },
    ssc: {
      v1: { A: "#{tooth} {+restoDx} — SSC indicated." },
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
    vpt: {
      v1: { A: "#{tooth} {+pulpalDx}; {+periapicalDx} — {vptType}." },
    },
    apicoectomy: {
      v1: { A: "#{tooth} {+pulpalDx}; {+periapicalDx} — surgical endo indicated." },
    },
  },
  surgical: {
    extraction: {
      v1: { A: "#{tooth} {+surgDx} — simple extraction." },
      v2: {
        O: "#{tooth} {+impaction}; {+surgFindings}.",
        A: "#{tooth} {+surgDx} — surgical extraction.",
      },
    },
    implant_surg: {
      v1: { A: "#{tooth} {+implantSite} — implant placement." },
    },
    bone_graft: {
      v1: { A: "#{tooth} {+surgDx} — socket preservation." },
    },
  },
  perio: {
    srp: {
      v1: { A: `${PERIO_STAGING} periodontitis — active SRP.` },
      v3: { A: "Post-SRP response: {response} — {+perioStatus}." },
    },
    perio_maint: {
      v1: { A: `${PERIO_STAGING} periodontitis — {+perioStatus}.` },
    },
    gtr: {
      v1: { A: `#{tooth} ${PERIO_DX} — GTR.` },
    },
    ctg: {
      v1: { A: `#{tooth} ${PERIO_DX} — CTG root coverage.` },
    },
    fgg: {
      v1: { A: `#{tooth} ${PERIO_DX} — FGG.` },
    },
  },
  general: {
    checkup: {
      v1: { A: "{+examDx}; caries risk {+cariesRisk}." },
    },
    tmd: {
      v1: { A: "{+tmdDx}; {?+tmdComorbid}." },
    },
  },
};

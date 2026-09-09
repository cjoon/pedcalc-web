// Initial Chart S/O/A/P rewrites layered over FACTORY_TEMPLATES so the original
// prototype data in initialTemplates.js stays byte-identical (see
// scripts/check-data-parity.mjs). Each entry may override any of S, O, A and P;
// a P override replaces the whole step array.
//
// What changed and why: the prototype hard-coded symptoms, findings AND
// diagnoses into the sentence. Here each S/O carries a "{+group}" multi-select
// blank (vocabulary in soOptions.js) so findings are picked per patient.
// Structural blanks that are single-valued or numeric ({grade}, {pd}, {height},
// …) are kept as they were. Drafted 2026-09-06, extended to A lines 2026-09-08.
//
// The rule the A lines follow: findings belong in O, diagnosis belongs in A.
//   - Endo A carries the AAE pulpal + periapical categories, so the note can no
//     longer print one diagnosis in O and a different hard-coded one in A.
//   - Perio A carries the 2017 World Workshop diagnosis, which moved out of O.
//     This also retires the prototype's "Generalized {stage} periodontitis",
//     whose {stage} dropdown is shared with the implant second-stage timing list
//     and therefore offered "3 mo" as a periodontitis stage.
//   - Restorative, exam, implant, sinus and TMD A lines became picks instead of
//     fixed assertions ("reversible pulpitis 2° caries", "Healthy dentition",
//     "Adequate bone for placement", "Myofascial pain + sleep bruxism").
//   - Extraction A asserted "non-restorable" on both versions, which contradicts
//     the orthodontic, periodontal, pericoronitis and over-retained-primary
//     reasons in surgSx; it now carries the surgDx pick.
//
// Optional blanks ("{?+ph}") disappear from the note when left empty: staging and
// grading apply to periodontitis only, so for peri-implant conditions,
// gingivitis or health they drop out. A second optional blank holds the older
// 1999 AAP diagnosis for charts that still use it; it carries its own
// "1999 AAP:" label and closing period.
//
// P is not overridden in this round. The {dose} and {size} lists that the P
// steps read are corrected once in optionOverrides.js instead.

// The perio diagnosis clause, identical on every periodontal A line. Extent,
// stage and grade are optional; the 1999 AAP equivalent carries its own label.
const PERIO_DX = "{?+perioExtent} {?+perioStage} {?+perioGrade} {+perioDx}. {?+perioDx1999}";

export const SO_OVERRIDES = {
  restorative: {
    direct_resto: {
      v1: {
        S: "Px c/o {+restoSx} #{tooth}.",
        O: "#{tooth} {+surfaces} caries, ICDAS {grade}; {+restoFindings}.",
        A: "#{tooth} {+restoDx}.",
      },
    },
    indirect_resto: {
      v1: {
        S: "Px for #{tooth} {restoType}; {+restoSx}.",
        O: "#{tooth} {+restoFindings}.",
      },
    },
    fixed_pros: {
      v1: {
        S: "Px for #{tooth} crown prep; {+restoSx}.",
        O: "#{tooth} {existing} restoration; {+restoFindings}.",
      },
    },
    removable_pros: {
      v1: {
        S: "Px for {prosType} fabrication; {+prosSx}.",
        O: "{archDesc}. {kennedy}; {+prosFindings}.",
      },
    },
    ssc: {
      v1: {
        S: "Pediatric Px, #{tooth} (primary); {+restoSx}.",
        O: "#{tooth} {+restoFindings}.",
        A: "#{tooth} {+restoDx}, indicated for SSC.",
      },
    },
  },
  endo: {
    pulpotomy: {
      v1: {
        S: "#{tooth} c/o {+pulpalSx}.",
        O: "#{tooth} {+clinicalFindings}.",
        A: "#{tooth} {+pulpalDx}; {+periapicalDx} — pulpotomy indicated.",
      },
    },
    pulpectomy: {
      v1: {
        S: "#{tooth} c/o {+pulpalSx}.",
        O: "#{tooth} {+clinicalFindings}.",
        A: "#{tooth} {+pulpalDx}; {+periapicalDx} — pulpectomy indicated.",
      },
    },
    vpt: {
      v1: {
        S: "#{tooth} c/o {+pulpalSx}.",
        O: "#{tooth} {exposure}; {+clinicalFindings}.",
        A: "#{tooth} {+pulpalDx}; {+periapicalDx} — {vptType} indicated.",
      },
      v2: {
        S: "#{tooth} c/o {+pulpalSx}.",
        O: "#{tooth} {+clinicalFindings}.",
        A: "#{tooth} {+pulpalDx}; {+periapicalDx} — partial pulpotomy for apexogenesis.",
      },
    },
    rct: {
      v1: {
        S: "#{tooth} c/o {+pulpalSx}.",
        O: "#{tooth} {+clinicalFindings}.",
        A: "#{tooth} {+pulpalDx}; {+periapicalDx} — RCT indicated.",
      },
    },
    apicoectomy: {
      v1: {
        S: "#{tooth} c/o {+pulpalSx}.",
        O: "#{tooth} {+clinicalFindings}.",
        A: "#{tooth} {+pulpalDx}; {+periapicalDx} — surgical endo indicated.",
      },
    },
  },
  surgical: {
    extraction: {
      v1: {
        S: "Px c/o {+surgSx} #{tooth}.",
        O: "#{tooth} {+impaction}; {+surgFindings}.",
        A: "#{tooth} {+surgDx} — extraction indicated.",
      },
      v2: {
        S: "Px c/o {+surgSx} #{tooth}.",
        O: "#{tooth} {+impaction}; {+surgFindings}.",
        A: "#{tooth} {+surgDx} — surgical extraction indicated.",
      },
    },
    implant_surg: {
      v1: {
        S: "Px c/o {+surgSx} #{tooth}.",
        O: "#{tooth} CBCT: ridge width {width}mm, height {height}mm; {+surgFindings}.",
        A: "#{tooth} partial edentulism; {+implantSite}.",
      },
    },
    implant_resto: {
      v1: {
        S: "#{tooth} implant, {months} mo post-placement; {+surgSx}.",
        O: "#{tooth} {+surgFindings}.",
      },
    },
    sinus: {
      v1: {
        S: "Px for #{tooth} implant; {+surgSx}.",
        O: "CBCT: #{tooth} residual height {height}mm; {+surgFindings}.",
        A: "{+sinusIndication}.",
      },
      v2: {
        S: "Px for #{tooth} implant; {+surgSx}.",
        O: "CBCT: #{tooth} residual height {height}mm; {+surgFindings}.",
      },
    },
    bone_graft: {
      v1: {
        S: "#{tooth} {+surgSx}.",
        O: "#{tooth} {wallDesc} socket; {+surgFindings}.",
      },
      v2: {
        S: "#{tooth} area, {+surgSx}.",
        O: "{+surgFindings}.",
      },
    },
    gbr: {
      v1: {
        S: "Px for #{tooth} implant placement; {+surgSx}.",
        O: "#{tooth} site, {defect} expected. CBCT: {boneDesc}; {+surgFindings}.",
      },
      v2: {
        S: "#{tooth} {+surgSx}.",
        O: "#{tooth} site, {defect}. CBCT: {boneDesc}; {+surgFindings}.",
      },
    },
  },
  perio: {
    srp: {
      v1: {
        S: "Px {+perioSx}.",
        O: "Perio charting: generalized PD {pd}mm, {+cal}, bone loss {boneloss}%; {+quadTeeth}; {+perioFindings}.",
        A: PERIO_DX,
      },
    },
    perio_maint: {
      v1: {
        S: "Px {+perioSx}.",
        O: "Re-charting: localized residual PD {pd}mm at {sites}; BOP {bop}%; {+perioFindings}.",
        A: `{?+perioExtent} {?+perioStage} {?+perioGrade} {+perioDx} — {+perioStatus}. {?+perioDx1999}`,
      },
    },
    gtr: {
      v1: {
        S: "#{tooth} {+perioSx}.",
        O: "#{tooth} {wall} intrabony defect, PD {pd}mm, {+cal}; {+perioFindings}.",
        A: `#{tooth} localized intrabony defect, favorable for GTR. Perio Dx: ${PERIO_DX}`,
      },
    },
    crown_length: {
      v1: {
        S: "Px c/o {+perioSx}.",
        O: "{+perioFindings}.",
        A: `#{tooth} esthetic crown lengthening indicated. Perio Dx: ${PERIO_DX}`,
      },
      v2: {
        S: "#{tooth} {+perioSx}.",
        O: "#{tooth} {+perioFindings}.",
        A: `#{tooth} functional crown lengthening to establish ferrule + biologic width. Perio Dx: ${PERIO_DX}`,
      },
    },
    frenectomy: {
      v1: {
        S: "Px c/o {+perioSx}.",
        O: "Prominent {frenum} frenum; {+perioFindings}.",
        A: `Aberrant frenum attachment, frenectomy indicated. Perio Dx: ${PERIO_DX}`,
      },
    },
    ctg: {
      v1: {
        S: "#{tooth} {+perioSx}.",
        O: "#{tooth} {recClass} recession {recAmount}mm; {+perioFindings}.",
        A: `#{tooth} recession, root coverage via CTG indicated. Perio Dx: ${PERIO_DX}`,
      },
    },
    fgg: {
      v1: {
        S: "#{tooth} {+perioSx}.",
        O: "#{tooth} inadequate KT (<{kt}mm); {+perioFindings}.",
        A: `#{tooth} FGG to augment keratinized/attached gingiva. Perio Dx: ${PERIO_DX}`,
      },
    },
  },
  general: {
    checkup: {
      v1: {
        S: "Px for {+examSx}.",
        O: "{+examFindings} ({xray}).",
        A: `{+examDx}; caries risk {+cariesRisk}. Perio Dx: ${PERIO_DX}`,
      },
    },
    ortho: {
      v1: {
        S: "Px c/o {+orthoSx}.",
        O: "{classification}, crowding {crowding}mm, OJ {oj}mm, OB {ob}%; {+orthoFindings}.",
      },
    },
    tmd: {
      v1: {
        S: "Px c/o {+tmdSx}.",
        O: "MIO {mio}mm, {deviation}, {tmjFinding}; {+tmdFindings}.",
        A: "{+tmdDx}; {?+tmdComorbid}. Stabilization splint indicated.",
      },
    },
  },
};

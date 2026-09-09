// Multi-select vocabulary for the S/O/A blanks ("{+ph}" tokens in
// chartOverrides.js and vnOverrides.js).
//
// NOT from dental-charting.html — the prototype had fixed S/O sentences. This
// list was drafted 2026-09-06 for CJ's review: the phrases that appeared in the
// original S/O lines, plus common chairside findings around them. Wording only —
// no doses, no drug data. Edit freely; nothing here is a clinical constant.
//
// It is no longer a goal to reproduce a factory chart word for word: the audit
// below replaced several original phrasings (mixed pulp tests, "TTP", the
// Miller-only recession classes) with current, consistently named equivalents.
//
// Revised 2026-09-08 (template audit): symptoms and findings were separated
// where the two had been mixed, duplicate phrasings were collapsed, diagnosis
// phrases moved to their own single-select groups so they can sit on the A line,
// and the published classifications were brought up to date (2017 World
// Workshop recession types and treated-periodontitis status, DC/TMD Axis I).
//
// prefix/suffix wrap a non-empty value (label, closing period) so an optional
// clause leaves nothing behind when it is not used.
//
// single: true marks a group whose categories are mutually exclusive (the
// diagnostic classifications) — the picker then behaves like a radio list, not
// checkboxes.
//
// ordered: true prints the selections in this list's order instead of the order
// they were picked — only meaningful where the sequence carries meaning.
//
// sep: how the selections join in the sentence. Symptoms read as a comma list,
// objective findings as semicolon-separated observations, tooth surfaces as one
// run-together code ("MOD").
export const MULTI_FIELDS = {
  // Individual surfaces rather than the prototype's seven fixed combinations:
  // a restoration is documented (and billed) by which surfaces it covers, and
  // combinations such as MODB had no entry at all. Joined with no separator so
  // M + O + D prints "MOD".
  surfaces: {
    label: "Tooth surfaces",
    sep: "",
    // Printed in this order whatever order the surfaces were ticked in, so the
    // code always reads "MOD" and never "DMO" (see fieldValue.js).
    ordered: true,
    options: ["M", "O", "D", "B", "F", "L", "I"],
  },
  restoSx: {
    label: "Restorative symptoms",
    sep: ", ",
    options: [
      "sensitivity to cold",
      "sensitivity to hot",
      "sensitivity to sweets",
      "sensitivity on biting",
      "food impaction",
      "fractured restoration",
      "fractured tooth",
      "large caries",
      "lost restoration",
      "rough/sharp edge",
      "esthetic concern",
      "asymptomatic",
    ],
  },
  restoFindings: {
    label: "Restorative findings",
    sep: "; ",
    options: [
      "endodontically treated",
      "existing post/core",
      "caries",
      "deep caries",
      "recurrent caries",
      "defective restoration",
      "marginal breakdown",
      "fractured cusp",
      "cracked tooth",
      "large existing restoration",
      ">50% coronal structure lost",
      "not restorable with a direct restoration",
      "divergent walls after caries removal",
      "wear/attrition",
      "cold test (+) non-lingering",
      "PA: no PARL",
      "adequate ferrule",
      "occlusion stable",
    ],
  },
  // Restorative/prosthetic diagnosis for the A line, which the prototype
  // hard-coded ("reversible pulpitis 2° caries", "extensive caries") regardless
  // of what O actually recorded.
  restoDx: {
    label: "Restorative diagnosis",
    single: true,
    sep: ", ",
    options: [
      "dental caries",
      "deep caries",
      "recurrent caries",
      "reversible pulpitis 2° caries",
      "defective restoration",
      "fractured restoration",
      "fractured cusp",
      "cracked tooth",
      "non-carious cervical lesion",
      "extensive multi-surface caries",
      "previously pulp-treated tooth",
      "developmental defect (hypoplasia/MIH)",
    ],
  },
  prosSx: {
    label: "Prosthodontic symptoms",
    sep: ", ",
    options: [
      "missing teeth",
      "difficulty chewing",
      "ill-fitting denture",
      "sore spots under denture",
      "esthetic concern",
      "wants fixed option",
      "wants removable option",
    ],
  },
  prosFindings: {
    label: "Prosthodontic findings",
    sep: "; ",
    options: [
      "resorbed ridge",
      "well-formed ridge",
      "flabby ridge tissue",
      "tori present",
      "shallow vestibule",
      "adequate interarch space",
      "reduced interarch space",
      "abutment teeth sound",
      "denture stomatitis",
    ],
  },
  // Symptoms only. The findings that used to sit in this list (deep caries,
  // immature apex, fistula) belong in clinicalFindings — a patient reports pain,
  // the clinician records the lesion.
  pulpalSx: {
    label: "Pulpal/periapical symptoms",
    sep: ", ",
    options: [
      "pain",
      "spontaneous pain",
      "lingering pain to hot",
      "lingering pain to cold",
      "pain on biting",
      "keeps Px awake",
      "throbbing pain",
      "referred pain",
      "swelling",
      "pain relieved by cold",
      "hx trauma",
      "cold sensitivity",
      "mild discomfort",
      "sensitivity to sweets",
      "tender to touch",
      "gum boil / drainage noticed",
      "bad taste",
      "no lingering/spontaneous pain",
      "pain now resolved",
      "persistent symptoms after RCT",
      "asymptomatic",
    ],
  },
  // AAE Consensus Conference recommended diagnostic terminology (pulpal
  // column) — verbatim category names, source provided by CJ 2026-09-06.
  // The categories are mutually exclusive, so this group is single-select:
  // picking one replaces the previous choice.
  pulpalDx: {
    label: "Pulpal diagnosis (AAE)",
    single: true,
    sep: ", ",
    options: [
      "Normal pulp",
      "Reversible pulpitis",
      "Symptomatic irreversible pulpitis",
      "Asymptomatic irreversible pulpitis",
      "Pulp necrosis",
      "Previously treated",
      "Previously initiated therapy",
    ],
  },
  // AAE Consensus Conference recommended diagnostic terminology (apical
  // column). Mutually exclusive, same as pulpalDx.
  periapicalDx: {
    label: "Periapical diagnosis (AAE)",
    single: true,
    sep: ", ",
    options: [
      "Normal apical tissues",
      "Symptomatic apical periodontitis",
      "Asymptomatic apical periodontitis",
      "Acute apical abscess",
      "Chronic apical abscess",
      "Condensing osteitis",
    ],
  },
  // Everything observed at the chair or on the radiograph that is not itself a
  // diagnosis: pulp test results, caries depth, swelling, radiographic signs.
  // The test names are normalized to one convention — "<test> (+)" / "(−)" —
  // because the draft mixed "TTP" with "percussion (−)" and bundled cold and
  // heat into one option, which made the note read inconsistently.
  clinicalFindings: {
    label: "Clinical findings",
    sep: "; ",
    options: [
      "percussion (+)",
      "percussion (−)",
      "palpation (+)",
      "palpation (−)",
      "cold (+) non-lingering",
      "cold (+) lingering",
      "cold (−)",
      "heat (+) lingering",
      "EPT (+)",
      "EPT (−)",
      "bite test (+)",
      "mobility grade I",
      "mobility grade II",
      "mobility grade III",
      "sinus tract (traced with GP)",
      "intraoral swelling",
      "extraoral swelling",
      "no swelling",
      "deep caries",
      "caries to pulp",
      "crack line",
      "crown discoloration",
      "exposure with hemorrhage",
      "hemostasis achieved <5 min",
      "vital coronal pulp on amputation",
      "open/immature apex",
      "calcified canals",
      "prior RCT",
      "PA: PARL",
      "PA: no PARL",
      "PA: PARL persists",
      "PA: widened PDL",
      "PA: internal resorption",
      "PA: external resorption",
    ],
  },
  // Reasons for surgery and what the patient reports. Bone-height phrasing moved
  // to surgFindings (it is a CBCT reading, not a complaint), and the three
  // overlapping implant-intent options collapsed into one.
  surgSx: {
    label: "Surgical symptoms / request",
    sep: ", ",
    options: [
      "pain",
      "swelling",
      "non-restorable tooth",
      "hopeless periodontal prognosis",
      "over-retained primary tooth",
      "orthodontic extraction",
      "pericoronitis",
      "supernumerary tooth",
      "vertical root fracture",
      "missing tooth",
      "wants implant",
      "for implant site preparation",
      "for prosthetic restoration",
      "asymptomatic",
    ],
  },
  surgFindings: {
    label: "Surgical findings",
    sep: "; ",
    options: [
      "grossly decayed",
      "non-restorable",
      "ankylosed",
      "fractured root",
      "retained root",
      "mobility",
      "acute infection present",
      "no acute infection",
      "pre-op PA reviewed",
      "PA: caries to bone level",
      "PA: PARL",
      "edentulous",
      "healthy mucosa",
      "osseointegration confirmed",
      "no IAN proximity",
      "buccal plate intact",
      "knife-edge ridge",
      "inadequate horizontal width",
      "insufficient bone height",
      "moderate bone height",
      "severe ridge deficiency",
      "inadequate ridge width (<4mm)",
      "membrane intact",
      "no pathology",
      "no sinus pathology",
      "adequate keratinized tissue",
    ],
  },
  // Why the tooth is coming out, for the A line. The prototype asserted
  // "non-restorable" on both extraction versions, which contradicts the ortho,
  // periodontal, pericoronitis and over-retained-primary reasons now available
  // in surgSx. Its own group rather than a second {+surgSx} blank: the same
  // vocabulary twice in one note would have to be filled twice, since only
  // {tooth} syncs across blanks.
  surgDx: {
    label: "Reason for extraction",
    single: true,
    sep: ", ",
    options: [
      "non-restorable caries",
      "insufficient remaining tooth structure",
      "vertical root fracture",
      "hopeless periodontal prognosis",
      "failed endodontic treatment, retreatment not feasible",
      "acute apical abscess, tooth not restorable",
      "over-retained primary tooth",
      "impacted tooth",
      "pericoronitis",
      "supernumerary tooth",
      "extraction for orthodontic treatment",
      "extraction for prosthetic reasons",
    ],
  },
  // Depth of impaction, which decides the surgical approach and is the
  // distinction between the three impaction CDT codes. The draft had a single
  // "impacted" finding, which cannot express it.
  impaction: {
    label: "Impaction depth",
    single: true,
    sep: ", ",
    options: [
      "erupted",
      "soft-tissue impaction",
      "partial bony impaction",
      "complete bony impaction",
      "residual root(s)",
    ],
  },
  perioSx: {
    label: "Periodontal symptoms / reason",
    sep: ", ",
    options: [
      "bleeding gums",
      "referred for perio tx",
      "referred for regenerative tx",
      "hx treated periodontitis",
      "for perio maintenance",
      "deep perio pocket",
      "loose teeth",
      "bad taste/halitosis",
      "gingival recession",
      "root sensitivity",
      "esthetic concern",
      "gummy smile / short teeth",
      "midline diastema / high frenum attachment",
      "progressing recession",
      "subgingival caries/fracture, insufficient ferrule for crown",
      "no complaints",
    ],
  },
  perioFindings: {
    label: "Periodontal findings",
    sep: "; ",
    options: [
      "BOP+ localized",
      "BOP+ generalized",
      "≥30% sites BOP",
      "subgingival calculus",
      "supragingival calculus/plaque",
      "vertical bone loss",
      "horizontal bone loss",
      "furcation Class I",
      "furcation Class II",
      "furcation Class III",
      "mobility grade I",
      "mobility grade II",
      "mobility grade III",
      "tooth loss due to periodontitis",
      "suppuration",
      "recession",
      "stable vs prior",
      "excessive gingival display",
      "altered passive eruption",
      "bone sounding done",
      "fracture extends subgingival",
      "<2mm sound tooth above crest",
      "prominent frenum",
      "pull on interdental papilla",
      "blanching on traction",
      "adequate palatal donor",
      "shallow vestibule",
      "inadequate KT",
      "minimal attached gingiva",
    ],
  },
  // Clinical attachment loss — the primary staging criterion in the 2017 World
  // Workshop, which no perio line recorded. Interdental CAL at the worst site.
  cal: {
    label: "Interdental CAL (worst site)",
    single: true,
    sep: ", ",
    options: ["CAL 1–2 mm", "CAL 3–4 mm", "CAL ≥5 mm"],
  },
  // Number of teeth scaled per quadrant. Drives the choice between the two SRP
  // codes (≥4 teeth vs 1–3 teeth per quadrant).
  quadTeeth: {
    label: "Teeth scaled per quadrant",
    single: true,
    sep: ", ",
    options: ["≥4 teeth per quadrant", "1–3 teeth per quadrant"],
  },
  // 2017 World Workshop (AAP/EFP) classification of periodontal and peri-implant
  // diseases and conditions — category names as published. Source standard
  // chosen with CJ 2026-09-06. Each of the four fields is single-select; the
  // sentence reads "<extent> <stage> <grade> <diagnosis>", e.g.
  // "Generalized Stage III Grade B periodontitis".
  perioDx: {
    label: "Periodontal diagnosis (2017 WW)",
    single: true,
    sep: ", ",
    options: [
      "periodontal health",
      "periodontal health on a reduced periodontium",
      "dental biofilm-induced gingivitis",
      "gingivitis on a reduced periodontium",
      "non-biofilm-induced gingival disease",
      "periodontitis",
      "necrotizing gingivitis",
      "necrotizing periodontitis",
      "periodontitis as a manifestation of systemic disease",
      "periodontal abscess",
      "endo-periodontal lesion",
      "gingival recession (mucogingival deformity)",
      "occlusal trauma",
      "peri-implant health",
      "peri-implant mucositis",
      "peri-implantitis",
      "peri-implant soft/hard tissue deficiency",
    ],
  },
  perioExtent: {
    label: "Extent (2017 WW)",
    single: true,
    sep: ", ",
    options: ["Localized", "Generalized", "Molar-incisor pattern"],
  },
  // Staging and grading apply to periodontitis only, so these two blanks are
  // optional in the templates and disappear when left empty.
  perioStage: {
    label: "Stage (2017 WW)",
    single: true,
    sep: ", ",
    options: ["Stage I", "Stage II", "Stage III", "Stage IV"],
  },
  perioGrade: {
    label: "Grade (2017 WW)",
    single: true,
    sep: ", ",
    options: ["Grade A", "Grade B", "Grade C"],
  },
  // Disease status of a treated periodontitis patient, per the 2017 World
  // Workshop consensus (Chapple et al. 2018). The prototype's maintenance A line
  // asserted "Stable periodontitis" unconditionally; these are the published
  // criteria for the three possible states.
  perioStatus: {
    label: "Status of treated periodontitis (2017 WW)",
    single: true,
    sep: ", ",
    options: [
      "currently stable (BOP <10%, PD ≤4 mm, no BOP at 4 mm sites)",
      "currently in remission (BOP ≥10%, PD ≤4 mm, no BOP at 4 mm sites)",
      "currently unstable (PD ≥5 mm, or PD 4 mm with BOP)",
    ],
  },
  // 1999 AAP (Armitage) classification, kept alongside the 2017 one for charts
  // and referrals that still use the older terminology. Added at CJ's request
  // 2026-09-06. Severity is folded into the two graded categories because the
  // 1999 system qualifies only those; prefix/suffix carry the label and the
  // closing period so the whole clause disappears when nothing is selected.
  perioDx1999: {
    label: "Periodontal diagnosis (1999 AAP)",
    single: true,
    sep: ", ",
    prefix: "1999 AAP: ",
    suffix: ".",
    options: [
      "chronic periodontitis, slight (CAL 1–2 mm)",
      "chronic periodontitis, moderate (CAL 3–4 mm)",
      "chronic periodontitis, severe (CAL ≥5 mm)",
      "localized aggressive periodontitis",
      "generalized aggressive periodontitis",
      "plaque-induced gingivitis",
      "non-plaque-induced gingival disease",
      "periodontitis as a manifestation of systemic disease",
      "necrotizing ulcerative gingivitis (NUG)",
      "necrotizing ulcerative periodontitis (NUP)",
      "gingival abscess",
      "periodontal abscess",
      "pericoronal abscess",
      "combined periodontic-endodontic lesion",
      "developmental or acquired deformity/condition",
    ],
  },
  examSx: {
    label: "Exam reason / symptoms",
    sep: ", ",
    options: [
      "routine recall exam",
      "no complaints",
      "new patient exam",
      "emergency visit",
      "sensitivity",
      "bleeding gums",
      "esthetic concern",
    ],
  },
  examFindings: {
    label: "Exam findings",
    sep: "; ",
    options: [
      "EO/IO WNL",
      "restorations intact",
      "sealants intact",
      "no new caries clinically/radiographically",
      "BWX: no interproximal caries",
      "new caries noted",
      "perio stable, PD ≤3mm",
      "generalized plaque",
      "gingivitis",
      "generalized moderate–severe gingival inflammation",
      "calculus present",
      "wear facets",
      "no soft tissue lesions",
      "oral cancer screening negative",
    ],
  },
  // Assessment for the recall exam, which the prototype fixed as "Healthy
  // dentition, recall maintenance." whatever O said.
  examDx: {
    label: "Exam assessment",
    single: true,
    sep: ", ",
    options: [
      "healthy dentition",
      "dental caries",
      "gingivitis",
      "defective restoration(s)",
      "non-carious tooth wear",
      "requires periodontal evaluation",
    ],
  },
  // Caries risk assessment. The Visit Note recall had this ({cariesRisk}); the
  // Initial Chart exam had no way to record it.
  cariesRisk: {
    label: "Caries risk",
    single: true,
    sep: ", ",
    options: ["low", "moderate", "high"],
  },
  // Implant site assessment, replacing the prototype's unconditional
  // "Adequate bone for placement."
  implantSite: {
    label: "Implant site assessment",
    single: true,
    sep: ", ",
    options: [
      "adequate bone for placement",
      "adequate bone, simultaneous GBR planned",
      "insufficient bone — staged grafting required",
    ],
  },
  sinusIndication: {
    label: "Sinus augmentation indication",
    single: true,
    sep: ", ",
    options: [
      "posterior maxillary atrophy, residual height <5 mm — lateral window indicated",
      "posterior maxillary atrophy, residual height 5–7 mm — crestal approach indicated",
    ],
  },
  orthoSx: {
    label: "Ortho complaint",
    sep: ", ",
    options: [
      "crowding",
      "spacing",
      "protrusion",
      "malocclusion",
      "esthetic concern",
      "difficulty chewing",
      "wants ortho tx",
    ],
  },
  orthoFindings: {
    label: "Ortho findings",
    sep: "; ",
    options: [
      "records taken",
      "anterior crossbite",
      "posterior crossbite",
      "open bite",
      "deep bite",
      "midline deviation",
      "mixed dentition",
      "permanent dentition",
      "no impactions on pano",
    ],
  },
  tmdSx: {
    label: "TMD symptoms",
    sep: ", ",
    options: [
      "jaw pain",
      "AM headaches",
      "hx clenching/bruxism",
      "clicking",
      "locking",
      "limited opening",
      "ear pain",
      "neck/shoulder tension",
      "pain on chewing",
    ],
  },
  // "Familiar pain" is the DC/TMD examination term: pain on provocation that the
  // patient recognizes as their complaint. The draft's three separate muscle
  // tenderness entries said less and did not map to the criteria.
  tmdFindings: {
    label: "TMD findings",
    sep: "; ",
    options: [
      "familiar pain on palpation — masseter",
      "familiar pain on palpation — temporalis",
      "familiar pain on palpation — lateral pterygoid",
      "familiar pain on opening",
      "referred pain beyond the muscle palpated",
      "click on opening/closing",
      "crepitus",
      "MAO <40 mm",
      "no joint sounds",
      "wear facets present",
      "linea alba",
      "tongue scalloping",
      "no joint swelling",
      "no locking on exam",
    ],
  },
  // DC/TMD Axis I clinical diagnoses (Schiffman et al. 2014). Replaces the
  // prototype's hard-coded "Myofascial pain + sleep bruxism."
  tmdDx: {
    label: "TMD diagnosis (DC/TMD Axis I)",
    single: true,
    sep: ", ",
    options: [
      "Local myalgia",
      "Myofascial pain",
      "Myofascial pain with referral",
      "Arthralgia",
      "Headache attributed to TMD",
      "Disc displacement with reduction",
      "Disc displacement with reduction with intermittent locking",
      "Disc displacement without reduction with limited opening",
      "Disc displacement without reduction without limited opening",
      "Degenerative joint disease",
      "Subluxation",
    ],
  },
  // Bruxism is a behavior, not a DC/TMD Axis I diagnosis, so it sits in its own
  // optional clause instead of being welded to the diagnosis.
  tmdComorbid: {
    label: "Associated behavior",
    sep: ", ",
    options: ["probable sleep bruxism", "probable awake bruxism", "none reported"],
  },

  // Groups used only by the procedures in extraTemplates.js.
  emergSx: {
    label: "Emergency complaint",
    sep: ", ",
    options: [
      "pain",
      "swelling",
      "broken tooth",
      "lost filling/crown",
      "bleeding",
      "trauma",
      "loose tooth",
      "gum boil",
      "food impaction",
    ],
  },
  sealantFindings: {
    label: "Sealant site findings",
    sep: "; ",
    options: [
      "deep pits/fissures",
      "non-cavitated lesion (ICDAS 1–2)",
      "sound surface (ICDAS 0)",
      "sufficiently erupted",
      "isolation achievable",
      "no restoration present",
    ],
  },
  smType: {
    label: "Space maintainer type",
    single: true,
    sep: ", ",
    options: [
      "band & loop",
      "crown & loop",
      "distal shoe",
      "lower lingual holding arch",
      "Nance appliance",
      "transpalatal arch",
      "removable partial",
    ],
  },
  successorStatus: {
    label: "Successor tooth status",
    single: true,
    sep: ", ",
    options: [
      "successor present, >1 mm bone cover",
      "successor present, near eruption",
      "successor absent",
    ],
  },
};

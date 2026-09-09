// Replacement dropdown lists for single-value "{ph}" blanks, layered over the
// verbatim prototype OPTIONS in dropdownOptions.js (which stays byte-identical —
// see scripts/check-data-parity.mjs). A key here replaces the prototype list
// wholesale; keys absent here keep the prototype list.
//
// Why a layer instead of editing OPTIONS: several of these lists are referenced
// from the A/P text of many procedures at once ({dose} appears in ~20 of them),
// so fixing the vocabulary in one place beats overriding every template line.
//
// Wording only — no dose is computed from these strings. The anesthesia mg math
// lives in src/chart/anesthesia.js and reads medications.js.
export const OPTION_OVERRIDES = {
  // The prototype listed 1.8 / 3.6 / 0.9 mL, which is the 1.8 mL cartridge used
  // outside the US. A US dental cartridge is 1.7 mL — the volume CARPULE_ML,
  // medications.js and the AAPD 2025-26 anesthesia table all use.
  dose: [
    "½ carpule (0.85 mL)",
    "1 carpule (1.7 mL)",
    "1½ carpules (2.55 mL)",
    "2 carpules (3.4 mL)",
    "3 carpules (5.1 mL)",
  ],
  // ICDAS runs 0–6; the prototype started at 2, which cannot describe a sound
  // or non-cavitated surface (needed for sealant and SDF notes).
  grade: ["0", "1", "2", "3", "4", "5", "6"],
  // SSC sizes are ordered #1–#7 chairside; the prototype mixed sizes and tooth
  // names ("#3", "2nd primary molar").
  size: ["#1", "#2", "#3", "#4", "#5", "#6", "#7"],
  // The 2017 World Workshop adopted Cairo's recession types (RT1/RT2/RT3);
  // Miller is kept in parentheses for charts and referrals that still use it.
  // The prototype list stopped at Miller III, so RT3 had no entry at all.
  recClass: [
    "Cairo RT1 (Miller Class I/II)",
    "Cairo RT2 (Miller Class III)",
    "Cairo RT3 (Miller Class IV)",
  ],
  // Radiographic bone loss bands aligned to the 2017 WW staging thresholds
  // (Stage I <15%, Stage II 15–33%, Stage III/IV >33%). The prototype's
  // 15–20 / 20–30 / 30–50 straddled two stages each.
  boneloss: ["<15", "15–33", ">33"],
  // "Augmentin 625mg" is not a US strength (500/125 and 875/125 are). These are
  // chips in a plan step, not a prescription — the Rx tab computes the dose.
  rx: [
    "Amoxicillin 500 mg",
    "Amoxicillin/clavulanate 875/125 mg",
    "Azithromycin (PCN allergy)",
    "Clindamycin (PCN allergy)",
    "Ibuprofen 600 mg",
    "Ibuprofen + acetaminophen",
    "none",
  ],

  // New keys, used only by the procedures in extraTemplates.js.
  // {asa} exists in the prototype's Visit Note extras only; the Initial Chart
  // tab needs the same list for the nitrous oxide note. Same values, so the VN
  // extras layered on top of this are a no-op there.
  asa: ["I", "II", "III"],
  sealantMaterial: ["resin-based sealant", "glass ionomer sealant", "flowable composite"],
  palliative: [
    "caries excavated, IRM placed",
    "occlusal adjustment",
    "pulpotomy for pain relief",
    "incision & drainage",
    "temporary crown recemented",
    "no operative tx this visit",
  ],
  n2oIndication: ["anxiety", "gag reflex", "long procedure", "mild behavioral needs"],
  n2oPct: ["20", "30", "40", "50"],
  n2oMin: ["15", "20", "30", "45", "60"],
};

// PH_LABELS additions/replacements, merged the same way. The prototype labels
// stay verbatim in dropdownOptions.js.
export const LABEL_OVERRIDES = {
  dose: "Anesthetic volume",
  asa: "ASA physical status",
  sealantMaterial: "Sealant material",
  palliative: "Palliative treatment",
  n2oIndication: "N₂O indication",
  n2oPct: "N₂O concentration (%)",
  n2oMin: "N₂O duration (min)",
};

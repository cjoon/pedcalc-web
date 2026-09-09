// Anesthetic agent specs for the chart's AnesthesiaRow (carpule count -> mg, max-dose warning).
// concentrationMgMl is derived from the % label itself (e.g. "4% Articaine" = 40 mg/mL) —
// arithmetic, not a clinical claim.
//
// The clinical limits are NOT here. Each agent names the medications.js entry it
// belongs to, and src/chart/anesthesia.js reads mg/kg and the absolute cap from
// there — medications.js is the single source of truth for every max dose in the
// app, so the two cannot drift apart. The 1:50,000 and 1:200,000 formulations
// share the base drug's limit, which depends on the anesthetic, not on the
// vasoconstrictor concentration.
//
// medicationId null would mean "no confirmed limit": maxAllowedMg then returns
// null and AnesthesiaRow shows mg for reference without a warning.
export const CARPULE_ML = 1.7;

export const ANESTHETICS = [
  {
    name: "2% Lidocaine 1:100,000 epi",
    concentrationMgMl: 20,
    medicationId: "lidocaine",
  },
  {
    name: "2% Lidocaine 1:50,000 epi",
    concentrationMgMl: 20,
    medicationId: "lidocaine",
  },
  {
    name: "4% Articaine 1:100,000 epi",
    concentrationMgMl: 40,
    medicationId: "articaine",
  },
  {
    name: "4% Articaine 1:200,000 epi",
    concentrationMgMl: 40,
    medicationId: "articaine",
  },
  {
    name: "3% Mepivacaine plain",
    concentrationMgMl: 30,
    medicationId: "mepivacaine",
  },
  {
    name: "0.5% Bupivacaine 1:200,000 epi",
    concentrationMgMl: 5,
    medicationId: "bupivacaine",
  },
];

// Procedures that are not in dental-charting.html at all. Kept in their own file
// so the prototype data (initialTemplates.js, visitTemplates.js) stays
// byte-identical and scripts/check-data-parity.mjs can tell an addition from a
// drift: every category/item here must be new, never a factory key.
//
// EXTRA_TEMPLATES uses the Initial Chart shape (versions with S/O/A/P), and
// EXTRA_VISITS the Visit Note shape (visits with S/O/A/steps/outcome/next).
// A key present in both gets an entry on each tab.
//
// Added 2026-09-08 (template audit): the chart had no way to write up the four
// most common pediatric preventive appointments, a problem-focused emergency
// visit, or nitrous oxide — all routine chairside notes. Wording is a draft for
// CJ's review. No doses here: the 38% SDF concentration and the N₂O percentage
// are the agent's own labelled strength and a titration setting, not a
// weight-based dose, and the anesthetic mg math stays in anesthesia.js.
export const EXTRA_TEMPLATES = {
  pediatric: {
    label: "Pediatric & Preventive",
    items: {
      sealant: {
        name: "Sealant",
        tag: "PREV",
        versions: [
          {
            id: "v1",
            label: "Standard",
            S: "Px for preventive sealant; {+examSx}.",
            O: "#{tooth} {+sealantFindings}; ICDAS {grade}.",
            A: "#{tooth} sealant indicated; caries risk {+cariesRisk}.",
            P: [
              "Tooth cleaned with pumice, rinsed",
              "Isolated (cotton roll/rubber dam), dried",
              "Etch 20s, rinsed, dried — frosty appearance confirmed",
              "{sealantMaterial} applied to pits/fissures, light-cured",
              "Retention verified with explorer; occlusion checked",
              "OHI + diet counseling; recall {recall}",
            ],
          },
        ],
      },
      sdf: {
        name: "SDF (Silver Diamine Fluoride)",
        tag: "PREV",
        versions: [
          {
            id: "v1",
            label: "Standard",
            S: "Pediatric Px, #{tooth}; {+restoSx}.",
            O: "#{tooth} {+surfaces} cavitated lesion, ICDAS {grade}; {+clinicalFindings}.",
            A: "#{tooth} active caries — SDF arrest indicated; caries risk {+cariesRisk}.",
            P: [
              "Consent obtained — permanent black staining of the lesion explained to parent",
              "Soft tissue protected (petrolatum); lesion isolated and dried",
              "38% SDF applied to lesion 1 min with microbrush",
              "Excess removed; no eating/drinking 30 min",
              "Re-evaluation and reapplication at {recall}",
            ],
          },
        ],
      },
      space_maint: {
        name: "Space Maintainer",
        tag: "PEDO",
        versions: [
          {
            id: "v1",
            label: "Standard",
            S: "Pediatric Px, premature loss of #{tooth}.",
            O: "#{tooth} {+successorStatus}; pano/PA reviewed.",
            A: "Premature loss of #{tooth} — {+smType} indicated to maintain arch length.",
            P: [
              "V1 — band selection and fit; impression/scan for lab",
              "V2 — appliance tried in; fit, contours and occlusion verified",
              "Cemented (GI cement); excess removed, floss checked",
              "OHI to Px and parent: hygiene around appliance, avoid sticky foods",
              "Recall {recall} to monitor appliance and eruption of the successor",
            ],
          },
        ],
      },
      child_recall: {
        name: "Pediatric Recall",
        tag: "EXAM",
        versions: [
          {
            id: "v1",
            label: "Standard",
            S: "Pediatric Px for {+examSx}.",
            O: "{+examFindings} ({xray}).",
            A: "{+examDx}; caries risk {+cariesRisk}.",
            P: [
              "Clinical exam; radiographs reviewed",
              "Prophylaxis",
              "Fluoride varnish applied",
              "OHI + diet counseling to Px and parent",
              "Recall {recall}",
            ],
          },
        ],
      },
    },
  },
  general: {
    label: "General & Other",
    items: {
      emergency: {
        name: "Emergency / Problem-Focused Visit",
        tag: "EMERG",
        versions: [
          {
            id: "v1",
            label: "Standard",
            S: "Px presents with {+emergSx} #{tooth}.",
            O: "#{tooth} {+clinicalFindings} ({xray}).",
            A: "#{tooth} {+pulpalDx}; {+periapicalDx}.",
            P: [
              "Problem-focused evaluation",
              "LA: {anesthetic} {dose} ({technique})",
              "{palliative}",
              "Rx {rx} prn",
              "Post-op instructions given",
              "Definitive tx discussed; scheduled {recall}",
            ],
          },
        ],
      },
      n2o: {
        name: "Nitrous Oxide Analgesia",
        tag: "SEDATION",
        versions: [
          {
            id: "v1",
            label: "Standard",
            S: "Px for N₂O/O₂ analgesia; ASA {asa}.",
            O: "Medical Hx reviewed; nasal airway patent; baseline vitals recorded.",
            A: "N₂O/O₂ inhalation analgesia indicated for {n2oIndication}.",
            P: [
              "Consent obtained from Px/parent",
              "Nasal hood fitted; started on 100% O₂",
              "N₂O titrated to {n2oPct}% for {n2oMin} min",
              "Px monitored throughout: responsive, airway patent, vitals stable",
              "100% O₂ for ≥5 min at completion",
              "No residual effects; discharged ambulatory with parent",
            ],
          },
        ],
      },
    },
  },
};

export const EXTRA_VISITS = {
  pediatric: {
    label: "Pediatric & Preventive",
    items: {
      sealant: {
        name: "Sealant",
        tag: "PREV",
        visits: [
          {
            id: "v1",
            label: "Sealant Placement",
            S: "Px for sealant placement.",
            O: "#{tooth} {+sealantFindings}.",
            A: "#{tooth} sealant indicated; caries risk {+cariesRisk}.",
            steps: [
              "Pumice prophy; isolated and dried",
              "Etch 20s, rinsed, dried",
              "{sealantMaterial} applied and cured",
              "Retention and occlusion verified",
            ],
            outcome: "#{tooth} sealant placed; retention verified.",
            next: "Recall {recall} — sealant integrity check",
          },
        ],
      },
      sdf: {
        name: "SDF (Silver Diamine Fluoride)",
        tag: "PREV",
        visits: [
          {
            id: "v1",
            label: "SDF Application",
            S: "Pediatric Px for SDF application. Staining consented.",
            O: "#{tooth} {+surfaces} cavitated lesion; {+clinicalFindings}.",
            A: "#{tooth} active caries — SDF arrest.",
            steps: [
              "Soft tissue protected; lesion isolated and dried",
              "38% SDF applied 1 min with microbrush",
              "Excess removed; no eating/drinking 30 min",
            ],
            outcome: "#{tooth} SDF applied. Lesion staining explained.",
            next: "Reapplication / re-evaluation {recall}",
          },
        ],
      },
      space_maint: {
        name: "Space Maintainer",
        tag: "PEDO",
        visits: [
          {
            id: "v1",
            label: "V1 — Band Fit & Impression",
            S: "Pediatric Px after loss of #{tooth}.",
            O: "#{tooth} {+successorStatus}.",
            A: "{+smType} initiated.",
            steps: [
              "Band selected and fitted",
              "Impression/scan with band in place",
              "Sent to lab; spacer not required",
            ],
            outcome: "Band fitted, impression to lab.",
            next: "Delivery {recall}",
          },
          {
            id: "v2",
            label: "V2 — Delivery",
            S: "Px for space maintainer delivery.",
            O: "Appliance from lab; tissue healthy.",
            A: "{+smType} delivery.",
            steps: [
              "Appliance tried in; fit, contours, occlusion verified",
              "Cemented (GI cement); excess removed",
              "OHI: hygiene around appliance, avoid sticky foods",
            ],
            outcome: "Space maintainer cemented.",
            next: "Recall {recall} — monitor appliance and eruption",
          },
        ],
      },
      child_recall: {
        name: "Pediatric Recall",
        tag: "EXAM",
        visits: [
          {
            id: "v1",
            label: "Recall Exam",
            S: "Pediatric Px for routine recall.",
            O: "{+examFindings} ({xray}).",
            A: "{+examDx}; caries risk {+cariesRisk}.",
            steps: [
              "Clinical exam; radiographs reviewed",
              "Prophylaxis",
              "Fluoride varnish",
              "OHI + diet counseling to Px and parent",
            ],
            outcome: "Recall completed.",
            next: "Recall {recall}",
          },
        ],
      },
    },
  },
  general: {
    label: "General & Other",
    items: {
      emergency: {
        name: "Emergency / Problem-Focused Visit",
        tag: "EMERG",
        visits: [
          {
            id: "v1",
            label: "Emergency Visit",
            S: "Px presents with {+emergSx} #{tooth}.",
            O: "#{tooth} {+clinicalFindings} ({xray}).",
            A: "#{tooth} {+pulpalDx}; {+periapicalDx}.",
            steps: [
              "Problem-focused evaluation",
              "LA: {anesthetic} {dose} ({technique})",
              "{palliative}",
              "Rx {rx} prn",
              "Post-op instructions given",
            ],
            outcome: "Symptoms addressed; Px comfortable on dismissal.",
            next: "Definitive tx {recall}",
          },
        ],
      },
      n2o: {
        name: "Nitrous Oxide Analgesia",
        tag: "SEDATION",
        visits: [
          {
            id: "v1",
            label: "N₂O Session",
            S: "Px for N₂O/O₂ analgesia; ASA {asa}.",
            O: "Nasal airway patent; baseline vitals recorded.",
            A: "N₂O/O₂ analgesia for {n2oIndication}.",
            steps: [
              "Consent obtained from Px/parent",
              "Nasal hood fitted; started on 100% O₂",
              "N₂O titrated to {n2oPct}% for {n2oMin} min",
              "Monitored throughout: responsive, airway patent",
              "100% O₂ for ≥5 min at completion",
            ],
            outcome: "N₂O/O₂ tolerated well. No residual effects.",
            next: "Same protocol next visit as needed",
          },
        ],
      },
    },
  },
};

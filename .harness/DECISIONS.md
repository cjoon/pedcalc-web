# Decisions

Append only. Grep by keyword and check Status before relying on a decision.
Superseded entries stay for history; do not act on them.

---
## D-001 — Extend inside pedcalc-med, no separate chartrx repo
Date: 2026-09-05
Status: active
Affects: repo layout

Decision: ChartRx charting lives in this repo alongside the dosage calculator.

Why: CJ decided; one deploy, shared weightKg between tabs.

Rejected:
- New chartrx repo (TS/Tailwind/Zustand/Netlify plan, archived in ~/projects/_archive/chartrx)
---
## D-002 — Keep React JSX + plain CSS stack
Date: 2026-09-05
Status: active
Affects: all

Decision: No TypeScript, Tailwind, Zustand or dnd-kit.

Why: CJ decided; keep the existing stack small.

Rejected:
- The chartrx rewrite stack
---
## D-003 — Mepivacaine 400 mg is warning-only
Date: 2026-09-10
Status: active
Affects: src/medications.js, src/calculations.js

Decision: 400 mg stays in unconfirmedAbsoluteMaxMg; absoluteMaxMg stays null.

Why: Not in the AAPD table; sources disagree (300 vs 400 mg). Awaiting CJ.

Rejected:
- Adopting 400 mg as the cap
---
## D-004 — Prototype copy lives in reference/
Date: 2026-09-21
Status: active
Affects: scripts/check-data-parity.mjs, reference/dental-charting.html

Decision: The parity script reads reference/dental-charting.html inside the repo.

Why: The check ran against a sibling folder, so a clean clone could not run it.

Rejected:
- Keeping ~/projects/charting-template (archived)
---
## D-005 — Supply order list persists in localStorage
Date: 2026-09-21
Status: active
Affects: src/supply/ (not built yet), footer copy

Decision: Order items and header (clinic, account #) persist; footer becomes "No patient data stored".

Why: Not PHI; an order list lost on refresh is useless. CJ decided.

Rejected:
- Session-only order list
---

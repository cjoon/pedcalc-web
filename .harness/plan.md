# Plan: pedcalc-med (ChartRx)

<!-- harness-plan/v1 -->
<!-- Input only. harness init reads this once. Never edited by any agent. -->

## Purpose
Pediatric dental clinical reference web app: weight-based dosage calculator (AAPD 2025-2026)
plus SOAP charting templates (Initial Chart / Visit Note), deployed to GitHub Pages
(cjoon.github.io/pedcalc-web). Next feature: a dental supply order form tab.

## Stack
Language:
Framework:
Platform:
Data:
<!-- leave blank if a manifest declares it; detection wins -->

## Validation
Unit:
Build:
Full: npm run lint && npm run build && node scripts/check-data-parity.mjs
<!-- leave blank if package.json / Makefile declares it -->

## Constraints
- The Domain Rules in CLAUDE.md / AGENTS.md are binding; read them before any change
- Drug data follows AAPD Reference Manual 2025-2026; a missing value is UNKNOWN, never invented
- Every dose calculation enforces the max dose cap; only absoluteMaxMg caps a calculation
- No PHI; patient state is session-only, never written to localStorage/sessionStorage
- Chart template wording stays verbatim; changes go through the override layer only
- Stack stays React JS/JSX + plain CSS; no new dependencies without CJ's approval

## Boundaries
Do not modify without explicit instruction:
- reference/dental-charting.html
- src/chart/data/initialTemplates.js
- src/chart/data/dropdownOptions.js
- src/chart/data/visitTemplates.js
- src/chart/data/visitOptions.js
- src/medications.js
- .github/workflows/
- main branch (push to main deploys; merge only with CJ's approval)

## Roles
Coder: claude
Reviewer: codex
<!-- claude | codex | none. both blank = single-agent project -->

## Milestones
1. Visit Note O-line vocabulary — 4 new groups (healingFindings, provisionalFindings, endoInterimFindings, implantFollowupFindings) wired in, parity exit 0
2. Visit Note S-line vocabulary — rct/v2, removable_pros/v5, tmd/v3 only
3. Supply Order tab — catalog search, qty list, print + CSV export (blocked on catalog parse decision)

## Decisions
- Extend inside pedcalc-med, no separate chartrx repo — CJ decided 2026-09-05 — affects: repo layout
- No TypeScript/Tailwind/Zustand/dnd-kit — keep the existing stack — affects: all
- cdtCodes.js stays empty until CJ confirms mappings — no guessed codes — affects: src/chart/data/cdtCodes.js
- Mepivacaine 400 mg is warning-only (unconfirmedAbsoluteMaxMg), not a cap — not in the AAPD table — affects: src/medications.js
- Sidebar click passes null sub-entry to keep the remembered version/visit pill — the old reset broke in-tab selection — affects: src/chart/Sidebar.jsx
- Prototype copy lives in reference/; parity script reads it from the repo — CJ decided 2026-09-21 — affects: scripts/check-data-parity.mjs
- Supply order list and header (clinic, account #) persist in localStorage; footer becomes "No patient data stored" — not PHI — affects: src/supply/

## Modules
- src/chart/data: prototype files are byte-frozen; every change is an override, parity script must exit 0
- src/dosage: rx.js never computes a dose; injectables default to a blank route

## Open questions
- Supply catalog: full 37k rows with confidence badge vs HIGH only vs improve the parser first
- Review pending from CJ: rxOptions.js sig wording, cdtCodes.js mapping, soOptions.js vocabulary, extraTemplates.js 6 new procedures
- Pending bugs: dropdown outside-click should commit like Apply; 375px chart topbar title overlaps the filled counter

# Project

## Identity
Name: pedmed-web
Purpose: Pediatric dental clinical reference web app: weight-based dosage calculator (AAPD 2025-2026)
plus SOAP charting templates (Initial Chart / Visit Note), deployed to GitHub Pages
(cjoon.github.io/pedcalc-web). Next feature: a dental supply order form tab.

## Stack
Language:   JavaScript (JSX), no TypeScript
Framework:  React 19 + Vite 8, plain CSS
Platform:   static SPA on GitHub Pages (base /pedcalc-web/), push to main deploys
Data:       static JS modules in src/; no backend; patient state session-only

## Validation
Unit:   node scripts/check-data-parity.mjs
Build:  npm run build
Full:   npm run lint && npm run build && node scripts/check-data-parity.mjs

## Constraints
- The Domain Rules in CLAUDE.md / AGENTS.md are binding; read them before any change
- Drug data follows AAPD Reference Manual 2025-2026; a missing value is UNKNOWN, never invented
- Every dose calculation enforces the max dose cap; only absoluteMaxMg caps a calculation
- No PHI; patient state is session-only, never written to localStorage/sessionStorage
- Chart template wording stays verbatim; changes go through the override layer only
- Stack stays React JS/JSX + plain CSS; no new dependencies without CJ's approval

## Boundaries
Do not modify without an explicit instruction:
- .github/workflows/
- dist/
- main branch (push to main deploys; merge only with CJ's approval)
- node_modules/
- reference/dental-charting.html
- src/chart/data/dropdownOptions.js
- src/chart/data/initialTemplates.js
- src/chart/data/visitOptions.js
- src/chart/data/visitTemplates.js
- src/medications.js

## Traps (repo-wide, permanent)
- templates.js / visits.js throw at module load on an unresolved "{ph}" — fix the key, never silence it
- Only absoluteMaxMg caps a dose; unconfirmedAbsoluteMaxMg is warning-only

## Map
Source:  src/
Tests:   no test runner; scripts/check-data-parity.mjs is the data check
Modules: .harness/modules/

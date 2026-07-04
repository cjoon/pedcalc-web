# pedcalc-med — Pediatric Dental Dosage Calculator (web)

## Overview
Weight-based drug dosage calculator for pediatric dentistry.
React + Vite SPA, deployed to GitHub Pages: cjoon.github.io/pedcalc-web

## File Map
- src/medications.js   : drug database (name, mg/kg, max dose, forms, sig/disp)
- src/calculations.js  : weight-based dosing logic
- src/App.jsx          : main UI component
- src/Disclaimer.jsx   : legal/clinical disclaimer
- src/main.jsx         : entry point

## Domain Rules (NEVER violate)
- Drug data follows AAPD Reference Manual 2025-2026. Never invent doses,
  concentrations, or sig instructions. Missing value = UNKNOWN, ask CJ.
- Every dose calculation MUST enforce the max dose cap. Weight-based
  result exceeding max dose is a critical bug, not an edge case.
- New drugs must match the existing medications.js schema exactly.
  Read the file first; never guess the format.
- Clinical reference tool: correctness > features > style.

## Commands
- dev: npm run dev / build: npm run build / lint: npm run lint
- Verification is enforced by global hooks (claude-gate).

## Deploy
- Method: TBD (manual vs GitHub Actions). Never deploy without approval.

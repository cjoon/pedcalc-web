# Task
Status: DONE

## Goal
Rename the project to dentaldoc: app display name, package name, doc titles (GitHub repo and Pages URL unchanged)
Plan: none

## Scope
Allowed: src/App.jsx (brand text only), index.html (title only), package.json, package-lock.json (name only), CLAUDE.md, AGENTS.md (title only), .harness/PROJECT.md, .harness/STATE.md
Off-limits: vite.config.js base, .github/workflows/, PLAN.md and DECISIONS.md history, .harness/plan.md

## Done when
- [x] Topbar brand and page title read "DentalDoc"
- [x] package name is dentaldoc; CLAUDE.md/AGENTS.md titles updated, bodies still identical
- [x] validation passes

## Validate
npm run lint && npm run build && node scripts/check-data-parity.mjs && harness check

## Context
CJ chose the name 2026-09-22. The local folder moves to ~/projects/dentaldoc after the push.

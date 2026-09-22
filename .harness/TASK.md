# Task
Status: DONE

## Goal
Adopt the harness: generate .harness/, link the existing CLAUDE.md/AGENTS.md as loaders, move root STATE.md into .harness/STATE.md
Plan: none

## Scope
Allowed: .harness/, CLAUDE.md, AGENTS.md, STATE.md (root, deleted)
Off-limits: src/, scripts/, reference/, .github/workflows/

## Done when
- [x] CLAUDE.md names Claude as Coder, AGENTS.md names Codex as Reviewer; project rules below the loader unchanged
- [x] root STATE.md content carried into .harness/STATE.md and the root file removed
- [x] harness check exits 0
- [x] validation passes

## Validate
harness check && npm run lint && npm run build && node scripts/check-data-parity.mjs

## Context
Next task (Visit Note O-line vocabulary) is STATE.md Next #1; open it here when it starts.

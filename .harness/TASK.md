# Task
Status: DONE

## Goal
Record CJ's branch rule in the Deploy section of CLAUDE.md and AGENTS.md
Plan: none

## Scope
Allowed: CLAUDE.md, AGENTS.md (Deploy section only), .harness/STATE.md
Off-limits: src/, scripts/, reference/, .github/workflows/

## Done when
- [x] Deploy section in both files names the dosage/chart/supply branches and says a push request is the approval to merge into main
- [x] CLAUDE.md and AGENTS.md bodies below the loader stay identical
- [x] harness check exits 0

## Validate
harness check && diff <(tail -n +8 CLAUDE.md) <(tail -n +9 AGENTS.md)

## Context
CJ set the rule 2026-09-22. Next task (Visit Note O-line vocabulary) is STATE.md Next #1.

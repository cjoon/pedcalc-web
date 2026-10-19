# Task
Status: DONE

## Goal
Move .harness/plan.md `## Modules` into .harness/modules/<name>.md, per the refreshed AGENT.md first-session rule
Plan: none

## Scope
Allowed: .harness/modules/, .harness/STATE.md, .harness/TASK.md
Off-limits: src/, dental-supply/ (another work stream, uncommitted), .harness/plan.md, .harness/DECISIONS.md

## Done when
<!-- each item: a command or an observable result, not an adjective -->
- [x] .harness/modules/chart-data.md and dosage.md exist, each rule traceable to plan.md `## Modules` and the source it names
- [x] plan.md Decisions and Open questions confirmed present in DECISIONS.md / STATE.md (no copy needed)
- [x] validation passes

## Validate
npm run lint && npm run build && node scripts/check-data-parity.mjs && harness check

## Context
Previous task (rename to dentaldoc) was DONE. dental-supply/ is untracked work from another session; not part of this change.

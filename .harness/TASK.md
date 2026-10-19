# Task
Status: DONE

## Goal
Complete the chart-data module's frozen-file list (review P2 on e4d2def)
Plan: none

## Scope
Allowed: .harness/modules/chart-data.md, .harness/STATE.md, .harness/TASK.md
Off-limits: src/, dental-supply/ (another work stream, uncommitted), .harness/plan.md
Modules: chart-data

## Done when
<!-- each item: a command or an observable result, not an adjective -->
- [x] chart-data.md lists every file scripts/check-data-parity.mjs compares (4)
- [x] validation passes

## Validate
npm run lint && npm run build && node scripts/check-data-parity.mjs && harness check

## Context
dental-supply/ is untracked work from another session; not part of this change.

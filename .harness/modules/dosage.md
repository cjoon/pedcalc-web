# Module: dosage
Path: src/dosage/
Source: .harness/plan.md `## Modules`

## Rules that differ from project defaults
- rx.js never computes a dose. doseMg/volumeMl/tablets arrive from
  calculateDose(), which owns the max-dose caps.
- Injectables (carpule-dispensed agents) default to a blank route; only oral
  agents get "by mouth". Never assert a route the data does not support.

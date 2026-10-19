# Module: chart-data
Path: src/chart/data/
Source: .harness/plan.md `## Modules`

## Rules that differ from project defaults
- Prototype-derived files (initialTemplates.js, dropdownOptions.js,
  visitTemplates.js, visitOptions.js) stay equal to
  reference/dental-charting.html, as checked by scripts/check-data-parity.mjs. Every wording change goes through an
  override file (chartOverrides.js, vnOverrides.js, optionOverrides.js), never
  an edit to the prototype copy.
- `node scripts/check-data-parity.mjs` must exit 0 after any change here.

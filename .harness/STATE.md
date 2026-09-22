# State
Updated: 2026-09-22 · commit e2cdcfb

## Milestone
Visit Note O-line vocabulary (not started) — done when 4 new groups are wired in and parity exits 0

## In progress
- Done: ChartRx MVP + Visit Note (v1.1) deployed; Visit Note A-line vocabulary complete. O-line not started
- Harness adopted; everything merged and deployed (main = 29cd7af, deploy success)
- Branch rule from now on: dosage / chart / supply branches, push = merge into main (CLAUDE.md Deploy)
- Renamed to dentaldoc: app shows "DentalDoc", package name dentaldoc, local folder ~/projects/dentaldoc. GitHub repo and Pages URL stay pedcalc-web

## Next
1. Visit Note O-line vocabulary — new groups healingFindings, provisionalFindings, endoInterimFindings, implantFollowupFindings (49 lines left)
2. Visit Note S-line vocabulary — rct/v2, removable_pros/v5, tmd/v3 only (the rest stay fixed wording)
3. Finish Phase 4/5 Codex review (P0/P1 fixes)
4. Supply Order tab — blocked until CJ decides catalog scope (dental-supply parse: 37,053 rows, ~47% REVIEW, 8,857 priced)

## Known issues
- Dropdown outside-click does not commit like Apply (Apply click required)
- Mobile 375px: chart topbar title overlaps the `0/10 filled` counter
- Awaiting CJ: rxOptions.js sig wording, cdtCodes.js mapping, mepivacaine 400 mg as cap, soOptions.js vocabulary, extraTemplates.js 6 new procedures

## Hot files
- src/chart/data/vnOverrides.js, src/chart/data/soOptions.js

## Traps (this work area only — promote to PROJECT.md or a module when stable)
- Do not apply the draft CDT mapping to cdtCodes.js; stays empty until CJ confirms
- Sidebar click must pass null sub-entry so the remembered version/visit pill survives

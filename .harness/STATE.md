# State
Updated: 2026-09-22 · commit 9f82b84

## Milestone
Visit Note O-line vocabulary (not started) — done when 4 new groups are wired in and parity exits 0

## In progress
- Done: ChartRx MVP + Visit Note (v1.1) deployed; Visit Note A-line vocabulary complete. O-line not started
- Harness adopted on branch consolidate-projects (root STATE.md moved here)
- Deployed main = 63a4780; chart-followups adds 62a7023 + d28910c, not yet merged

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

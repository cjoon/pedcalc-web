# PROGRESS — ChartRx

Running record of what is built and what is next. PLAN.md holds the original
integration roadmap and the phase checklists; this file is the short version
plus the backlog that came out of chairside use.

Live: https://cjoon.github.io/pedcalc-web/ (auto-deploys on push to `main`)
Stack: React 19 + Vite, plain CSS, no state library. Session-only patient data.

---

## Shipped

| Date | Commit | What |
|---|---|---|
| 2026-09-05 | `1fb24f1` | Ported `FACTORY_TEMPLATES` / `OPTIONS` / `PH_LABELS` verbatim from the `dental-charting.html` prototype, with `scripts/check-data-parity.mjs` to prove they stay identical |
| 2026-09-05 | `43bf79b` | Split the app shell from the dosage calculator: tab switch, shared `weightKg`, ChartRx palette, footer disclaimer replacing the full-screen gate |
| 2026-09-05 | `3a635b3` | Initial Chart tab: sidebar with search and version pills, SOAP card, clickable `{ph}` blanks with dropdown / tooth picker, anesthesia dose check, CDT chips, plain-text copy |
| 2026-09-06 | `60f69f5` | File map and domain rules in CLAUDE.md / AGENTS.md |
| 2026-09-06 | `cc357dc` | Review/finalize steps, suture picker, Rx flow, S/O multi-select (details below) |
| 2026-09-06 | `7ff2c15` | Endo O line split into clinical findings + AAE pulpal Dx + AAE periapical Dx |
| 2026-09-06 | `44a8295` | Periodontal diagnosis: 2017 World Workshop (extent / stage / grade optional) and 1999 AAP |
| 2026-09-06 | (pending) | Visit Note tab: per-visit templates ported verbatim from the prototype, a tab per visit, date, Outcome / Next appointment |
| 2026-09-08 | (pending) | Template audit: A/P + Visit Note override layers, vocabulary cleanup, 6 new procedures, AAPD anesthetic limits |
| 2026-09-09 | `ce987c7` | Template audit shipped and deployed |
| 2026-09-09 | (pending) | Procedure selection shared across the two chart tabs |
| 2026-09-09 | `63a4780` | Shared procedure selection shipped and deployed |
| 2026-09-09 | (pending) | Mepivacaine cap sourced, override paths validated, Visit Note A lines, empty blanks dropped |

### What the last three commits added

**Three-step flow, both tabs.** Chart goes fill → edit → final: `Next` builds
the plain-text note from the filled blanks, the draft is freely editable, and
the final step is read-only with Copy. Dosage goes calc → rx → final, where the
final step also prints. Shared components live in `src/shared/`.

**Prescriptions.** `src/dosage/rx.js` formats the already-capped values from
`calculations.js` and performs no dose math of its own. A formulation must be
selected before prescribing, and injectables get no default oral route.

**Suture.** `{suture}` opens a size + material picker producing `4-0 silk`.

**Multi-select findings.** New `{+ph}` token renders a findings picker; all 32
procedure versions have rewritten S/O lines in `src/chart/data/chartOverrides.js`
(named `soOverrides.js` until the 2026-09-08 audit gave it A/P too),
layered over the untouched verbatim `initialTemplates.js` by `templates.js`.
Groups marked `single: true` (the diagnostic categories) behave as radio lists.

**Optional blanks.** `{?+ph}` disappears from the note when left empty, so
modifiers that only apply to some diagnoses (periodontal stage and grade) do not
print a `[ph]` placeholder. `MULTI_FIELDS` entries can carry `prefix`/`suffix`
so a label such as `1999 AAP:` vanishes together with its value.

**Visit Note tab (v1.1).** A third tab beside Initial Chart and Dosage, for the
appointments after the workup: pick the procedure, pick the visit from a tab
strip across the top of the card (`V1 — Preparation`, `V2 — Crown Delivery`, …),
fill the blanks, copy. 25 procedures, 50 visits, all ported byte-identically
from the prototype's `VN_TEMPLATES`; `scripts/check-data-parity.mjs` now checks
them too. Each visit's S/O/A is one short line, the plan is the procedure steps,
and the note closes with `Outcome:` and `Next:` — the prototype's
`getVnPlainText` format, plus a CDT line.

The `{ph}` blanks, tooth sync, anesthesia row, CDT chips and the fill → edit →
final flow are all the existing Chart components. The Visit Note tab supplies a
different dropdown vocabulary through a new `FieldOptionsContext`, matching the
prototype's `Object.assign({}, ACTIVE_OPTIONS, VN extras)` — `{complaint}` in
particular has a different list there.

Date defaults to today, is computed from local time (not `toISOString()`, which
rolls over a day early in Pacific Time), and is session-only like every other
patient value.

### What the template audit changed (2026-09-08)

**Four override layers, prototype files still byte-identical.** `soOverrides.js`
became `chartOverrides.js` and may now override A and P, not just S and O.
`vnOverrides.js` does the same for Visit Notes, `optionOverrides.js` replaces a
prototype `{ph}` dropdown list, and `extraTemplates.js` adds procedures the
prototype never had. `scripts/check-data-parity.mjs` no longer compares
"everything except S/O" as a lump: it checks each field against the prototype and
fails unless an override file declares that exact field, so it reports
"84 declared override(s); 6 added item(s)" and exits 1 on anything undeclared.
`templates.js` and `visits.js` also throw at load if a `{ph}` has no vocabulary
entry.

**Diagnosis moved from O to A.** The endo O lines carried the AAE pulpal and
periapical picks while A hard-coded a different diagnosis, so one note could
print two. Perio A carried `Generalized {stage} periodontitis`, and `{stage}` is
the dropdown shared with the implant second-stage timing list — it offered
"3 mo" as a periodontitis stage. Both tabs now put the 2017 World Workshop
extent/stage/grade and the AAE categories on A, and the fixed assertions in
direct restoration, SSC, implant surgery, sinus lift, recall exam and TMD became
picks.

**Vocabulary.** Symptoms and findings were separated (`pulpalSx` no longer holds
radiographic findings), pulp tests were normalized to one naming convention,
duplicate phrasings were collapsed, and new groups were added for the things a
billing narrative needs: individual tooth surfaces (M/O/D/B/F/L/I, printing
"MOD"), impaction depth, teeth scaled per quadrant, interdental CAL, caries risk.
Classifications were brought current: Cairo RT1–RT3 recession, the 2017 WW
stable/remission/unstable status for treated periodontitis, DC/TMD Axis I, and
ICDAS 0–6.

**Corrected lists.** `{dose}` said 1.8/3.6/0.9 mL, the non-US cartridge; it now
reads in 1.7 mL carpules, matching `CARPULE_ML`, `medications.js` and the AAPD
table. Bone-loss bands align to the staging thresholds (<15 / 15–33 / >33), SSC
sizes are #1–#7, and "Augmentin 625mg" (not a US strength) is gone.

**Six new procedures**, on both tabs: sealant, SDF, space maintainer and
pediatric recall in a new "Pediatric & Preventive" category, plus an
emergency/problem-focused visit and nitrous oxide under General.

**Anesthetic limits, one source.** `anesthetics.js` no longer holds any max: each
agent names a `medicationId` and `anesthesia.js` reads mg/kg and the cap from
`medications.js`. Lidocaine's absolute max dropped from the manufacturer's 500 mg
to the pediatric 300 mg, and articaine (7 mg/kg), mepivacaine (4.4) and
bupivacaine (1.3, 90 mg) were added from the AAPD 2025-2026 table, so the chart's
dose check now warns for all six agents instead of lidocaine only. The
`AnesthesiaRow` also shows each agent's age warning.

**Codex round follow-ups.** Four P1 findings, all in the Dosage tab's contract
with the new drugs. Age restrictions moved to a new `contraindication` field that
is rendered unconditionally, because `warning` is suppressed whenever the computed
"Max N doses per 24 hours" line exists — that condition had been hiding the mg/kg
limit on all four anesthetics, lidocaine included, since their `maxDosesPerDay`
is 1. `calculateDose()` now returns `adultDoseApplied`, so a weight-based agent
is no longer labelled "Adult Dose" at 41 kg when no adult fixed dose exists.
Extraction's A line got its own `surgDx` group (the audit's new ortho, perio and
pericoronitis reasons contradicted its fixed "non-restorable"), and mepivacaine
carries `unconfirmedAbsoluteMaxMg` so a result above the published 300–400 mg
range is flagged without either figure entering the arithmetic.

### Procedure selection now follows the tab switch (2026-09-09)

Picking a procedure on Initial Chart and moving to Visit Note used to land on
whatever that tab was last left on, which reads as the procedure changing by
itself. `App.jsx` holds `{ catKey, key }` now, beside `weightKg` and just as
session-only, and both chart tabs read it.

What deliberately does not travel:

- **The version or visit id.** Initial Chart's `v2` is a variant of the
  procedure, Visit Note's `v2` is the second appointment. Each tab keeps its own,
  in a map keyed by procedure, so returning to a tab reopens the pill it had.
- **The filled blanks.** Field ids are counted per template in `tokenize.js`, so
  `f3` means something different in the next procedure. Both views clear the card
  when the selection changes, in a render-time sync rather than the click
  handler — the procedure can change from the other tab while the view is mounted
  but hidden, and a click handler never runs for that.
- **A procedure the other tab does not have.** 31 of 32 are on both;
  `surgical/implant_resto` is Initial-Chart-only and now shows the empty state
  there instead of falling through to a neighbour.

Clicking a procedure row now means "open this procedure" and nothing more:
`Sidebar` passes `null` for the sub-entry, so the remembered version or visit
stands and only a pill click changes it. Passing the first entry, as it used to,
overwrote the memory on every visit to the row and left it working across a tab
switch but not within a tab.

One behavior change worth knowing: clicking the procedure that is already open no
longer wipes the answers. That reset used to live in the click handler and fired
on every click, including a re-click. `Clear` is the way to empty a note.

Verified by driving the built app in headless Chromium over the DevTools
protocol: the procedure carries across, `v2` does not, the Initial-only procedure
falls back to the empty state, a filled tooth number does not survive a
cross-tab procedure change (0/8 filled on arrival), and the console stays clean —
in particular no "Too many re-renders" from the render-time sync.

### Empty blanks, override validation, Visit Note A lines (2026-09-09)

**Empty blanks leave the note instead of printing `[anesthetic]`.** `serializer.js`
gained `tidy()` and `isEmptyStep()`: a removed blank takes its stranded
punctuation with it, the `#` of an unfilled tooth number goes, a unit written
straight after a blank (`{pd}mm`, `{boneloss}%`, `{torque}Ncm`) goes with the
number, and a plan step left as a bare label (`LA:`) is dropped rather than
printed. A step that still carries an instruction is kept, because its words came
from the template rather than from a blank. Unit removal happens on the token
parts, where a unit is still visibly attached to its blank, not on the joined
string.

Rendering happens clause by clause, split on "." and ";", because by the time the
line is a single string it is too late to tell which label belonged to which
blank. A clause whose blanks are all empty is dropped when what is left cannot
stand on its own: punctuation, a bare label ("PA:", "Vitality:"), or a phrase cut
off at the preposition that introduced the blank ("Px c/o", "premature loss of").
A clause that still carries an instruction is kept. Checked against all 32
procedures and 56 visits with nothing filled: no dangling fragment survives, and
across 285 fully filled lines the output is unchanged.

Deleting a required blank silently would be the wrong trade in a clinical note,
so the edit step now names them: "Left empty, so not in the note: Probing depth
(mm), Interdental CAL…". Non-blocking, and the draft is editable anyway. This was
the open question the previous entry said to settle with CJ; the notice answers
both halves of it without a modal.

The Visit-Note-only blanks had no names to report — the prototype ships their
lists but not their labels — so the notice read "pa, vitality".
`VISIT_LABEL_OVERRIDES` names all 23, and renames `{complaint}`, which the shared
label calls "Ortho complaint" while the Visit Note list is general symptoms.

The Rx step's `Disp: ________` is deliberately unchanged. An underscore rule is
the conventional "write it in" marker on a printed prescription, and `Disp:` with
nothing after it would be worse.

**Override paths are validated in both directions.** The builders walk the
factory data and look up an override, so an override filed under a misspelled
category, item or version id was ignored in silence — nothing failed and the
wording simply never reached the note (Codex P2). `validateOverridePaths()` now
checks the other direction at load; a typo at any of the three levels throws.

**Visit Note A lines.** Most were already right: a follow-up appointment's
assessment states what that visit was for, and the diagnosis belongs to the
workup. The plan's estimate of 42 mechanical conversions was wrong. Two cases
needed changing — a line that asserts a diagnosis that may be false (checkup's
"Healthy dentition."), and a procedure's first visit that records only what was
done with no diagnosis anywhere. That is 13 more lines, all reusing Initial Chart
vocabulary; declared Visit Note overrides went from 9 to 22. Removable pros
(edentulism) and frenectomy (aberrant frenum attachment) were left alone rather
than forced into an approximate category — they need vocabulary that does not
exist yet.

### Awaiting CJ's clinical review

- `src/dosage/rxOptions.js` — sig wording (routes, frequencies, refills).
- `src/chart/data/cdtCodes.js` — still empty per procedure. UNKNOWN until CJ
  provides the mapping; nothing is guessed.
- Mepivacaine's per-appointment cap is still UNKNOWN and `absoluteMaxMg` stays
  `null`, because AAPD is this app's source of record for maximum doses and its
  table has no absolute column. The search did settle what exists: the FDA label
  for Carbocaine (2018) says a single dose, or the total of a series in one
  procedure, "should not usually exceed 400 mg" in healthy normal-sized adults,
  and the widely repeated pediatric 300 mg could not be traced to any primary
  source. That 400 mg is carried as `unconfirmedAbsoluteMaxMg` and only warns —
  it never caps the arithmetic. **CJ decides:** adopt 400 mg as the cap, or leave
  it warning-only.
- The CDT 2026 candidate mapping per procedure is written up in the plan file
  (`~/.claude/plans/luminous-bouncing-zephyr.md`) but deliberately NOT applied —
  `cdtCodes.js` stays empty per the UNKNOWN rule.
- `src/chart/data/soOptions.js` — the finding and diagnosis vocabulary, now 39
  groups after the audit. The classifications follow published criteria (AAE
  consensus terminology, 2017 World Workshop incl. the treated-periodontitis
  status wording, 1999 AAP, DC/TMD Axis I, Cairo recession types); the
  surrounding chairside phrasing is a draft.
- `src/chart/data/extraTemplates.js` — the six new procedures (sealant, SDF,
  space maintainer, pediatric recall, emergency visit, nitrous oxide). All
  wording is a draft, including the N₂O titration and recovery steps.

---

## Next

### 1. Visit Note vocabulary conversion

Bring the Visit Note tab to the same standard as the Initial Chart: findings and
diagnoses picked per patient rather than asserted by the template. The mechanism
already exists (`vnOverrides.js`, added 2026-09-08) and currently carries 9 lines;
this fills in the rest.

**Where it stands.** 25 procedures, 50 visits, 150 S/O/A lines.

| Line | Already overridden | Has some blank | Fixed prose |
|---|---|---|---|
| S | 0 | 39 | 11 |
| O | 1 | 38 | 11 |
| A | 8 | 26 | 16 |

"Has some blank" means the line takes a value such as `{tooth}` or `{pd}` but
still states its findings as prose ("Canals dry on paper point. Symptoms
resolved."). Two visits have all three lines as pure prose.

**Order of work.** Diagnosis first, then findings, then the follow-up wording —
each stage is independently shippable and reviewable.

1. **A lines — done 2026-09-09.** 13 lines converted, the rest are procedure
   statements that are correct as written. See the entry above. What is still
   open: removable pros and frenectomy need diagnosis vocabulary that does not
   exist yet (edentulism, aberrant frenum attachment).
2. **O lines (49 remaining).** Needs one new group per follow-up theme, which is
   the part that does not exist yet:
   - `healingFindings` — the recurring post-op check ("Tissue: {tissue}",
     "Healing: {healing}", "Membrane: {membraneStatus}"). Today three separate
     single-value lists say overlapping things.
   - `provisionalFindings` — "provisional intact", "temp lost", "tissue healthy",
     "margin exposed".
   - `endoInterimFindings` — "canals dry on paper point", "symptoms resolved",
     "sinus tract resolved", "still tender to percussion".
   - `implantFollowupFindings` — "healing abutment intact", "no peri-implant
     radiolucency", "ISQ {isq}", "soft tissue matured".
   `{prevPD}`, `{coverage}`, `{ktGain}`, `{plaque}` stay as they are: they are
   measurements, not vocabulary.
3. **S lines (50).** Lowest value. Most are one clause naming the appointment
   ("Px for #{tooth} crown delivery."), which is correct as written. Convert only
   the ones that assert a symptom the patient may not have — `rct/v2`
   ("post-op: {symptom}"), `removable_pros/v5` ("c/o {complaint}"),
   `tmd/v3`. Reuse `pulpalSx`, `prosSx`, `tmdSx`.
4. **`outcome` / `next`.** Out of scope. They are the clinician's summary of what
   happened and read fine as free text, and the edit step is where they get
   adjusted anyway.

**Constraints that do not change.** `visitTemplates.js` and `visitOptions.js`
stay byte-identical; everything lands in `vnOverrides.js`. The parity script
already reports each override by field, so the count in its output
(`9 declared override(s)` today) is the review checklist. `templates.js` and
`visits.js` reject a `{ph}` with no vocabulary entry at load, so a typo cannot
reach a note.

**What CJ has to review**, and why this cannot be finished without it: the four
new O groups above are new clinical phrasing, not a rearrangement of existing
text. The A-line stage (step 1) reuses vocabulary CJ is already reviewing, so it
can ship first and on its own.

**Verification.** `npm run build`, `npm run lint`,
`node scripts/check-data-parity.mjs` (must stay exit 0 with the override count
rising), then chairside: pick each converted visit, confirm every blank has a
list, fill it, copy the note and read it for grammar where a group's separator
meets the surrounding punctuation.

### 2. Smaller items

- Mobile (375px): the chart topbar title overlaps the `0/10 filled` counter.
  Pre-existing layout bug, not caused by the recent work.
- Visit Note S/O/A are still largely the prototype's fixed sentences. Planned as
  its own round — see "Visit Note vocabulary conversion" below.
- From PLAN.md: Settings with template editing and export/import (v1.2),
  PWA (v2.0).
- Visit Note step editing: the prototype let you drag steps to reorder, add and
  delete them. Here the edit step's textarea covers that; revisit if reordering
  turns out to matter chairside.
- Dropdown blanks require clicking `Apply`; clicking outside the dropdown
  (on blank space) should commit the current selection immediately, same as
  `Apply`.

---

## Verification

```
npm run build                        # exit 0
npm run lint                         # exit 0
node scripts/check-data-parity.mjs   # prototype data unchanged; only S/O differ
~/dotfiles/claude/bin/claude-gate full
```

Workflow per CLAUDE.md: build and lint pass → Codex review (`/review`) → fix
P0/P1 → merge to `main` only with CJ's approval, since that deploys.

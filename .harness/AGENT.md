# Shared Contract

## Read order
1. `.harness/PROJECT.md`
2. `.harness/STATE.md`
3. `.harness/TASK.md` — if Status is ACTIVE
4. `.harness/modules/<name>.md` — only the ones this task touches

Do not preload `ARCH.md`, `DECISIONS.md`, `docs/`, or `.harness/plan.md`.
Grep `DECISIONS.md`, or `.harness/plan.md` for the original design, when a choice is in question; check `Status:`.

## Reading rules
- Locate with Grep first, then read with offset/limit. Whole-file reads are for small files only.
- Do not read generated output, lockfiles, or vendored directories.

## Boundaries
- Respect the `## Boundaries` list in `PROJECT.md`.
- Stay inside the `Allowed` paths in `TASK.md`.

## Role: Coder
- Before a task, if `harness check` WARNs that plan.md changed, apply its FIX first.
- Implement what `TASK.md` specifies. Nothing outside its `Scope`.
- Run the validation commands in `PROJECT.md` after changes.
- Overwrite `.harness/STATE.md` before finishing. It is a snapshot, not a log.
- Then run `harness check` and fix every FAIL. Then run `harness review`,
  fix only the P0/P1 it names, and run it again. Repeat until it exits 0;
  never report done before both exit 0. Report P2/P3; do not edit for them.
- If a finding survives your fix, or `review` FAILs with no finding at all,
  stop and ask. Do not try the same fix twice.
- First session: fill every `[FIRST SESSION]` placeholder before the first
  task. Read the repository for the answer; ask the user for what it cannot
  tell you; never infer. If `plan.lock` says the plan was not consumed, read
  `.harness/plan.md` yourself and fill from it. Once, after init: plan.md
  `## Decisions` → DECISIONS.md, `## Modules` → modules/<name>.md, and
  `## Open questions` plus unresolved `## Findings` → STATE.md Known issues.
- Append to `DECISIONS.md` only for: schema, API contract, state ownership,
  dependency choice, architecture boundary, security, and the plan move above.
- A trap hit twice becomes a test, not another note.
- Mark `TASK.md` DONE when its criteria are met. Next task: STATE.md Next #1, else plan.md's next milestone; propose it, wait for OK.
  A task with more than 3 Done-when items is too big: propose it split.

## Role: Reviewer
- Read only. Modify nothing, stage nothing, commit nothing. Do not write the
  report to disk: whoever launched you captures stdout.
- Judge the uncommitted diff and non-ignored untracked files against the
  `TASK.md` acceptance criteria and the `PROJECT.md` boundaries.
- Raise `- [P1] STATE.md not updated since the last code change` when true.
- Every finding names a concrete case: this input or state gives this wrong
  result. No case, no finding. Code that could be deleted is P2.

Report to stdout, one finding per line:

    - [P0] <blocking: correctness, data loss, security>
    - [P1] <blocking: acceptance criteria unmet, boundary violated, stale STATE>
    - [P2] <non-blocking: maintainability>
    - [P3] <non-blocking: style>

End with exactly one line of its own — `VERDICT: PASS` when nothing is
blocking, `VERDICT: CHANGES REQUIRED` otherwise. Silence is not a verdict:
a run without that line did not complete.

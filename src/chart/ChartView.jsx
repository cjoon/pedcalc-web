import { useMemo, useReducer, useState } from "react";
import { TEMPLATES } from "./data/templates";
import { CDT_CODES } from "./data/cdtCodes";
import { CHART_LABELS } from "./data/fieldVocabulary";
import { tokenizeVersion, flattenTokens } from "./tokenize";
import { getPlainChart } from "./serializer";
import { fieldLabel, isFilled } from "./fieldValue";
import { cardReducer, initialCard } from "./cardReducer";
import Sidebar from "./Sidebar";
import ChartCard from "./ChartCard";
import DraftEditor from "../shared/DraftEditor";
import FinalOutput from "../shared/FinalOutput";
import "./chart.css";

function findVersion(catKey, key, versionId) {
  const item = TEMPLATES[catKey]?.items[key];
  if (!item) return null;
  const version = item.versions.find((v) => v.id === versionId) ?? item.versions[0];
  return { item, version };
}

// `procedure` is shared with the Visit Note tab (see App.jsx); the version
// within it is this tab's own business, remembered per procedure so coming back
// reopens the same pill.
export default function ChartView({ weightKg, procedure, onSelectProcedure }) {
  const [search, setSearch] = useState("");
  const [versionIds, setVersionIds] = useState({});
  const [mobilePanel, setMobilePanel] = useState("list");
  const [card, dispatch] = useReducer(cardReducer, initialCard);
  // fill = pick a procedure and fill its blanks; edit = free-text the generated
  // draft; final = read-only, copyable. Session-only, like every other value here.
  const [step, setStep] = useState("fill");
  const [draftText, setDraftText] = useState("");

  const procId = procedure ? `${procedure.catKey}/${procedure.key}` : null;
  // null when the shared procedure has no Initial Chart entry, which shows the
  // empty state rather than falling through to a neighbouring procedure.
  const selected = procedure
    ? findVersion(procedure.catKey, procedure.key, versionIds[procId])
    : null;
  // What is actually rendered, which is not always the stored id: findVersion
  // falls back to the first version, and the sidebar pill has to agree with it.
  const selectionId = selected ? `${procId}/${selected.version.id}` : null;

  // Clearing the card when the selection changes has to happen here, not in the
  // click handler: the procedure can also change from the other tab, while this
  // view is mounted but hidden. Field ids are counted per template
  // (tokenize.js), so "f3" means something different in the next procedure and
  // stale answers would resurface under the wrong blanks.
  const [lastSelectionId, setLastSelectionId] = useState(selectionId);
  if (selectionId !== lastSelectionId) {
    setLastSelectionId(selectionId);
    dispatch({ type: "reset", cdtCodes: procedure ? CDT_CODES[procedure.catKey]?.[procedure.key] ?? [] : [] });
    setStep("fill");
    setDraftText("");
    setMobilePanel("chart");
  }
  const tokens = useMemo(() => (selected ? tokenizeVersion(selected.version) : null), [selected]);
  const flatTokens = useMemo(() => (tokens ? flattenTokens(tokens) : []), [tokens]);
  const toothIds = useMemo(
    () => flatTokens.filter((p) => p.type === "field" && p.ph === "tooth").map((p) => p.id),
    [flatTokens]
  );
  const showAnesthesia = useMemo(
    () => flatTokens.some((p) => p.type === "field" && (p.ph === "anesthetic" || p.ph === "dose")),
    [flatTokens]
  );
  // The counter tracks required blanks only: an optional one left empty simply
  // drops out of the note, so counting it would make "filled/total" unreachable.
  const requiredIds = useMemo(
    () => flatTokens.filter((p) => p.type === "field" && !p.optional).map((p) => p.id),
    [flatTokens]
  );
  const totalFields = requiredIds.length;
  const filledFields = requiredIds.filter((id) => isFilled(card.fieldValues[id])).length;
  // Named so the edit step can say what was dropped. Deduplicated: {tooth}
  // appears several times in a note but is one blank to the clinician.
  const droppedLabels = useMemo(
    () => [
      ...new Set(
        flatTokens
          .filter((p) => p.type === "field" && !p.optional && !isFilled(card.fieldValues[p.id]))
          .map((p) => fieldLabel(p.ph, CHART_LABELS))
      ),
    ],
    [flatTokens, card.fieldValues]
  );

  // Records the version for this procedure, then hands the procedure up to App.
  // The card reset is the block above, so re-picking the procedure already open
  // no longer wipes the answers — that is what Clear is for.
  function selectProc(catKey, key, versionId) {
    // versionId is null when the sidebar row was clicked rather than a version
    // pill: the user asked for the procedure, not for a particular version, so
    // the one remembered for it stands.
    if (versionId) setVersionIds((prev) => ({ ...prev, [`${catKey}/${key}`]: versionId }));
    onSelectProcedure({ catKey, key });
  }

  function handleReset() {
    if (!procedure) return;
    dispatch({ type: "reset", cdtCodes: CDT_CODES[procedure.catKey]?.[procedure.key] ?? [] });
    setStep("fill");
    setDraftText("");
  }

  // Next always regenerates the draft from the current field values, so going
  // Back to fill, changing a blank and pressing Next again discards hand edits.
  function handleNext() {
    if (!selected || !tokens) return;
    const verLabel = selected.item.versions.length > 1 ? ` — ${selected.version.label}` : "";
    setDraftText(
      getPlainChart({
        procedureName: selected.item.name + verLabel,
        tokens,
        fieldValues: card.fieldValues,
        cdtCodes: card.cdtCodes,
      })
    );
    setStep("edit");
  }

  return (
    <div className="chart">
      <Sidebar
        templates={TEMPLATES}
        search={search}
        onSearch={setSearch}
        active={selected ? { ...procedure, versionId: selected.version.id } : null}
        onSelect={selectProc}
        className={mobilePanel === "list" ? "mob-visible" : ""}
      />
      <div className={`chart-main${mobilePanel === "chart" ? " mob-visible" : ""}`}>
        <div className="chart-topbar">
          <button type="button" className="mob-back-btn" onClick={() => setMobilePanel("list")}>
            ← Procedures
          </button>
          <div className="chart-topbar-title">
            {selected ? (
              <>
                {selected.item.name}
                {selected.item.versions.length > 1 ? ` — ${selected.version.label}` : ""}
              </>
            ) : (
              "Select a procedure"
            )}
          </div>
          {selected && step === "fill" && (
            <>
              <span className="field-count">
                {filledFields}/{totalFields} filled
              </span>
              <button type="button" className="chart-action-btn" onClick={handleReset}>
                Clear
              </button>
              <button type="button" className="chart-action-btn primary" onClick={handleNext}>
                Next
              </button>
            </>
          )}
        </div>
        <div className="chart-scroll">
          {selected && tokens && step === "edit" && (
            <DraftEditor
              title="Review & edit"
              text={draftText}
              onChange={setDraftText}
              onBack={() => setStep("fill")}
              onDone={() => setStep("final")}
              dropped={droppedLabels}
              hint="Edit freely. Going back and pressing Next again rebuilds this from the blanks."
            />
          )}
          {selected && tokens && step === "final" && (
            <FinalOutput title="Final chart" text={draftText} onBack={() => setStep("edit")} />
          )}
          {selected && tokens && step === "fill" ? (
            <>
              <ChartCard
                item={selected.item}
                version={selected.version}
                tokens={tokens}
                fieldValues={card.fieldValues}
                onSetField={(id, ph, value) => dispatch({ type: "setField", id, ph, value, toothIds })}
                cdtCodes={card.cdtCodes}
                onAddCdt={(code) => dispatch({ type: "addCdt", code })}
                onRemoveCdt={(code) => dispatch({ type: "removeCdt", code })}
                showAnesthesia={showAnesthesia}
                anesthesia={card.anesthesia}
                onSetAnesthesia={(value) => dispatch({ type: "setAnesthesia", value })}
                weightKg={weightKg}
              />
              <p className="hint">
                Tap a highlighted blank to choose from a list or type your own · tooth number fills across the
                chart
              </p>
            </>
          ) : step === "fill" ? (
            <div className="chart-empty">
              <div className="chart-empty-title">Pick a procedure to begin</div>
              <p>
                Choose from the list on the left.
                <br />
                Tap highlighted blanks to select from a dropdown or type your own.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

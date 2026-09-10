// Step 2 of the fill → edit → final flow shared by the Chart and Rx tabs:
// a plain textarea holding the generated draft so it can be reworded freely
// before it is finalized. Deliberately dumb — the parent owns the text.
// `dropped` lists the blanks that were left empty; the Rx flow omits it.
export default function DraftEditor({ text, onChange, onBack, onDone, title, hint, dropped = [] }) {
  return (
    <div className="draft-editor">
      {title && <div className="step-title">{title}</div>}
      <textarea
        className="draft-textarea"
        value={text}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
      />
      {dropped.length > 0 && (
        // A blank left empty is removed from the note rather than printed as
        // "[anesthetic]". Removing it silently would be the wrong trade in a
        // clinical note, so say which ones went; the draft is editable either way.
        <p className="step-warning">
          ⚠ Left empty, so not in the note: {dropped.join(", ")}
        </p>
      )}
      {hint && <p className="step-hint">{hint}</p>}
      <div className="step-actions">
        <button type="button" className="step-btn" onClick={onBack}>
          ← Back
        </button>
        <button type="button" className="step-btn primary" onClick={onDone}>
          Done
        </button>
      </div>
    </div>
  );
}

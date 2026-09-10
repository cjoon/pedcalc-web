import { ANESTHETICS } from "./data/anesthetics";
import { agentMedication, carpulesToMg, maxAllowedMg } from "./anesthesia";
import { unconfirmedCapWarning } from "../calculations";

// Not in the prototype — new per PLAN.md, a standalone calculator (separate
// from the {anesthetic}/{dose} SOAP tokens) shown whenever a procedure uses
// those tokens, so carpule counts can be checked against the patient's
// shared weight before charting the free-text dose.
export default function AnesthesiaRow({ anesthesia, onChange, weightKg }) {
  const agent = anesthesia.agentIdx != null ? ANESTHETICS[anesthesia.agentIdx] : null;
  // Limits live in medications.js, reached through the agent's medicationId.
  const med = anesthesia.agentIdx != null ? agentMedication(anesthesia.agentIdx) : null;
  const carpules = parseFloat(anesthesia.carpules);
  const mg = agent && Number.isFinite(carpules) && carpules > 0 ? carpulesToMg(anesthesia.agentIdx, carpules) : null;
  const max = agent && weightKg ? maxAllowedMg(anesthesia.agentIdx, weightKg) : null;
  const exceeded = mg != null && max != null && mg > max;
  // Judged on the maximum the clinician is being shown, not only on what they
  // have entered so far — that is the number they would dose up to.
  const unconfirmedCap = unconfirmedCapWarning(med, max);

  return (
    <div className="anesthesia-row">
      <div className="soap-name">Anesthesia dose check</div>
      <div className="anesthesia-controls">
        <select
          className="select"
          value={anesthesia.agentIdx ?? ""}
          onChange={(e) => onChange({ agentIdx: e.target.value === "" ? null : Number(e.target.value) })}
        >
          <option value="">Select agent…</option>
          {ANESTHETICS.map((a, i) => (
            <option key={a.name} value={i}>
              {a.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          min="0"
          step="0.1"
          className="anesthesia-carpules no-spinner"
          placeholder="Carpules"
          value={anesthesia.carpules}
          onChange={(e) => onChange({ carpules: e.target.value })}
        />
      </div>
      {!weightKg && agent && (
        <div className="anesthesia-note">Enter patient weight on the Dosage tab to check the max dose.</div>
      )}
      {mg != null && (
        <div className={`anesthesia-result${exceeded ? " over" : ""}`}>
          {mg.toFixed(1)} mg
          {max != null && ` (max ${max.toFixed(1)} mg${weightKg ? ` @ ${weightKg.toFixed(1)} kg` : ""})`}
          {exceeded && " ⚠ exceeds max"}
        </div>
      )}
      {agent && weightKg && !med?.dosePerKg && (
        <div className="anesthesia-note">
          Max dose for {agent.name} not yet confirmed — mg shown for reference only.
        </div>
      )}
      {med?.warning && <div className="anesthesia-note">{med.warning}</div>}
      {med?.contraindication && <div className="anesthesia-note">{med.contraindication}</div>}
      {unconfirmedCap && <div className="anesthesia-note">{unconfirmedCap}</div>}
    </div>
  );
}

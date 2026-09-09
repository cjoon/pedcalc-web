import { ANESTHETICS, CARPULE_ML } from "./data/anesthetics";
import { medications } from "../medications";

export function carpulesToMg(agentIdx, carpules) {
  const agent = ANESTHETICS[agentIdx];
  if (!agent || !carpules) return null;
  return agent.concentrationMgMl * CARPULE_ML * carpules;
}

// The agent's entry in medications.js, which owns every max dose in the app
// (see src/chart/data/anesthetics.js). Returns null when the agent has no
// confirmed limits there.
export function agentMedication(agentIdx) {
  const agent = ANESTHETICS[agentIdx];
  if (!agent?.medicationId) return null;
  return medications.find((m) => m.id === agent.medicationId) ?? null;
}

// Returns null when the agent's clinical max mg/kg isn't confirmed in
// medications.js — callers must not warn without a known max.
export function maxAllowedMg(agentIdx, weightKg) {
  const med = agentMedication(agentIdx);
  if (!med?.dosePerKg || !weightKg) return null;
  const byWeight = med.dosePerKg * weightKg;
  return med.absoluteMaxMg ? Math.min(byWeight, med.absoluteMaxMg) : byWeight;
}

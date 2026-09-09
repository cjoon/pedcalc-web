import { createContext, useContext } from "react";
import { CHART_OPTIONS, CHART_LABELS } from "./data/fieldVocabulary";

// Which dropdown vocabulary a {ph} blank reads from. The Chart tab uses the
// prototype's OPTIONS with the corrections in optionOverrides.js layered on top;
// the Visit Note tab adds the prototype's VN-only lists above that. Both are
// assembled in src/chart/data/fieldVocabulary.js, which the template validators
// read too, so the UI and the validation can never disagree about which keys
// exist.
const DEFAULT_FIELD_OPTIONS = { options: CHART_OPTIONS, labels: CHART_LABELS };

export const FieldOptionsContext = createContext(DEFAULT_FIELD_OPTIONS);

export function useFieldOptions() {
  return useContext(FieldOptionsContext);
}

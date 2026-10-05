import type { UpsertPitfallInput } from "../../public-api/types";
import {
  PITFALL_AVOIDANCE_MAX_CHARS,
  PITFALL_CAUSE_MAX_CHARS,
  PITFALL_MAX_ACTIVE_PER_PROJECT,
  PITFALL_SYMPTOM_MAX_CHARS,
} from "./pitfall.constants";

export type PitfallValidationError =
  | { readonly kind: "field_too_long"; readonly field: string; readonly max: number }
  | { readonly kind: "active_cap"; readonly max: number }
  | { readonly kind: "empty_id" }
  | { readonly kind: "empty_project_id" };

export const validatePitfallFieldLengths = (
  input: Pick<UpsertPitfallInput, "symptom" | "cause" | "avoidance" | "id" | "projectId">,
): PitfallValidationError | null => {
  if (input.id.trim().length === 0) {
    return { kind: "empty_id" };
  }
  if (input.projectId.trim().length === 0) {
    return { kind: "empty_project_id" };
  }
  if (input.symptom.length > PITFALL_SYMPTOM_MAX_CHARS) {
    return {
      kind: "field_too_long",
      field: "symptom",
      max: PITFALL_SYMPTOM_MAX_CHARS,
    };
  }
  if (input.cause.length > PITFALL_CAUSE_MAX_CHARS) {
    return {
      kind: "field_too_long",
      field: "cause",
      max: PITFALL_CAUSE_MAX_CHARS,
    };
  }
  if (input.avoidance.length > PITFALL_AVOIDANCE_MAX_CHARS) {
    return {
      kind: "field_too_long",
      field: "avoidance",
      max: PITFALL_AVOIDANCE_MAX_CHARS,
    };
  }
  return null;
};

export const assertActiveCapAllows = (input: {
  readonly activeCountAfter: number;
}): PitfallValidationError | null => {
  if (input.activeCountAfter > PITFALL_MAX_ACTIVE_PER_PROJECT) {
    return { kind: "active_cap", max: PITFALL_MAX_ACTIVE_PER_PROJECT };
  }
  return null;
};

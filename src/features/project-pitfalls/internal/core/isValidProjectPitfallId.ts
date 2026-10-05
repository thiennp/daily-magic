import { PROJECT_PITFALL_ID_PATTERN } from "@agent-witch/shared/pitfalls";

export const isValidProjectPitfallId = (value: unknown): value is string =>
  typeof value === "string" && PROJECT_PITFALL_ID_PATTERN.test(value);

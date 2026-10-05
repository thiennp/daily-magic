import { PROJECT_PITFALL_ID_PATTERN } from "@/features/project-pitfalls/internal/core/projectPitfall.constant";

export const isValidProjectPitfallId = (value: unknown): value is string =>
  typeof value === "string" && PROJECT_PITFALL_ID_PATTERN.test(value);

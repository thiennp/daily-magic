import {
  PROJECT_FEATURE_FLAG_DEFAULTS,
  PROJECT_FEATURE_FLAG_KEYS,
  PROJECT_FEATURE_FLAG_STATES,
} from "./projectFlags.constant";
import type {
  ProjectFeatureFlags,
  ProjectFeatureFlagState,
} from "./projectFlags.type";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const readState = (value: unknown): ProjectFeatureFlagState | null =>
  PROJECT_FEATURE_FLAG_STATES.find((state) => state === value) ?? null;

/**
 * Tolerant flags parse. Unknown/missing keys fall back to defaults.
 * Returns null only when the root value is not an object.
 */
export const parseProjectFlags = (
  value: unknown,
): ProjectFeatureFlags | null => {
  if (!isRecord(value)) {
    return null;
  }
  const flags = { ...PROJECT_FEATURE_FLAG_DEFAULTS };
  for (const key of PROJECT_FEATURE_FLAG_KEYS) {
    const state = readState(value[key]);
    if (state !== null) {
      flags[key] = state;
    }
  }
  return flags;
};

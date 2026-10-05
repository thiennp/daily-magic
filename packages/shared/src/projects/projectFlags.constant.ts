import type {
  ProjectFeatureFlagKey,
  ProjectFeatureFlags,
  ProjectFeatureFlagState,
} from "./projectFlags.type";

export const PROJECT_FEATURE_FLAG_KEYS = [
  "pitfalls",
  "preflight",
  "localMcp",
  "history",
  "ollama",
  "skillGen",
] as const satisfies readonly ProjectFeatureFlagKey[];

export const PROJECT_FEATURE_FLAG_STATES = [
  "on",
  "off",
  "degraded",
  "unavailable",
] as const satisfies readonly ProjectFeatureFlagState[];

/**
 * Defaults on create-from-cwd yes (note 04).
 * Pitfalls, Preflight, Local MCP ON; History / Ollama / skill-gen OFF.
 */
export const PROJECT_FEATURE_FLAG_DEFAULTS: ProjectFeatureFlags = {
  pitfalls: "on",
  preflight: "on",
  localMcp: "on",
  history: "off",
  ollama: "off",
  skillGen: "off",
};

export const buildDefaultProjectFlags = (): ProjectFeatureFlags => ({
  ...PROJECT_FEATURE_FLAG_DEFAULTS,
});

export type ProjectFeatureFlagState =
  | "on"
  | "off"
  | "degraded"
  | "unavailable";

export type ProjectFeatureFlagKey =
  | "pitfalls"
  | "preflight"
  | "localMcp"
  | "history"
  | "ollama"
  | "skillGen";

/** Per-project token-saver switches (note 04). Stored in project meta / local cache. */
export type ProjectFeatureFlags = {
  readonly pitfalls: ProjectFeatureFlagState;
  readonly preflight: ProjectFeatureFlagState;
  readonly localMcp: ProjectFeatureFlagState;
  readonly history: ProjectFeatureFlagState;
  readonly ollama: ProjectFeatureFlagState;
  readonly skillGen: ProjectFeatureFlagState;
};

export type ProjectFeatureFlagState = "on" | "off" | "degraded" | "unavailable";

export type ProjectFeatureFlagKey =
  | "pitfalls"
  | "preflight"
  | "localMcp"
  | "history"
  | "ollama"
  | "skillGen"
  | "knowledge"
  | "knowledgeShare";

/** Per-project token-saver switches (note 04). Stored in project meta / local cache. */
export type ProjectFeatureFlags = {
  readonly pitfalls: ProjectFeatureFlagState;
  readonly preflight: ProjectFeatureFlagState;
  readonly localMcp: ProjectFeatureFlagState;
  readonly history: ProjectFeatureFlagState;
  readonly ollama: ProjectFeatureFlagState;
  readonly skillGen: ProjectFeatureFlagState;
  /** Local episode knowledge (notes in prompts + capture). Default on. */
  readonly knowledge: ProjectFeatureFlagState;
  /** Share note text with project owners (default off; numbers are always shared). */
  readonly knowledgeShare: ProjectFeatureFlagState;
};

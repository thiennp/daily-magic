/**
 * Wire view for the AWL Pitfalls tab, aligned with NRG
 * `ProjectPitfallView` (feat/awc-pitfall-registry).
 * UI labels: symptom = Title, keywords = Triggers, avoidance = Fix,
 * lastSeenAt = Last hit.
 *
 * Adapter seam: AW Mac SQLite (`feat/awl-pitfall-cache`) can implement
 * `AgentWitchProjectPitfallsStore` as write-through (upsert cloud, refresh
 * local) without changing the tab.
 */
export type AgentWitchPitfallSource = "seed" | "project" | "retired";

export type AgentWitchPitfallSeverity = "block" | "warn" | "info";

export type AgentWitchPitfallCheck = {
  readonly kind: "command" | "id";
  readonly value: string;
};

export type AgentWitchProjectPitfall = {
  readonly id: string;
  readonly projectId: string | null;
  readonly symptom: string;
  readonly cause: string;
  readonly avoidance: string;
  readonly check: AgentWitchPitfallCheck;
  readonly keywords: readonly string[];
  readonly tags: readonly string[];
  readonly source: AgentWitchPitfallSource;
  readonly overridesSeed: boolean;
  readonly hitCount: number;
  readonly lastSeenAt: string | null;
  readonly updatedAt: string | null;
  readonly severity: AgentWitchPitfallSeverity;
};

/** Upsert body (collection PUT/POST). Counters are never sent. */
export type AgentWitchProjectPitfallUpsert = {
  readonly id: string;
  readonly symptom: string;
  readonly cause: string;
  readonly avoidance: string;
  readonly check: AgentWitchPitfallCheck;
  readonly keywords: readonly string[];
  readonly tags: readonly string[];
  readonly source: "project" | "retired";
  readonly severity: AgentWitchPitfallSeverity;
};

/**
 * Wire view for Cloud UI, matching NRG `ProjectPitfallView`
 * (feat/awc-pitfall-registry). Kept in lib so src/lib stays free of
 * @/features imports.
 */
export type ProjectPitfallSeverity = "block" | "warn" | "info";

export type ProjectPitfallSource = "seed" | "project" | "retired";

export interface ProjectPitfallView {
  readonly id: string;
  readonly projectId: string | null;
  readonly symptom: string;
  readonly cause: string;
  readonly avoidance: string;
  readonly check: { readonly kind: "command" | "id"; readonly value: string };
  readonly keywords: readonly string[];
  readonly tags: readonly string[];
  readonly source: ProjectPitfallSource;
  readonly overridesSeed: boolean;
  readonly hitCount: number;
  readonly lastSeenAt: string | null;
  readonly updatedAt: string;
  readonly severity: ProjectPitfallSeverity;
}

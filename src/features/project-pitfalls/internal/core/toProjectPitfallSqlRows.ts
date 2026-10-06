import type { ProjectPitfallContent } from "@/features/project-pitfalls/internal/core/projectPitfall.type";

export interface ProjectPitfallSqlRow {
  readonly id: string;
  readonly symptom: string;
  readonly cause: string;
  readonly avoidance: string;
  readonly check_kind: string;
  readonly check_value: string;
  readonly keywords: readonly string[];
  readonly tags: readonly string[];
  readonly severity: string;
}

/** Flat rows for `jsonb_to_recordset` upserts. Pure. */
export const toProjectPitfallSqlRows = (
  pitfalls: readonly ProjectPitfallContent[],
): readonly ProjectPitfallSqlRow[] =>
  pitfalls.map((pitfall) => ({
    id: pitfall.id,
    symptom: pitfall.symptom,
    cause: pitfall.cause,
    avoidance: pitfall.avoidance,
    check_kind: pitfall.check.kind,
    check_value: pitfall.check.value,
    keywords: pitfall.keywords,
    tags: pitfall.tags,
    severity: pitfall.severity,
  }));

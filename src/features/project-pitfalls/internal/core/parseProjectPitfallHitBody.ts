import { PROJECT_PITFALL_MAX_HIT_BATCH } from "@agent-witch/shared/pitfalls";
import type {
  ProjectPitfallFailure,
  ProjectPitfallHitInput,
} from "@/features/project-pitfalls/internal/core/projectPitfall.type";

const asRecord = (value: unknown): Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};

/**
 * record_hit body: optional `count` (default 1, batched local hits) and
 * optional `seenAt` ISO time. Future times are clamped to now. Pure.
 */
export const parseProjectPitfallHitBody = (
  body: unknown,
  nowMs: number,
):
  | { readonly ok: true; readonly input: ProjectPitfallHitInput }
  | ProjectPitfallFailure => {
  const raw = asRecord(body);
  const count = raw.count === undefined ? 1 : raw.count;
  if (
    typeof count !== "number" ||
    !Number.isInteger(count) ||
    count < 1 ||
    count > PROJECT_PITFALL_MAX_HIT_BATCH
  ) {
    return { ok: false, code: "invalid_arguments", field: "count" };
  }
  const seenMs =
    typeof raw.seenAt === "string" ? Date.parse(raw.seenAt) : nowMs;
  if (Number.isNaN(seenMs)) {
    return { ok: false, code: "invalid_arguments", field: "seenAt" };
  }
  return {
    ok: true,
    input: { count, seenAt: new Date(Math.min(seenMs, nowMs)).toISOString() },
  };
};

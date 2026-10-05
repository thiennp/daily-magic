import { isValidProjectPitfallId } from "@/features/project-pitfalls/internal/core/isValidProjectPitfallId";
import {
  PROJECT_PITFALL_CHECK_KINDS,
  PROJECT_PITFALL_DEFAULT_SEVERITY,
  PROJECT_PITFALL_LIMITS as LIMITS,
  PROJECT_PITFALL_SEVERITIES,
} from "@/features/project-pitfalls/internal/core/projectPitfall.constant";
import type {
  ProjectPitfallFailure,
  ProjectPitfallUpsertInput,
} from "@/features/project-pitfalls/internal/core/projectPitfall.type";
import {
  readBoundedList,
  readBoundedText,
  readEnumValue,
} from "@/features/project-pitfalls/internal/core/readProjectPitfallFields";

const WRITABLE_SOURCES = ["project", "retired"] as const;

const invalid = (field: string): ProjectPitfallFailure => ({
  ok: false,
  code: "invalid_arguments",
  field,
});

const asRecord = (value: unknown): Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};

/** Full-content upsert body (counters are never accepted). Pure. */
export const validateProjectPitfallUpsert = (
  body: unknown,
):
  | { readonly ok: true; readonly input: ProjectPitfallUpsertInput }
  | ProjectPitfallFailure => {
  const raw = asRecord(body);
  const check = asRecord(raw.check);
  const id = typeof raw.id === "string" ? raw.id.trim() : raw.id;
  const symptom = readBoundedText(raw.symptom, LIMITS.symptom);
  const cause = readBoundedText(raw.cause, LIMITS.cause);
  const avoidance = readBoundedText(raw.avoidance, LIMITS.avoidance);
  const checkKind = readEnumValue(
    check.kind,
    PROJECT_PITFALL_CHECK_KINDS,
    "id",
  );
  const checkValue = readBoundedText(check.value, LIMITS.checkValue);
  const keywords = readBoundedList(
    raw.keywords,
    LIMITS.keywords,
    LIMITS.keyword,
  );
  const tags = readBoundedList(raw.tags, LIMITS.tags, LIMITS.tag);
  const severity = readEnumValue(
    raw.severity,
    PROJECT_PITFALL_SEVERITIES,
    PROJECT_PITFALL_DEFAULT_SEVERITY,
  );
  const source = readEnumValue(raw.source, WRITABLE_SOURCES, "project");
  if (!isValidProjectPitfallId(id)) return invalid("id");
  if (symptom === null) return invalid("symptom");
  if (cause === null) return invalid("cause");
  if (avoidance === null) return invalid("avoidance");
  if (raw.check === undefined || checkKind === null)
    return invalid("check.kind");
  if (checkValue === null) return invalid("check.value");
  if (keywords === null) return invalid("keywords");
  if (tags === null) return invalid("tags");
  if (severity === null) return invalid("severity");
  if (source === null) return invalid("source");
  return {
    ok: true,
    input: {
      id,
      symptom,
      cause,
      avoidance,
      check: { kind: checkKind, value: checkValue },
      keywords,
      tags,
      severity,
      source,
    },
  };
};

import {
  PROJECT_PITFALL_DEFAULT_SEVERITY,
  PROJECT_PITFALL_SEVERITIES,
  PROJECT_PITFALL_SOURCES,
} from "./projectPitfall.constant";
import type {
  ProjectPitfallListResult,
  ProjectPitfallView,
} from "./ProjectPitfall.type";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const readString = (value: unknown): string | null =>
  typeof value === "string" ? value : null;

const readStringList = (value: unknown): readonly string[] =>
  Array.isArray(value)
    ? value.filter((entry): entry is string => typeof entry === "string")
    : [];

/** Single wire item. Returns null when id or symptom is missing/blank. */
export const parseProjectPitfall = (
  value: unknown,
): ProjectPitfallView | null => {
  if (!isRecord(value)) {
    return null;
  }
  const id = readString(value.id)?.trim() ?? "";
  const symptom = readString(value.symptom)?.trim() ?? "";
  if (id.length === 0 || symptom.length === 0) {
    return null;
  }
  const source =
    PROJECT_PITFALL_SOURCES.find((entry) => entry === value.source) ??
    "project";
  const severity =
    PROJECT_PITFALL_SEVERITIES.find((entry) => entry === value.severity) ??
    PROJECT_PITFALL_DEFAULT_SEVERITY;
  const rawCheck = isRecord(value.check) ? value.check : null;
  const checkKind = rawCheck?.kind === "command" ? "command" : "id";
  const checkValue = readString(rawCheck?.value)?.trim() ?? "";
  const projectIdRaw = readString(value.projectId)?.trim() ?? null;

  return {
    id,
    projectId:
      projectIdRaw !== null && projectIdRaw.length > 0 ? projectIdRaw : null,
    symptom,
    cause: readString(value.cause)?.trim() ?? "",
    avoidance: readString(value.avoidance)?.trim() ?? "",
    check: {
      kind: checkKind,
      value: checkValue.length > 0 ? checkValue : id,
    },
    keywords: readStringList(value.keywords),
    tags: readStringList(value.tags),
    source,
    overridesSeed: value.overridesSeed === true,
    hitCount:
      typeof value.hitCount === "number" && Number.isFinite(value.hitCount)
        ? Math.max(0, Math.floor(value.hitCount))
        : 0,
    lastSeenAt: readString(value.lastSeenAt),
    updatedAt: readString(value.updatedAt),
    severity,
  };
};

/**
 * Parses NRG list body `{ ok?, pitfalls: View[], syncedAt? }`.
 * Returns null when the body is not that shape (shape error).
 */
export const parseProjectPitfallList = (
  body: unknown,
): ProjectPitfallListResult | null => {
  if (!isRecord(body) || !Array.isArray(body.pitfalls)) {
    return null;
  }
  return {
    items: body.pitfalls
      .map((item) => parseProjectPitfall(item))
      .filter((item): item is ProjectPitfallView => item !== null),
    syncedAt: readString(body.syncedAt),
  };
};

export const countActiveProjectPitfalls = (
  items: readonly ProjectPitfallView[],
): number => items.filter((item) => item.source !== "retired").length;

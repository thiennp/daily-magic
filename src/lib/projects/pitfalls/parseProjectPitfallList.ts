import type {
  ProjectPitfallSeverity,
  ProjectPitfallSource,
  ProjectPitfallView,
} from "@/lib/projects/pitfalls/ProjectPitfall.type";

const SOURCES: readonly ProjectPitfallSource[] = ["seed", "project", "retired"];
const SEVERITIES: readonly ProjectPitfallSeverity[] = ["block", "warn", "info"];

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const readTrimmed = (value: unknown): string =>
  typeof value === "string" ? value.trim() : "";

const readStrings = (value: unknown): readonly string[] =>
  Array.isArray(value)
    ? value.filter((entry): entry is string => typeof entry === "string")
    : [];

const parseProjectPitfallView = (value: unknown): ProjectPitfallView | null => {
  if (!isRecord(value)) {
    return null;
  }
  const id = readTrimmed(value.id);
  const symptom = readTrimmed(value.symptom);
  if (id.length === 0 || symptom.length === 0) {
    return null;
  }
  const check = isRecord(value.check) ? value.check : null;
  const checkValue = readTrimmed(check?.value);
  const projectIdRaw = readTrimmed(value.projectId);
  return {
    id,
    projectId: projectIdRaw.length > 0 ? projectIdRaw : null,
    symptom,
    cause: readTrimmed(value.cause),
    avoidance: readTrimmed(value.avoidance),
    check: {
      kind: check?.kind === "command" ? "command" : "id",
      value: checkValue.length > 0 ? checkValue : id,
    },
    keywords: readStrings(value.keywords),
    tags: readStrings(value.tags),
    source: SOURCES.find((entry) => entry === value.source) ?? "project",
    overridesSeed: value.overridesSeed === true,
    hitCount:
      typeof value.hitCount === "number" && Number.isFinite(value.hitCount)
        ? Math.max(0, Math.floor(value.hitCount))
        : 0,
    lastSeenAt: typeof value.lastSeenAt === "string" ? value.lastSeenAt : null,
    updatedAt:
      typeof value.updatedAt === "string"
        ? value.updatedAt
        : "1970-01-01T00:00:00.000Z",
    severity: SEVERITIES.find((entry) => entry === value.severity) ?? "warn",
  };
};

export type ParseProjectPitfallListResult = {
  readonly items: readonly ProjectPitfallView[];
  readonly syncedAt: string | null;
};

/** Parses NRG `{ pitfalls, syncedAt }` list; null when the body has another shape. */
const parseProjectPitfallList = (
  body: unknown,
): ParseProjectPitfallListResult | null => {
  if (!isRecord(body) || !Array.isArray(body.pitfalls)) {
    return null;
  }
  return {
    items: body.pitfalls
      .map((item) => parseProjectPitfallView(item))
      .filter((item): item is ProjectPitfallView => item !== null),
    syncedAt: typeof body.syncedAt === "string" ? body.syncedAt : null,
  };
};

export default parseProjectPitfallList;

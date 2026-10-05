import type {
  AgentWitchPitfallSeverity,
  AgentWitchPitfallSource,
  AgentWitchProjectPitfall,
} from "./agentWitchProjectPitfall.type";

const SOURCES: readonly AgentWitchPitfallSource[] = [
  "seed",
  "project",
  "retired",
];
const SEVERITIES: readonly AgentWitchPitfallSeverity[] = [
  "block",
  "warn",
  "info",
];

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const readString = (value: unknown): string | null =>
  typeof value === "string" ? value : null;

const readStringList = (value: unknown): readonly string[] =>
  Array.isArray(value)
    ? value.filter((entry): entry is string => typeof entry === "string")
    : [];

export const parseAgentWitchProjectPitfall = (
  value: unknown,
): AgentWitchProjectPitfall | null => {
  if (!isRecord(value)) {
    return null;
  }
  const id = readString(value.id)?.trim() ?? "";
  const symptom = readString(value.symptom)?.trim() ?? "";
  if (id.length === 0 || symptom.length === 0) {
    return null;
  }
  const source = SOURCES.find((entry) => entry === value.source) ?? "project";
  const severity =
    SEVERITIES.find((entry) => entry === value.severity) ?? "warn";
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

export type AgentWitchProjectPitfallListResult = {
  readonly items: readonly AgentWitchProjectPitfall[];
  readonly syncedAt: string | null;
};

/**
 * Parses NRG list body: `{ ok?, pitfalls: View[], syncedAt? }`.
 * Returns null when the body is not that shape.
 */
export const parseAgentWitchProjectPitfallList = (
  body: unknown,
): AgentWitchProjectPitfallListResult | null => {
  if (!isRecord(body) || !Array.isArray(body.pitfalls)) {
    return null;
  }
  return {
    items: body.pitfalls
      .map((item) => parseAgentWitchProjectPitfall(item))
      .filter((item): item is AgentWitchProjectPitfall => item !== null),
    syncedAt: readString(body.syncedAt),
  };
};

export const countActiveAgentWitchPitfalls = (
  items: readonly AgentWitchProjectPitfall[],
): number => items.filter((item) => item.source !== "retired").length;

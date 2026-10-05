import { PREFLIGHT_ACTION_IDS } from "./preflightAction.constant";
import type {
  PreflightCheckResult,
  PreflightEvidence,
  PreflightRunResult,
} from "./PreflightResult.type";
import { PREFLIGHT_RESULT_STATUSES } from "./preflightStatus.constant";
import { toSafePreflightEvidence } from "./toSafePreflightEvidence";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const readString = (value: unknown): string | null =>
  typeof value === "string" ? value : null;

const readStatus = (value: unknown) =>
  PREFLIGHT_RESULT_STATUSES.find((status) => status === value) ?? null;

const readActionId = (value: unknown) =>
  PREFLIGHT_ACTION_IDS.find((id) => id === value) ?? null;

const parseEvidenceList = (value: unknown): readonly PreflightEvidence[] => {
  if (!Array.isArray(value)) {
    return [];
  }
  const items: PreflightEvidence[] = [];
  for (const entry of value) {
    if (!isRecord(entry)) continue;
    const kind = readString(entry.kind);
    const summary = readString(entry.summary);
    if (kind === null || summary === null) continue;
    const fingerprint = readString(entry.fingerprint) ?? undefined;
    items.push({
      kind: kind as PreflightEvidence["kind"],
      summary,
      ...(fingerprint !== undefined ? { fingerprint } : {}),
    });
  }
  return toSafePreflightEvidence(items);
};

const parseCheckResult = (value: unknown): PreflightCheckResult | null => {
  if (!isRecord(value)) return null;
  const status = readStatus(value.status);
  const actionId = readActionId(value.actionId);
  const checkId = readString(value.checkId)?.trim() ?? "";
  const name = readString(value.name)?.trim() ?? "";
  if (status === null || actionId === null || checkId.length === 0) {
    return null;
  }
  return {
    status,
    checkId,
    name: name.length > 0 ? name : checkId,
    reason: readString(value.reason)?.trim() ?? "",
    fix: readString(value.fix)?.trim() ?? "",
    rerunHint: readString(value.rerunHint)?.trim() ?? "",
    evidence: parseEvidenceList(value.evidence),
    actionId,
  };
};

/** Tolerant parse of a Mac-posted preflight payload. Null on bad shape. */
export const parsePreflightRunResult = (
  body: unknown,
): PreflightRunResult | null => {
  if (!isRecord(body) || !Array.isArray(body.results)) {
    return null;
  }
  const results = body.results
    .map((item) => parseCheckResult(item))
    .filter((item): item is PreflightCheckResult => item !== null);
  const status = readStatus(body.status);
  if (status === null) {
    return null;
  }
  return { status, results };
};

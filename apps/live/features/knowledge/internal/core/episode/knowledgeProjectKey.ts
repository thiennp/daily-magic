import { createHash } from "node:crypto";

const DEFAULT_HOLDOUT_PERCENT = 10;

export const resolveKnowledgeProjectKey = (input: {
  readonly projectId?: string;
  readonly projectFolderPath: string;
}): string => {
  const projectId = input.projectId?.trim() ?? "";
  return projectId.length > 0 ? projectId : `path:${input.projectFolderPath}`;
};

export const isKnowledgeEnabled = (): boolean =>
  process.env.AGENT_WITCH_KNOWLEDGE?.trim().toLowerCase() !== "off";

export const resolveKnowledgeHoldoutPercent = (): number => {
  const raw = Number.parseInt(
    process.env.AGENT_WITCH_KNOWLEDGE_HOLDOUT_PERCENT ?? "",
    10,
  );
  return Number.isFinite(raw) && raw >= 0 && raw <= 100
    ? raw
    : DEFAULT_HOLDOUT_PERCENT;
};

/** Deterministic holdout: a stable slice of runs skips retrieval for A/B numbers. */
export const isKnowledgeHoldoutRun = (
  runId: string,
  percent: number = resolveKnowledgeHoldoutPercent(),
): boolean => {
  if (percent <= 0) {
    return false;
  }
  const bucket = Number.parseInt(
    createHash("sha256").update(runId).digest("hex").slice(0, 8),
    16,
  );
  return bucket % 100 < percent;
};

export const fingerprintKnowledgeText = (text: string): string =>
  createHash("sha256")
    .update(text.trim().split("\n")[0]?.trim().slice(0, 500) ?? "")
    .digest("hex")
    .slice(0, 16);

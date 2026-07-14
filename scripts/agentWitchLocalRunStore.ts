import fs from "node:fs";
import path from "node:path";

import type AgentRunRecord from "./dispatch/types/AgentRunRecord.type";
import type { AgentWitchLocalLayout } from "./resolveAgentWitchLocalLayout";

const RUNS_DIR_NAME = "runs";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const resolveRunsDir = (layout: AgentWitchLocalLayout): string => {
  const runsDir =
    layout.profileEmail !== null
      ? path.join(
          layout.installDir,
          "profiles",
          layout.profileEmail,
          RUNS_DIR_NAME,
        )
      : path.join(layout.installDir, RUNS_DIR_NAME);

  fs.mkdirSync(runsDir, { recursive: true });
  return runsDir;
};

const resolveRunPath = (layout: AgentWitchLocalLayout, runId: string): string =>
  path.join(resolveRunsDir(layout), `${runId}.json`);

export const saveAgentRunLocal = (
  layout: AgentWitchLocalLayout,
  run: AgentRunRecord,
): void => {
  fs.writeFileSync(
    resolveRunPath(layout, run.id),
    JSON.stringify(run, null, 2),
  );
};

export const loadAgentRunLocal = (
  layout: AgentWitchLocalLayout,
  runId: string,
): AgentRunRecord | null => {
  const runPath = resolveRunPath(layout, runId);
  if (!fs.existsSync(runPath)) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(fs.readFileSync(runPath, "utf8"));
    if (!isRecord(parsed) || typeof parsed.id !== "string") {
      return null;
    }

    return parsed as unknown as AgentRunRecord;
  } catch {
    return null;
  }
};

export const listAgentRunsLocal = (
  layout: AgentWitchLocalLayout,
): readonly AgentRunRecord[] => {
  const runsDir = resolveRunsDir(layout);
  const entries = fs.readdirSync(runsDir, { withFileTypes: true });
  const runs: AgentRunRecord[] = [];

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".json")) {
      continue;
    }

    const runId = entry.name.replace(/\.json$/, "");
    const run = loadAgentRunLocal(layout, runId);
    if (run !== null) {
      runs.push(run);
    }
  }

  return runs.toSorted((left, right) =>
    right.createdAt.localeCompare(left.createdAt),
  );
};

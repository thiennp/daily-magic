import fs from "node:fs";
import path from "node:path";

import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

import type { AgentWitchCloudApiConfig } from "../../../projects/internal/core/agentWitchCloudApi";

import { createHttpAutoSkillCloud } from "./autoSkillCloud";
import { probeSignedInAutoSkillAgent } from "./autoSkillAgent";
import { probeAutoSkillOllamaModel } from "./autoSkillOllama";
import { selectAutoSkillJudge } from "./autoSkillSelectJudge";
import type { AutoSkillOutcome } from "./onAutoSkillRunCompleted.types";
import { reportAutoSkillRunCompleted } from "./reportAutoSkillRunCompleted";
import { resolveProjectDataDir } from "./resolveProjectDataDir";
import { PROJECT_HISTORY_TASKS_DIR_NAME } from "./projectHistoryPaths.constant";

/** Newest completed tasks to feed; older ones rarely add a new repeat. */
const SCAN_MAX_TASKS = 60;

type StoredTask = {
  readonly taskId: string;
  readonly status: string;
  readonly promptBody: string | null;
  readonly resultBody: string | null;
  readonly writerAgent: string | null;
  readonly createdAt: string;
  readonly completedAt: string | null;
};

export type AutoSkillScanSummary = {
  readonly scanned: number;
  readonly asked: number;
  readonly outcomes: Readonly<Partial<Record<AutoSkillOutcome, number>>>;
};

const readStoredTasks = (projectId: string): StoredTask[] => {
  const dir = path.join(
    resolveProjectDataDir(projectId),
    PROJECT_HISTORY_TASKS_DIR_NAME,
  );
  let names: string[];
  try {
    names = fs.readdirSync(dir).filter((name) => name.endsWith(".json"));
  } catch {
    return [];
  }
  return names
    .flatMap((name): StoredTask[] => {
      try {
        const raw = JSON.parse(
          fs.readFileSync(path.join(dir, name), "utf8"),
        ) as Partial<StoredTask>;
        return typeof raw.taskId === "string" &&
          raw.status === "completed" &&
          typeof raw.promptBody === "string" &&
          raw.promptBody.trim().length > 0
          ? [
              {
                taskId: raw.taskId,
                status: raw.status,
                promptBody: raw.promptBody,
                resultBody: raw.resultBody ?? null,
                writerAgent: raw.writerAgent ?? null,
                createdAt: String(raw.createdAt ?? ""),
                completedAt: raw.completedAt ?? null,
              },
            ]
          : [];
      } catch {
        return [];
      }
    })
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
    .slice(-SCAN_MAX_TASKS);
};

const describeScan = (summary: AutoSkillScanSummary): string =>
  summary.scanned === 0
    ? "Scanned this computer: no finished tasks to check yet."
    : `Scanned ${summary.scanned} finished task${summary.scanned === 1 ? "" : "s"} on this computer · ${
        summary.asked === 0
          ? "no repeated step found yet"
          : `${summary.asked} question${summary.asked === 1 ? "" : "s"} raised`
      }.`;

/**
 * Manual "Scan past tasks": feeds this computer's finished tasks for one
 * project through the same hook a live run uses (idempotent per run id), then
 * reports a one-line summary to the strip. Never throws.
 */
export const scanProjectTasksForAutoSkills = async (input: {
  readonly cloudApi: AgentWitchCloudApiConfig;
  readonly layout: AgentWitchLocalLayout;
  readonly projectId: string;
  readonly folderPath?: string;
}): Promise<AutoSkillScanSummary> => {
  const outcomes: Partial<Record<AutoSkillOutcome, number>> = {};
  let tasks: StoredTask[] = [];
  try {
    tasks = readStoredTasks(input.projectId);
  } catch {
    tasks = [];
  }
  for (const task of tasks) {
    const outcome = await reportAutoSkillRunCompleted({
      cloudApi: input.cloudApi,
      projectId: input.projectId,
      run: {
        runId: task.taskId,
        prompt: task.promptBody ?? "",
        resultSummary: (task.resultBody ?? "").slice(0, 600),
        completedAt: task.completedAt ?? task.createdAt,
        writerAgent: task.writerAgent,
        taskTitle:
          (task.promptBody ?? "").split("\n", 1)[0]?.trim().slice(0, 120) ?? "",
      },
      layout: input.layout,
      ...(input.folderPath !== undefined
        ? { folderPath: input.folderPath }
        : {}),
      ...(task.resultBody !== null ? { agentOutput: task.resultBody } : {}),
    });
    outcomes[outcome] = (outcomes[outcome] ?? 0) + 1;
    if (outcome === "disabled" || outcome === "paused") {
      break;
    }
  }
  const summary: AutoSkillScanSummary = {
    scanned: tasks.length,
    asked: outcomes.asked ?? 0,
    outcomes,
  };
  try {
    const cloud = createHttpAutoSkillCloud(input.cloudApi);
    const settings = await cloud.getSettings(input.projectId);
    const writer = tasks[tasks.length - 1]?.writerAgent ?? null;
    const choice = selectAutoSkillJudge(settings.judgePref, {
      ollamaModel: await probeAutoSkillOllamaModel(),
      agentWriter: await probeSignedInAutoSkillAgent(writer),
      botName: null,
    });
    await cloud.postStatus(input.projectId, {
      judgeKind: choice.ok ? choice.kind : null,
      judgeLabel: choice.ok ? choice.label : null,
      pausedReason: choice.ok ? null : choice.pausedReason,
      note: describeScan(summary),
    });
  } catch {
    // the strip keeps its previous status line
  }
  return summary;
};

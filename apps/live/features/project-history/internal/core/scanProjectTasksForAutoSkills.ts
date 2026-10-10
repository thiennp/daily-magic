import fs from "node:fs";
import path from "node:path";

import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

import type { AgentWitchCloudApiConfig } from "../../../projects/internal/core/agentWitchCloudApi";

import { createHttpAutoSkillCloud } from "./autoSkillCloud";
import { announceScanStart, prepareScanJudge } from "./prepareScanJudge";
import type { AutoSkillOutcome } from "./onAutoSkillRunCompleted.types";
import { reportAutoSkillRunCompleted } from "./reportAutoSkillRunCompleted";
import {
  clampScanCommits,
  readMainBranchCommits,
} from "./readMainBranchCommits";
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
  /** Commits of the main branch fed in (0 when the folder has no git). */
  readonly commitsScanned: number;
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

const plural = (n: number, word: string): string =>
  `${n} ${word}${n === 1 ? "" : "s"}`;

/** Strip line while a scan works through runs; the page treats it as "still running". */
export const describeScanProgress = (
  kind: "task" | "commit",
  done: number,
  total: number,
): string => `Checking ${kind} ${done} of ${total}…`;

/** First strip line of a scan, posted before any AI call. */
export const describeScanStart = (tasks: number, commits: number): string =>
  `Starting: ${
    [
      tasks === 0 ? null : plural(tasks, "finished task"),
      commits === 0 ? null : plural(commits, "commit"),
    ]
      .filter((part): part is string => part !== null)
      .join(" and ") || "nothing to check yet"
  }…`;

export const describeScan = (
  summary: AutoSkillScanSummary,
  branch: string | null = null,
): string => {
  const parts = [
    summary.scanned === 0
      ? null
      : `${plural(summary.scanned, "finished task")}`,
    summary.commitsScanned === 0
      ? null
      : `the last ${plural(summary.commitsScanned, "commit")} on ${branch ?? "main"}`,
  ].filter((part): part is string => part !== null);
  if (parts.length === 0) {
    return "Scanned this computer: no finished tasks to check yet.";
  }
  return `Scanned ${parts.join(" and ")} on this computer · ${
    summary.asked === 0
      ? "nothing worth saving as a skill yet"
      : `${plural(summary.asked, "question")} raised`
  }.`;
};

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
  /** Newest commits of the main branch to feed; default 5. */
  readonly commits?: number;
}): Promise<AutoSkillScanSummary> => {
  const outcomes: Partial<Record<AutoSkillOutcome, number>> = {};
  let tasks: StoredTask[] = [];
  try {
    tasks = readStoredTasks(input.projectId);
  } catch {
    tasks = [];
  }
  const history =
    input.folderPath === undefined
      ? null
      : await readMainBranchCommits(
          input.folderPath,
          clampScanCommits(input.commits),
        ).catch(() => null);
  const allCommits = [...(history?.commits ?? [])].reverse();
  const prepared = await prepareScanJudge(
    input.cloudApi,
    input.projectId,
    tasks[tasks.length - 1]?.writerAgent ?? null,
  );
  await announceScanStart(
    input.cloudApi,
    input.projectId,
    prepared,
    describeScanStart(tasks.length, allCommits.length),
  );
  let stopped = false;
  for (const [index, task] of tasks.entries()) {
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
      ...(prepared !== null ? { availability: prepared.availability } : {}),
      statusNote: describeScanProgress("task", index + 1, tasks.length),
      evaluateEachRun: true,
      ...(input.folderPath !== undefined
        ? { folderPath: input.folderPath }
        : {}),
      ...(task.resultBody !== null ? { agentOutput: task.resultBody } : {}),
    });
    outcomes[outcome] = (outcomes[outcome] ?? 0) + 1;
    if (outcome === "disabled" || outcome === "paused") {
      stopped = true;
      break;
    }
  }
  const commitsToScan = stopped ? [] : allCommits;
  for (const [index, commit] of commitsToScan.entries()) {
    const outcome = await reportAutoSkillRunCompleted({
      cloudApi: input.cloudApi,
      projectId: input.projectId,
      run: {
        runId: `git:${commit.sha}`,
        prompt: commit.subject,
        resultSummary: commit.body.slice(0, 600),
        completedAt: commit.committedAt,
        writerAgent: null,
        taskTitle: commit.subject.slice(0, 120),
      },
      layout: input.layout,
      folderPath: input.folderPath ?? "",
      ...(prepared !== null ? { availability: prepared.availability } : {}),
      evaluateEachRun: true,
      statusNote: describeScanProgress(
        "commit",
        index + 1,
        commitsToScan.length,
      ),
    });
    outcomes[outcome] = (outcomes[outcome] ?? 0) + 1;
    if (outcome === "disabled" || outcome === "paused") {
      break;
    }
  }
  const summary: AutoSkillScanSummary = {
    scanned: tasks.length,
    commitsScanned: commitsToScan.length,
    asked: outcomes.asked ?? 0,
    outcomes,
  };
  const choice = prepared?.choice ?? null;
  await createHttpAutoSkillCloud(input.cloudApi)
    .postStatus(input.projectId, {
      judgeKind: choice?.ok ? choice.kind : null,
      judgeLabel: choice?.ok ? choice.label : null,
      pausedReason: choice !== null && !choice.ok ? choice.pausedReason : null,
      note: describeScan(summary, history?.branch ?? null),
      gitCommits: history?.total ?? null,
      gitScanned: commitsToScan.length,
    })
    .catch(() => undefined); // the strip keeps its previous status line
  return summary;
};

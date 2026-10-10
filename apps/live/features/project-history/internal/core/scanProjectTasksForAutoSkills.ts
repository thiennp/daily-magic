import fs from "node:fs";
import path from "node:path";

import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

import type { AgentWitchCloudApiConfig } from "../../../projects/internal/core/agentWitchCloudApi";

import { createHttpAutoSkillCloud } from "./autoSkillCloud";
import { readCommitChanges } from "./readCommitChanges";
import { autoSkillLog, withTimeout } from "./autoSkillLog";
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
/** One run never holds a scan longer than this (a stall becomes a judge failure, not silence). */
const RUN_TIMEOUT_MS = 8 * 60_000;
/** The judge failing this many runs in a row (out of usage, signed out) ends the scan. */
const MAX_JUDGE_FAILURES = 2;

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
  /** Why the scan stopped early (the judge could not answer), when it did. */
  readonly stoppedReason?: string;
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

type JudgeHealth = { failures: number; reason: string | null };

/** Run one task or commit through the judge with a log line each side and a hard time limit. */
const runGuarded = async (
  kind: "task" | "commit",
  done: number,
  total: number,
  health: JudgeHealth,
  work: () => Promise<AutoSkillOutcome>,
): Promise<AutoSkillOutcome> => {
  const started = Date.now();
  autoSkillLog(`${kind} ${done} of ${total}: start`);
  const outcome = await withTimeout(work(), RUN_TIMEOUT_MS, "judge_failed");
  const seconds = Math.round((Date.now() - started) / 1000);
  if (Date.now() - started >= RUN_TIMEOUT_MS) {
    health.reason = "the run took too long";
  }
  autoSkillLog(`${kind} ${done} of ${total}: ${outcome} in ${seconds}s`);
  return outcome;
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
  if (summary.stoppedReason !== undefined) {
    return `Stopped: the judge could not answer (${summary.stoppedReason}). Check that it is signed in and has usage left; runs it already judged are kept.`;
  }
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
  autoSkillLog(
    `scan ${input.projectId.slice(0, 8)}: ${tasks.length} tasks, ${allCommits.length} commits`,
  );
  await announceScanStart(
    input.cloudApi,
    input.projectId,
    prepared,
    describeScanStart(tasks.length, allCommits.length),
  );
  const health = { failures: 0, reason: null as string | null };
  const trackJudge = (outcome: AutoSkillOutcome): boolean => {
    health.failures = outcome === "judge_failed" ? health.failures + 1 : 0;
    return health.failures >= MAX_JUDGE_FAILURES;
  };
  let stopped = false;
  for (const [index, task] of tasks.entries()) {
    const outcome = await runGuarded(
      "task",
      index + 1,
      tasks.length,
      health,
      () =>
        reportAutoSkillRunCompleted({
          cloudApi: input.cloudApi,
          projectId: input.projectId,
          run: {
            runId: task.taskId,
            prompt: task.promptBody ?? "",
            resultSummary: (task.resultBody ?? "").slice(0, 600),
            completedAt: task.completedAt ?? task.createdAt,
            writerAgent: task.writerAgent,
            taskTitle:
              (task.promptBody ?? "").split("\n", 1)[0]?.trim().slice(0, 120) ??
              "",
          },
          layout: input.layout,
          onJudgeFailure: (reason) => {
            health.reason = reason;
          },
          ...(prepared !== null ? { availability: prepared.availability } : {}),
          statusNote: describeScanProgress("task", index + 1, tasks.length),
          evaluateEachRun: true,
          ...(input.folderPath !== undefined
            ? { folderPath: input.folderPath }
            : {}),
          ...(task.resultBody !== null ? { agentOutput: task.resultBody } : {}),
        }),
    );
    outcomes[outcome] = (outcomes[outcome] ?? 0) + 1;
    if (outcome === "disabled" || outcome === "paused" || trackJudge(outcome)) {
      stopped = true;
      break;
    }
  }
  const commitsToScan = stopped ? [] : allCommits;
  for (const [index, commit] of commitsToScan.entries()) {
    const changes =
      input.folderPath === undefined
        ? null
        : await readCommitChanges(input.folderPath, commit.sha);
    const outcome = await runGuarded(
      "commit",
      index + 1,
      commitsToScan.length,
      health,
      () =>
        reportAutoSkillRunCompleted({
          cloudApi: input.cloudApi,
          projectId: input.projectId,
          run: {
            runId: `git:${commit.sha}`,
            prompt: commit.subject,
            resultSummary: commit.body.slice(0, 600),
            completedAt: commit.committedAt,
            writerAgent: null,
            taskTitle: commit.subject.slice(0, 120),
            ...(changes !== null ? { changes } : {}),
          },
          layout: input.layout,
          folderPath: input.folderPath ?? "",
          onJudgeFailure: (reason) => {
            health.reason = reason;
          },
          ...(prepared !== null ? { availability: prepared.availability } : {}),
          evaluateEachRun: true,
          statusNote: describeScanProgress(
            "commit",
            index + 1,
            commitsToScan.length,
          ),
        }),
    );
    outcomes[outcome] = (outcomes[outcome] ?? 0) + 1;
    if (outcome === "disabled" || outcome === "paused" || trackJudge(outcome)) {
      break;
    }
  }
  const summary: AutoSkillScanSummary = {
    scanned: tasks.length,
    commitsScanned: commitsToScan.length,
    asked: outcomes.asked ?? 0,
    ...(health.failures >= MAX_JUDGE_FAILURES
      ? { stoppedReason: health.reason ?? "judge_failed" }
      : {}),
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

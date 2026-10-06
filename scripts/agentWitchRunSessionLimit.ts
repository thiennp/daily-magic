import type { ChildProcess } from "node:child_process";

import {
  parseAgentRunSessionLimit,
  type AgentRunSessionLimit,
} from "@/lib/dispatch/types/AgentRunSessionLimit.type";

import { LOCAL_CLI_RUN_LIMITS } from "./localCliRunLimits.constant";

/** S0-6: the hard wall-clock limit every local CLI run gets (AgentRunSessionLimit). */
export const LOCAL_CLI_RUN_SESSION_LIMIT: AgentRunSessionLimit =
  parseAgentRunSessionLimit(LOCAL_CLI_RUN_LIMITS.maxMinutes * 60) ?? {
    limitSeconds: 30 * 60,
  };

/** Grace between SIGTERM and SIGKILL when a run's process tree is stopped. */
export const LOCAL_CLI_KILL_GRACE_MS = 5_000;

const timers = new Map<string, ReturnType<typeof setTimeout>>();

/**
 * Arm (or re-arm) the session-limit timer for one run. On expiry `onLimit`
 * runs once; the caller stops the run through the stop-run path.
 */
export const armRunSessionLimit = (
  agentRunId: string,
  onLimit: () => void,
  limit: AgentRunSessionLimit = LOCAL_CLI_RUN_SESSION_LIMIT,
): void => {
  clearRunSessionLimit(agentRunId);
  const timer = setTimeout(() => {
    timers.delete(agentRunId);
    onLimit();
  }, limit.limitSeconds * 1000);
  timer.unref?.();
  timers.set(agentRunId, timer);
};

export const clearRunSessionLimit = (agentRunId: string): void => {
  const timer = timers.get(agentRunId);
  if (timer !== undefined) {
    clearTimeout(timer);
    timers.delete(agentRunId);
  }
};

export const hasArmedRunSessionLimit = (agentRunId: string): boolean =>
  timers.has(agentRunId);

/**
 * Matches the server's SESSION_LIMIT pattern (resolveAgentRunOutcomeFromWriterOutput),
 * so the run is stored as a session-limit outcome ("Timed out") with no server change.
 */
export const buildRunSessionLimitNotice = (
  limit: AgentRunSessionLimit = LOCAL_CLI_RUN_SESSION_LIMIT,
): string =>
  `You've hit your session limit on this computer: the run was stopped after ${Math.round(
    limit.limitSeconds / 60,
  )} minutes.`;

export const appendRunSessionLimitNotice = (output: string): string => {
  const notice = buildRunSessionLimitNotice();
  const trimmed = output.trim();
  return trimmed.length > 0 ? `${trimmed}\n\n${notice}` : notice;
};

const isRunning = (child: ChildProcess): boolean =>
  child.exitCode === null && child.signalCode === null;

/**
 * Stop a CLI and everything it started. Pipe children are spawned detached
 * (own process group) on POSIX, so the negative pid reaches the whole tree.
 * SIGTERM first, SIGKILL after a short grace if it is still alive.
 */
export const killChildProcessTree = (
  child: ChildProcess,
  graceMs: number = LOCAL_CLI_KILL_GRACE_MS,
): void => {
  const signalTree = (signal: NodeJS.Signals): void => {
    const pid = child.pid;
    if (typeof pid === "number" && process.platform !== "win32") {
      try {
        process.kill(-pid, signal);
        return;
      } catch {
        // Not a group leader (or already gone): fall back to the child itself.
      }
    }
    try {
      child.kill(signal);
    } catch {
      // Already exited.
    }
  };

  signalTree("SIGTERM");
  const escalate = setTimeout(() => {
    if (isRunning(child)) {
      signalTree("SIGKILL");
    }
  }, graceMs);
  escalate.unref?.();
};

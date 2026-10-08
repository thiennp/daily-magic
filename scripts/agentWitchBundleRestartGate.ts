import fs from "node:fs";
import path from "node:path";

import { listPendingRunInputSessions } from "./agentWitchPendingRunSessions";
import { listAgentWitchLiveWriterWorkIds } from "./agentWitchWriterWorkGuard";
import type { AgentWitchLocalLayout } from "./resolveAgentWitchLocalLayout";

/** A bundle update never waits longer than this for running tasks. */
export const AGENT_WITCH_BUNDLE_RESTART_MAX_WAIT_MS = 6 * 60 * 60 * 1000;

/** Re-check interval while a bundle restart is deferred. */
export const AGENT_WITCH_BUNDLE_RESTART_RECHECK_MS = 30_000;

/** Pure decision: restart once idle, or once the bounded wait has elapsed. */
export const shouldRestartForBundleUpdateNow = (input: {
  readonly busyTaskCount: number;
  readonly waitedMs: number;
  readonly maxWaitMs?: number;
}): boolean =>
  input.busyTaskCount <= 0 ||
  input.waitedMs >= (input.maxWaitMs ?? AGENT_WITCH_BUNDLE_RESTART_MAX_WAIT_MS);

const listProfileEmails = (installDir: string): readonly (string | null)[] => {
  const profilesDir = path.join(installDir, "profiles");
  try {
    const names = fs
      .readdirSync(profilesDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);
    return [null, ...names];
  } catch {
    return [null];
  }
};

/**
 * Running writer tasks across every profile of this install (the restart
 * kills all account hosts). b53ecc47 (Testi recheck @300): a run parked on a
 * human answer no longer holds the update. Its question lives in
 * pending-run-inputs.json, is replayed on the next connect, and an answer
 * after the restart continues it; unanswered it closes at the 24 h expiry.
 */
export const countAgentWitchBusyTasks = (installDir: string): number =>
  listProfileEmails(installDir).reduce((total, profileEmail) => {
    const layout = { installDir, profileEmail } as AgentWitchLocalLayout;
    const parkedRunIds = new Set(
      listPendingRunInputSessions(layout).map((session) => session.agentRunId),
    );
    return (
      total +
      listAgentWitchLiveWriterWorkIds(layout).filter(
        (id) => !parkedRunIds.has(id),
      ).length
    );
  }, 0);

let blockedSinceMs: number | null = null;
let lastLoggedKey: string | null = null;

/**
 * True while a bundle restart must keep waiting. Logs once per
 * (version, task count) so repeated server pushes do not spam.
 */
export const isAgentWitchBundleRestartBlocked = (input: {
  readonly installDir: string;
  readonly bundleVersion: string;
  readonly nowMs?: number;
}): boolean => {
  const nowMs = input.nowMs ?? Date.now();
  const busyTaskCount = countAgentWitchBusyTasks(input.installDir);
  if (busyTaskCount === 0) {
    blockedSinceMs = null;
    lastLoggedKey = null;
    return false;
  }
  blockedSinceMs ??= nowMs;
  if (
    shouldRestartForBundleUpdateNow({
      busyTaskCount,
      waitedMs: nowMs - blockedSinceMs,
    })
  ) {
    return false;
  }
  const key = `${input.bundleVersion}:${busyTaskCount}`;
  if (key !== lastLoggedKey) {
    lastLoggedKey = key;
    console.log(
      `[agent-witch] Update to bundle ${input.bundleVersion} is ready; waiting for ${busyTaskCount} running task(s) to finish.`,
    );
  }
  return true;
};

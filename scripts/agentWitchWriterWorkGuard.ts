import fs from "node:fs";
import path from "node:path";

import { isProcessAlive } from "./isProcessAlive";
import type { AgentWitchLocalLayout } from "./resolveAgentWitchLocalLayout";

export const AGENT_WITCH_WRITER_WORK_STATE_FILE_NAME =
  "active-writer-work.json";

/**
 * Ceiling after which a non-zero counter is treated as leaked, even when the
 * recorded owner pid still looks alive (pid reuse, or a begin without end).
 *
 * Writer CLI runs have no hard timeout in AWL (they heartbeat every 15s), and
 * the longest bounded writer path is the 10-minute prompt-SDLC optimize run
 * (`PROMPT_SDLC_WRITER_OPTIMIZE_MODULE_RUN_TIMEOUT_MS`). 24h is two orders of
 * magnitude above that, and matches the 24h TTL AWC already applies to queued
 * Mac dispatches (`DEFAULT_OUTBOX_TTL_MS`). The primary signal is the
 * owner-pid liveness check below; this ceiling mainly heals legacy files that
 * predate `ownerPid` (e.g. a counter stuck at 2 since a killed AWL).
 */
export const AGENT_WITCH_WRITER_WORK_STALE_MS = 24 * 60 * 60 * 1000;

export interface AgentWitchWriterWorkState {
  readonly activeCount: number;
  readonly updatedAt: string;
  /** Pid of the AWL process that last changed the counter (absent in legacy files). */
  readonly ownerPid?: number;
}

type WriterWorkIdleListener = () => void;

const idleListeners = new Set<WriterWorkIdleListener>();

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export const resolveAgentWitchWriterWorkStatePath = (
  layout: AgentWitchLocalLayout,
): string => {
  if (layout.profileEmail === null) {
    return path.join(
      layout.installDir,
      AGENT_WITCH_WRITER_WORK_STATE_FILE_NAME,
    );
  }

  return path.join(
    layout.installDir,
    "profiles",
    layout.profileEmail,
    AGENT_WITCH_WRITER_WORK_STATE_FILE_NAME,
  );
};

export const readAgentWitchWriterWorkState = (
  layout: AgentWitchLocalLayout,
): AgentWitchWriterWorkState => {
  const statePath = resolveAgentWitchWriterWorkStatePath(layout);
  if (!fs.existsSync(statePath)) {
    return { activeCount: 0, updatedAt: new Date(0).toISOString() };
  }

  try {
    const parsed: unknown = JSON.parse(fs.readFileSync(statePath, "utf8"));
    if (
      !isRecord(parsed) ||
      typeof parsed.activeCount !== "number" ||
      typeof parsed.updatedAt !== "string"
    ) {
      return { activeCount: 0, updatedAt: new Date(0).toISOString() };
    }

    const activeCount = Math.max(0, Math.floor(parsed.activeCount));
    const ownerPid =
      typeof parsed.ownerPid === "number" && Number.isInteger(parsed.ownerPid)
        ? parsed.ownerPid
        : undefined;
    return {
      activeCount,
      updatedAt: parsed.updatedAt,
      ...(ownerPid !== undefined ? { ownerPid } : {}),
    };
  } catch {
    return { activeCount: 0, updatedAt: new Date(0).toISOString() };
  }
};

const writeAgentWitchWriterWorkState = (
  layout: AgentWitchLocalLayout,
  state: AgentWitchWriterWorkState,
): void => {
  const statePath = resolveAgentWitchWriterWorkStatePath(layout);
  fs.mkdirSync(path.dirname(statePath), { recursive: true });
  fs.writeFileSync(statePath, `${JSON.stringify(state, null, 2)}\n`, "utf8");
};

export interface AgentWitchWriterWorkStalenessInput {
  readonly nowMs?: number;
  readonly isPidAlive?: (pid: number) => boolean;
}

/**
 * A non-zero counter is stale when its owner process is gone (writers run
 * in-process, so they died with it) or when it has not changed for
 * `AGENT_WITCH_WRITER_WORK_STALE_MS`. Without this, a counter leaked by a
 * killed AWL defers install updates and Live health checks forever.
 */
export const isAgentWitchWriterWorkStateStale = (
  state: AgentWitchWriterWorkState,
  input: AgentWitchWriterWorkStalenessInput = {},
): boolean => {
  if (state.activeCount <= 0) {
    return false;
  }

  const isPidAlive = input.isPidAlive ?? isProcessAlive;
  if (state.ownerPid !== undefined && !isPidAlive(state.ownerPid)) {
    return true;
  }

  const updatedAtMs = Date.parse(state.updatedAt);
  if (Number.isNaN(updatedAtMs)) {
    return true;
  }

  const nowMs = input.nowMs ?? Date.now();
  return nowMs - updatedAtMs > AGENT_WITCH_WRITER_WORK_STALE_MS;
};

/** Reads the counter and self-heals (resets to 0 on disk) when it is stale. */
const readLiveAgentWitchWriterWorkState = (
  layout: AgentWitchLocalLayout,
): AgentWitchWriterWorkState => {
  const state = readAgentWitchWriterWorkState(layout);
  if (!isAgentWitchWriterWorkStateStale(state)) {
    return state;
  }

  const reset: AgentWitchWriterWorkState = {
    activeCount: 0,
    updatedAt: new Date().toISOString(),
  };
  try {
    writeAgentWitchWriterWorkState(layout, reset);
  } catch {
    // Read-only callers still get the healed view.
  }
  return reset;
};

export const isAgentWitchWriterWorkInProgress = (
  layout: AgentWitchLocalLayout,
): boolean => readLiveAgentWitchWriterWorkState(layout).activeCount > 0;

export const beginAgentWitchWriterWork = (
  layout: AgentWitchLocalLayout,
): void => {
  const current = readLiveAgentWitchWriterWorkState(layout);
  writeAgentWitchWriterWorkState(layout, {
    activeCount: current.activeCount + 1,
    updatedAt: new Date().toISOString(),
    ownerPid: process.pid,
  });
};

export const endAgentWitchWriterWork = (
  layout: AgentWitchLocalLayout,
): void => {
  const current = readLiveAgentWitchWriterWorkState(layout);
  const nextCount = Math.max(0, current.activeCount - 1);
  writeAgentWitchWriterWorkState(layout, {
    activeCount: nextCount,
    updatedAt: new Date().toISOString(),
    ownerPid: process.pid,
  });

  if (nextCount === 0) {
    for (const listener of idleListeners) {
      listener();
    }
  }
};

export const subscribeAgentWitchWriterWorkIdle = (
  listener: WriterWorkIdleListener,
): (() => void) => {
  idleListeners.add(listener);
  return () => {
    idleListeners.delete(listener);
  };
};

export interface DeferredAgentWitchInstallBundleUpdate {
  readonly layout: AgentWitchLocalLayout;
  readonly remoteBundleVersion: string;
  readonly trigger: "system.ack" | "install.bundle.update";
}

let pendingInstallBundleUpdate: DeferredAgentWitchInstallBundleUpdate | null =
  null;
let pendingLocalRestartReason: string | null = null;

export const deferAgentWitchInstallBundleUpdate = (
  input: DeferredAgentWitchInstallBundleUpdate,
): void => {
  pendingInstallBundleUpdate = input;
};

export const deferAgentWitchLocalRestart = (reason: string): void => {
  pendingLocalRestartReason = reason;
};

export const takeDeferredAgentWitchInstallBundleUpdate =
  (): DeferredAgentWitchInstallBundleUpdate | null => {
    const pending = pendingInstallBundleUpdate;
    pendingInstallBundleUpdate = null;
    return pending;
  };

export const takeDeferredAgentWitchLocalRestartReason = (): string | null => {
  const pending = pendingLocalRestartReason;
  pendingLocalRestartReason = null;
  return pending;
};

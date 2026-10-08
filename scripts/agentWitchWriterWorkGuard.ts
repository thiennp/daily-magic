import fs from "node:fs";
import crypto from "node:crypto";
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

export interface AgentWitchWriterWorkEntry {
  readonly id: string;
  readonly ownerPid: number;
  readonly startedAt: string;
  readonly childPid?: number;
  readonly inProcess?: boolean;
}

export interface AgentWitchWriterWorkState {
  readonly activeCount: number;
  readonly updatedAt: string;
  /** Pid of the AWL process that last changed the counter (absent in legacy files). */
  readonly ownerPid?: number;
  readonly entries?: readonly AgentWitchWriterWorkEntry[];
}

export const AGENT_WITCH_WRITER_PRE_SPAWN_GRACE_MS = 2 * 60 * 1000;

type WriterWorkIdleListener = () => void;

const idleListeners = new Set<WriterWorkIdleListener>();

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isWriterWorkEntry = (
  value: unknown,
): value is AgentWitchWriterWorkEntry =>
  isRecord(value) &&
  typeof value.id === "string" &&
  typeof value.ownerPid === "number" &&
  typeof value.startedAt === "string" &&
  (value.childPid === undefined || typeof value.childPid === "number") &&
  (value.inProcess === undefined || typeof value.inProcess === "boolean");

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
      ...(Array.isArray(parsed.entries)
        ? { entries: parsed.entries.filter(isWriterWorkEntry) }
        : {}),
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
 * An entry is live only while its AWL owner process lives AND either a
 * registered writer child / PTY pid is still alive, or (no pid yet) it is
 * inside the short pre-spawn window. In-process writer API calls have no
 * child pid and stay live until ended. A parked run (waiting for a human
 * answer) has no entry, so it never blocks bundle updates.
 */
const isEntryLive = (
  entry: AgentWitchWriterWorkEntry,
  input: AgentWitchWriterWorkStalenessInput,
): boolean => {
  const isPidAlive = input.isPidAlive ?? isProcessAlive;
  const nowMs = input.nowMs ?? Date.now();

  const startedAtMs = Date.parse(entry.startedAt);
  if (
    Number.isNaN(startedAtMs) ||
    nowMs - startedAtMs > AGENT_WITCH_WRITER_WORK_STALE_MS
  ) {
    return false;
  }

  if (!isPidAlive(entry.ownerPid)) {
    return false;
  }

  if (entry.inProcess) {
    return true;
  }

  if (entry.childPid !== undefined) {
    return isPidAlive(entry.childPid);
  }

  return nowMs - startedAtMs <= AGENT_WITCH_WRITER_PRE_SPAWN_GRACE_MS;
};

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

  if (!state.entries) {
    // Legacy file healing: activeCount > 0 but no entries means it is legacy.
    return true;
  }

  const liveCount = state.entries.filter((e) => isEntryLive(e, input)).length;
  return liveCount !== state.activeCount || liveCount !== state.entries.length;
};

/** Reads the counter and self-heals (resets to 0 on disk) when it is stale. */
const readLiveAgentWitchWriterWorkState = (
  layout: AgentWitchLocalLayout,
  input: AgentWitchWriterWorkStalenessInput = {},
): AgentWitchWriterWorkState => {
  const state = readAgentWitchWriterWorkState(layout);
  if (!isAgentWitchWriterWorkStateStale(state, input)) {
    return state;
  }

  const liveEntries = (state.entries || []).filter((e) =>
    isEntryLive(e, input),
  );

  const reset: AgentWitchWriterWorkState = {
    activeCount: liveEntries.length,
    updatedAt: new Date().toISOString(),
    ownerPid: process.pid,
    entries: liveEntries,
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

/** Ids (run ids) of the writer work that is live right now. */
export const listAgentWitchLiveWriterWorkIds = (
  layout: AgentWitchLocalLayout,
): readonly string[] =>
  (readLiveAgentWitchWriterWorkState(layout).entries ?? []).map(
    (entry) => entry.id,
  );

export const countAgentWitchLiveWriterWork = (
  layout: AgentWitchLocalLayout,
): number => readLiveAgentWitchWriterWorkState(layout).activeCount;

export const beginAgentWitchWriterWork = (
  layout: AgentWitchLocalLayout,
  workId?: string,
  inProcess?: boolean,
): string => {
  const current = readLiveAgentWitchWriterWorkState(layout);
  const id = workId ?? crypto.randomUUID();
  const newEntry: AgentWitchWriterWorkEntry = {
    id,
    ownerPid: process.pid,
    startedAt: new Date().toISOString(),
    ...(inProcess ? { inProcess: true } : {}),
  };
  // A continuation re-begins the same run id: replace, never duplicate.
  const entries = [
    ...(current.entries ?? []).filter((entry) => entry.id !== id),
    newEntry,
  ];
  writeAgentWitchWriterWorkState(layout, {
    activeCount: entries.length,
    updatedAt: new Date().toISOString(),
    ownerPid: process.pid,
    entries,
  });
  return id;
};

export const registerAgentWitchWriterWorkPid = (
  layout: AgentWitchLocalLayout,
  workId: string,
  pid: number,
): void => {
  const current = readLiveAgentWitchWriterWorkState(layout);
  if (!current.entries) {
    return;
  }
  const index = current.entries.findIndex((e) => e.id === workId);
  if (index === -1) {
    return;
  }
  const nextEntries = [...current.entries];
  nextEntries[index] = { ...nextEntries[index], childPid: pid };
  writeAgentWitchWriterWorkState(layout, {
    activeCount: nextEntries.length,
    updatedAt: new Date().toISOString(),
    ownerPid: process.pid,
    entries: nextEntries,
  });
};

export const endAgentWitchWriterWork = (
  layout: AgentWitchLocalLayout,
  workId?: string,
): void => {
  const current = readLiveAgentWitchWriterWorkState(layout);
  const nextEntries = [...(current.entries || [])];

  if (workId !== undefined) {
    const index = nextEntries.findIndex((e) => e.id === workId);
    if (index === -1) {
      return;
    }
    nextEntries.splice(index, 1);
  } else {
    for (let i = nextEntries.length - 1; i >= 0; i--) {
      if (nextEntries[i].ownerPid === process.pid) {
        nextEntries.splice(i, 1);
        break;
      }
    }
  }

  writeAgentWitchWriterWorkState(layout, {
    activeCount: nextEntries.length,
    updatedAt: new Date().toISOString(),
    ownerPid: process.pid,
    entries: nextEntries,
  });

  if (nextEntries.length === 0) {
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

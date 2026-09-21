import fs from "node:fs";
import path from "node:path";

import type { AgentWitchLocalLayout } from "./resolveAgentWitchLocalLayout";

export const AGENT_WITCH_WRITER_WORK_STATE_FILE_NAME =
  "active-writer-work.json";

export interface AgentWitchWriterWorkState {
  readonly activeCount: number;
  readonly updatedAt: string;
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
    return { activeCount, updatedAt: parsed.updatedAt };
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

export const isAgentWitchWriterWorkInProgress = (
  layout: AgentWitchLocalLayout,
): boolean => readAgentWitchWriterWorkState(layout).activeCount > 0;

export const beginAgentWitchWriterWork = (
  layout: AgentWitchLocalLayout,
): void => {
  const current = readAgentWitchWriterWorkState(layout);
  writeAgentWitchWriterWorkState(layout, {
    activeCount: current.activeCount + 1,
    updatedAt: new Date().toISOString(),
  });
};

export const endAgentWitchWriterWork = (
  layout: AgentWitchLocalLayout,
): void => {
  const current = readAgentWitchWriterWorkState(layout);
  const nextCount = Math.max(0, current.activeCount - 1);
  writeAgentWitchWriterWorkState(layout, {
    activeCount: nextCount,
    updatedAt: new Date().toISOString(),
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

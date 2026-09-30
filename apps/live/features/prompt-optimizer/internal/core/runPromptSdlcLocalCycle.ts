import { isPromptSdlcTerminalStatus } from "../../../../adapters/promptSdlcAwcCore";
import {
  probeLocalRunClis,
  resolveWriterCliCommands,
} from "../../../../adapters/writerDispatch";
import { advancePromptSdlcWizardLocal } from "./advancePromptSdlcWizardLocal";
import { isPromptSdlcLocalManualWait } from "./isPromptSdlcLocalManualWait";
import {
  closePromptSdlcLocalCycleAbort,
  openPromptSdlcLocalCycleAbort,
} from "./stopPromptSdlcLocalCycle";
import { forgetPromptSdlcWriterReady } from "./promptSdlcWriterReadyStore";
import { preparePromptSdlcLocalCycleForRun } from "./preparePromptSdlcLocalCycleForRun";
import {
  readPromptSdlcLocalCycle,
  savePromptSdlcLocalCycle,
} from "./promptSdlcLocalStore";

const runningCycleIds = new Set<string>();
const installedWritersCache = {
  atMs: 0,
  ids: [] as readonly string[],
};

export const readPromptSdlcInstalledWriters = async (): Promise<
  readonly string[]
> => {
  if (Date.now() - installedWritersCache.atMs < 30_000) {
    return installedWritersCache.ids;
  }

  const probe = await probeLocalRunClis({
    commands: resolveWriterCliCommands({}),
  });
  installedWritersCache.atMs = Date.now();
  installedWritersCache.ids = probe.installedWriterIds;
  return probe.installedWriterIds;
};

const runUntilTerminal = async (
  storePath: string,
  cycleId: string,
  signal: AbortSignal,
): Promise<void> => {
  const stored = readPromptSdlcLocalCycle(storePath, cycleId);
  if (stored === null || signal.aborted) {
    return;
  }
  const cycle = preparePromptSdlcLocalCycleForRun(storePath, stored);
  if (
    isPromptSdlcTerminalStatus(cycle.status) ||
    cycle.status === "wizard_paused" ||
    isPromptSdlcLocalManualWait(cycle)
  ) {
    return;
  }

  const next = await advancePromptSdlcWizardLocal(
    cycle,
    (writer) => {
      forgetPromptSdlcWriterReady(storePath, writer);
    },
    signal,
    (progress) => {
      const current = readPromptSdlcLocalCycle(storePath, cycleId);
      if (current?.status === "stopped" || signal.aborted) {
        return;
      }
      savePromptSdlcLocalCycle(storePath, progress);
    },
  );
  const latest = readPromptSdlcLocalCycle(storePath, cycleId);
  if (latest?.status === "stopped" || signal.aborted) {
    return;
  }
  savePromptSdlcLocalCycle(storePath, next);
  if (!isPromptSdlcTerminalStatus(next.status)) {
    await runUntilTerminal(storePath, cycleId, signal);
  }
};

export const ensurePromptSdlcLocalCycleRunning = (
  storePath: string,
  cycleId: string,
): void => {
  if (runningCycleIds.has(cycleId)) {
    return;
  }

  const stored = readPromptSdlcLocalCycle(storePath, cycleId);
  if (stored === null) {
    return;
  }
  const cycle = preparePromptSdlcLocalCycleForRun(storePath, stored);
  if (
    isPromptSdlcTerminalStatus(cycle.status) ||
    cycle.status === "wizard_paused" ||
    isPromptSdlcLocalManualWait(cycle)
  ) {
    return;
  }

  runningCycleIds.add(cycleId);
  const signal = openPromptSdlcLocalCycleAbort(cycleId);
  void runUntilTerminal(storePath, cycleId, signal).finally(() => {
    runningCycleIds.delete(cycleId);
    closePromptSdlcLocalCycleAbort(cycleId);
  });
};

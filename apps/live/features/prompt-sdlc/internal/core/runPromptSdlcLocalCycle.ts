import { isPromptSdlcTerminalStatus } from "../../../../adapters/promptSdlcAwcCore";
import {
  probeLocalRunClis,
  resolveWriterCliCommands,
} from "../../../../adapters/writerDispatch";
import { advancePromptSdlcLocalCycle } from "./advancePromptSdlcLocalCycle";
import { isPromptSdlcLocalManualWait } from "./isPromptSdlcLocalManualWait";
import { forgetPromptSdlcWriterReady } from "./promptSdlcWriterReadyStore";
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
): Promise<void> => {
  const cycle = readPromptSdlcLocalCycle(storePath, cycleId);
  if (
    cycle === null ||
    isPromptSdlcTerminalStatus(cycle.status) ||
    isPromptSdlcLocalManualWait(cycle)
  ) {
    return;
  }

  const next = await advancePromptSdlcLocalCycle(cycle, (writer) => {
    forgetPromptSdlcWriterReady(storePath, writer);
  });
  savePromptSdlcLocalCycle(storePath, next);
  if (!isPromptSdlcTerminalStatus(next.status)) {
    await runUntilTerminal(storePath, cycleId);
  }
};

export const ensurePromptSdlcLocalCycleRunning = (
  storePath: string,
  cycleId: string,
): void => {
  if (runningCycleIds.has(cycleId)) {
    return;
  }

  const cycle = readPromptSdlcLocalCycle(storePath, cycleId);
  if (
    cycle === null ||
    isPromptSdlcTerminalStatus(cycle.status) ||
    isPromptSdlcLocalManualWait(cycle)
  ) {
    return;
  }

  runningCycleIds.add(cycleId);
  void runUntilTerminal(storePath, cycleId).finally(() => {
    runningCycleIds.delete(cycleId);
  });
};

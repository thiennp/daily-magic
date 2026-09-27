import { isPromptSdlcTerminalStatus } from "@/lib/promptSdlc/PromptSdlcCycleStatus.constant";
import { probeLocalRunClis } from "../../../../../../scripts/dispatch/probeLocalRunClis";
import { resolveWriterCliCommands } from "../../../../../../scripts/buildWriterCliInvocation";
import { advancePromptSdlcLocalCycle } from "./advancePromptSdlcLocalCycle";
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
  if (cycle === null || isPromptSdlcTerminalStatus(cycle.status)) {
    return;
  }

  const next = await advancePromptSdlcLocalCycle(cycle);
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
  if (cycle === null || isPromptSdlcTerminalStatus(cycle.status)) {
    return;
  }

  runningCycleIds.add(cycleId);
  void runUntilTerminal(storePath, cycleId).finally(() => {
    runningCycleIds.delete(cycleId);
  });
};

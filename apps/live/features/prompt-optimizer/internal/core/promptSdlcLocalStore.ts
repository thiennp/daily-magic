import fs from "node:fs";
import path from "node:path";

import { normalizePromptSdlcWizardState } from "../../../../adapters/promptSdlcAwcCore";

import { appendPromptSdlcWizardEventLog } from "./appendPromptSdlcWizardEventLog";
import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";

const normalizePromptSdlcLocalCycle = (
  cycle: PromptSdlcLocalCycle,
): PromptSdlcLocalCycle =>
  cycle.wizard === undefined
    ? cycle
    : {
        ...cycle,
        wizard: normalizePromptSdlcWizardState(cycle.wizard),
      };

const droppedCycleIds = new Set<string>();

const isCycle = (value: unknown): value is PromptSdlcLocalCycle =>
  typeof value === "object" &&
  value !== null &&
  "id" in value &&
  typeof value.id === "string" &&
  "revisions" in value &&
  Array.isArray(value.revisions);

const writeCyclesFile = (
  storePath: string,
  cycles: readonly PromptSdlcLocalCycle[],
): void => {
  fs.mkdirSync(path.dirname(storePath), { recursive: true });
  const tmpPath = `${storePath}.tmp`;
  fs.writeFileSync(tmpPath, `${JSON.stringify(cycles, null, 2)}\n`);
  fs.renameSync(tmpPath, storePath);
};

export const readPromptSdlcLocalCycles = (
  storePath: string,
): readonly PromptSdlcLocalCycle[] => {
  if (!fs.existsSync(storePath)) {
    return [];
  }

  try {
    const parsed: unknown = JSON.parse(fs.readFileSync(storePath, "utf8"));
    return Array.isArray(parsed)
      ? parsed.filter(isCycle).map(normalizePromptSdlcLocalCycle)
      : [];
  } catch {
    return [];
  }
};

export const readPromptSdlcLocalCycle = (
  storePath: string,
  cycleId: string,
): PromptSdlcLocalCycle | null =>
  readPromptSdlcLocalCycles(storePath).find((cycle) => cycle.id === cycleId) ??
  null;

export const deletePromptSdlcLocalCycle = (
  storePath: string,
  cycleId: string,
): void => {
  droppedCycleIds.add(cycleId);
  const next = readPromptSdlcLocalCycles(storePath).filter(
    (cycle) => cycle.id !== cycleId,
  );
  writeCyclesFile(storePath, next);
};

export const savePromptSdlcLocalCycle = (
  storePath: string,
  cycle: PromptSdlcLocalCycle,
): void => {
  if (droppedCycleIds.has(cycle.id)) {
    return;
  }

  const cycles = readPromptSdlcLocalCycles(storePath);
  const next = cycles.some((item) => item.id === cycle.id)
    ? cycles.map((item) => (item.id === cycle.id ? cycle : item))
    : [cycle, ...cycles];
  writeCyclesFile(storePath, next);
  appendPromptSdlcWizardEventLog(storePath, {
    cycleId: cycle.id,
    kind: "cycle_saved",
    phase: cycle.wizard?.phase,
    detail: cycle.status,
  });
};

import fs from "node:fs";
import path from "node:path";

import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";

const droppedCycleIds = new Set<string>();

const isCycle = (value: unknown): value is PromptSdlcLocalCycle =>
  typeof value === "object" &&
  value !== null &&
  "id" in value &&
  typeof value.id === "string" &&
  "revisions" in value &&
  Array.isArray(value.revisions);

export const readPromptSdlcLocalCycles = (
  storePath: string,
): readonly PromptSdlcLocalCycle[] => {
  if (!fs.existsSync(storePath)) {
    return [];
  }

  try {
    const parsed: unknown = JSON.parse(fs.readFileSync(storePath, "utf8"));
    return Array.isArray(parsed) ? parsed.filter(isCycle) : [];
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
  fs.mkdirSync(path.dirname(storePath), { recursive: true });
  fs.writeFileSync(storePath, `${JSON.stringify(next, null, 2)}\n`);
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
  fs.mkdirSync(path.dirname(storePath), { recursive: true });
  fs.writeFileSync(storePath, `${JSON.stringify(next, null, 2)}\n`);
};

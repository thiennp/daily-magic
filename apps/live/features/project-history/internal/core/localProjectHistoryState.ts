import fs from "node:fs";
import path from "node:path";

import { atomicWriteFile0600 } from "./atomicWriteFile0600";
import {
  PROJECT_HISTORY_DIR_NAME,
  PROJECT_HISTORY_STATE_FILE_NAME,
} from "./projectHistoryPaths.constant";
import {
  ensureProjectDataTree,
  isValidProjectComputerHistoryProjectId,
  resolveProjectDataDir,
} from "./resolveProjectDataDir";
import { resolveAgentWitchLocalLayout } from "@agent-witch/install-layout";

export type LocalProjectHistoryState = "on_ready" | "degraded" | "on_configuring" | "off";

export type LocalProjectHistoryStateRecord = {
  readonly state: LocalProjectHistoryState;
  readonly updatedAt: string;
};

const statePathFor = (projectId: string): string =>
  path.join(
    resolveProjectDataDir(projectId),
    PROJECT_HISTORY_DIR_NAME,
    PROJECT_HISTORY_STATE_FILE_NAME,
  );

export const readLocalProjectHistoryState = (
  projectId: string,
): LocalProjectHistoryStateRecord | null => {
  try {
    const statePath = statePathFor(projectId);
    if (!fs.existsSync(statePath)) {
      return null;
    }
    const parsed: unknown = JSON.parse(fs.readFileSync(statePath, "utf8"));
    if (
      typeof parsed !== "object" ||
      parsed === null ||
      typeof (parsed as { state?: unknown }).state !== "string" ||
      typeof (parsed as { updatedAt?: unknown }).updatedAt !== "string"
    ) {
      return null;
    }
    const state = (parsed as { state: string }).state;
    if (
      state !== "on_ready" &&
      state !== "degraded" &&
      state !== "on_configuring" &&
      state !== "off"
    ) {
      return null;
    }
    return {
      state,
      updatedAt: (parsed as { updatedAt: string }).updatedAt,
    };
  } catch {
    return null;
  }
};

export const writeLocalProjectHistoryState = (input: {
  readonly projectId: string;
  readonly state: LocalProjectHistoryState;
}): LocalProjectHistoryStateRecord => {
  ensureProjectDataTree(input.projectId);
  const record: LocalProjectHistoryStateRecord = {
    state: input.state,
    updatedAt: new Date().toISOString(),
  };
  atomicWriteFile0600(statePathFor(input.projectId), `${JSON.stringify(record)}\n`);
  return record;
};

/** Projects under project-data whose local history state is on_ready or degraded. */
export const listLocalHistoryActiveProjectIds = (): readonly string[] => {
  const layout = resolveAgentWitchLocalLayout();
  const root = layout.projectDataDir;
  if (!fs.existsSync(root)) {
    return [];
  }
  const ids: string[] = [];
  for (const name of fs.readdirSync(root)) {
    if (!isValidProjectComputerHistoryProjectId(name)) {
      continue;
    }
    const state = readLocalProjectHistoryState(name);
    if (state === null) {
      continue;
    }
    if (state.state === "on_ready" || state.state === "degraded") {
      ids.push(name);
    }
  }
  return ids;
};

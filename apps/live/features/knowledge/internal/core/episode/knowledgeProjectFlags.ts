import fs from "node:fs";
import path from "node:path";

import {
  buildDefaultProjectFlags,
  parseProjectFlags,
  type ProjectFeatureFlags,
} from "@agent-witch/shared/projects";

import { AGENT_WITCH_PROJECT_META_DIR_NAME } from "../../../../projects/internal/core/agentWitchProjectStorage.constants";

const FLAGS_FILE_NAME = "token-saver.json";

export type KnowledgeFlagKey = "knowledge" | "knowledgeShare";

const resolveFlagsPath = (projectFolderPath: string): string =>
  path.join(
    projectFolderPath,
    AGENT_WITCH_PROJECT_META_DIR_NAME,
    FLAGS_FILE_NAME,
  );

/** Project flags from `<project>/.agent-witch/token-saver.json`; defaults when absent. */
export const readKnowledgeProjectFlags = (
  projectFolderPath: string,
): ProjectFeatureFlags => {
  try {
    const parsed = parseProjectFlags(
      JSON.parse(fs.readFileSync(resolveFlagsPath(projectFolderPath), "utf8")),
    );
    return parsed ?? buildDefaultProjectFlags();
  } catch {
    return buildDefaultProjectFlags();
  }
};

export const isKnowledgeOnForFolder = (projectFolderPath: string): boolean =>
  readKnowledgeProjectFlags(projectFolderPath).knowledge !== "off";

export const isKnowledgeShareOnForFolder = (
  projectFolderPath: string,
): boolean =>
  readKnowledgeProjectFlags(projectFolderPath).knowledgeShare === "on";

/** Persist one knowledge flag without touching the other project flags. */
export const writeKnowledgeProjectFlag = (input: {
  readonly projectFolderPath: string;
  readonly key: KnowledgeFlagKey;
  readonly on: boolean;
}): void => {
  const filePath = resolveFlagsPath(input.projectFolderPath);
  const next = {
    ...readKnowledgeProjectFlags(input.projectFolderPath),
    [input.key]: input.on ? "on" : "off",
  };
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const tempPath = `${filePath}.${process.pid}.tmp`;
  fs.writeFileSync(tempPath, `${JSON.stringify(next, null, 2)}\n`, "utf8");
  fs.renameSync(tempPath, filePath);
};

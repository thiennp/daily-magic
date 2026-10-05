import fs from "node:fs";
import path from "node:path";

import { computeProjectSkillContentHash } from "@agent-witch/shared/projectSkills";
import {
  PROJECT_HISTORY_SKILL_META_FILE_NAME,
  PROJECT_HISTORY_SKILL_VERSION_PAD,
  PROJECT_HISTORY_SKILLS_DIR_NAME,
} from "./projectHistoryPaths.constant";
import { resolveProjectDataDir } from "./resolveProjectDataDir";

export type ReadProjectSkillVersionResult = {
  readonly body: string;
  readonly contentHash: string;
};

/** Hash mismatch (body vs meta, or recomputed) returns null. */
export const readProjectSkillVersion = (input: {
  readonly projectId: string;
  readonly skillId: string;
  readonly version: number;
}): ReadProjectSkillVersionResult | null => {
  if (
    input.skillId.length === 0 ||
    input.skillId.startsWith("_") ||
    input.skillId.includes("/") ||
    input.skillId.includes("\\")
  ) {
    return null;
  }
  let projectDataDir: string;
  try {
    projectDataDir = resolveProjectDataDir(input.projectId);
  } catch {
    return null;
  }
  const skillDir = path.join(
    projectDataDir,
    PROJECT_HISTORY_SKILLS_DIR_NAME,
    input.skillId,
  );
  const bodyPath = path.join(
    skillDir,
    `v${String(input.version).padStart(PROJECT_HISTORY_SKILL_VERSION_PAD, "0")}.md`,
  );
  const metaPath = path.join(skillDir, PROJECT_HISTORY_SKILL_META_FILE_NAME);
  if (!fs.existsSync(bodyPath) || !fs.existsSync(metaPath)) {
    return null;
  }
  try {
    const body = fs.readFileSync(bodyPath, "utf8");
    const meta = JSON.parse(fs.readFileSync(metaPath, "utf8")) as {
      contentHash?: unknown;
      version?: unknown;
    };
    const contentHash =
      typeof meta.contentHash === "string" ? meta.contentHash : null;
    if (contentHash === null || meta.version !== input.version) {
      return null;
    }
    if (computeProjectSkillContentHash(body) !== contentHash) {
      return null;
    }
    return { body, contentHash };
  } catch {
    return null;
  }
};

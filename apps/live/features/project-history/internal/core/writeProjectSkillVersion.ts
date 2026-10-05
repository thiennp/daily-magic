import fs from "node:fs";
import path from "node:path";

import { atomicWriteFile0600 } from "./atomicWriteFile0600";
import { computeProjectSkillContentHash } from "@agent-witch/shared/projectSkills";
import {
  PROJECT_HISTORY_SKILL_META_FILE_NAME,
  PROJECT_HISTORY_SKILL_VERSION_PAD,
  PROJECT_HISTORY_SKILLS_DIR_NAME,
  PROJECT_HISTORY_SKILLS_TOMBSTONES_DIR_NAME,
} from "./projectHistoryPaths.constant";
import { ensureProjectDataTree } from "./resolveProjectDataDir";

const isUsableSkillId = (skillId: string): boolean =>
  skillId.length > 0 && !skillId.startsWith("_") && !skillId.includes("/") && !skillId.includes("\\") && !skillId.includes("..");

const versionFileName = (version: number): string =>
  `v${String(version).padStart(PROJECT_HISTORY_SKILL_VERSION_PAD, "0")}.md`;

export type WriteProjectSkillVersionResult = {
  readonly path: string;
  readonly contentHash: string;
};

/**
 * Writes `skills/<skillId>/vNNNN.md` + `meta.json`.
 * No-op when the same version and hash already exist.
 * Rejects `_`-prefixed skillIds. Clears tombstone after a successful write.
 */
export const writeProjectSkillVersion = (input: {
  readonly projectId: string;
  readonly skillId: string;
  readonly version: number;
  readonly body: string;
}): WriteProjectSkillVersionResult => {
  if (!isUsableSkillId(input.skillId)) {
    throw new Error("invalid_project_skill_id");
  }
  if (!Number.isInteger(input.version) || input.version < 1) {
    throw new Error("invalid_project_skill_version");
  }
  const projectDataDir = ensureProjectDataTree(input.projectId);
  const skillDir = path.join(
    projectDataDir,
    PROJECT_HISTORY_SKILLS_DIR_NAME,
    input.skillId,
  );
  const bodyPath = path.join(skillDir, versionFileName(input.version));
  const metaPath = path.join(skillDir, PROJECT_HISTORY_SKILL_META_FILE_NAME);
  const contentHash = computeProjectSkillContentHash(input.body);

  if (fs.existsSync(bodyPath) && fs.existsSync(metaPath)) {
    try {
      const meta = JSON.parse(fs.readFileSync(metaPath, "utf8")) as {
        version?: unknown;
        contentHash?: unknown;
      };
      if (
        meta.version === input.version &&
        meta.contentHash === contentHash &&
        fs.readFileSync(bodyPath, "utf8") === input.body
      ) {
        return { path: bodyPath, contentHash };
      }
    } catch {
      // rewrite below
    }
  }

  atomicWriteFile0600(bodyPath, input.body);
  atomicWriteFile0600(
    metaPath,
    `${JSON.stringify({
      skillId: input.skillId,
      version: input.version,
      contentHash,
      updatedAt: new Date().toISOString(),
    })}\n`,
  );

  const tombstonePath = path.join(
    projectDataDir,
    PROJECT_HISTORY_SKILLS_DIR_NAME,
    PROJECT_HISTORY_SKILLS_TOMBSTONES_DIR_NAME,
    `${input.skillId}.json`,
  );
  if (fs.existsSync(tombstonePath)) {
    fs.unlinkSync(tombstonePath);
  }

  return { path: bodyPath, contentHash };
};

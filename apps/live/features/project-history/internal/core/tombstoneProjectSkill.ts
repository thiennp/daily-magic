import fs from "node:fs";
import path from "node:path";

import { atomicWriteFile0600, ensureDir0700 } from "./atomicWriteFile0600";
import {
  PROJECT_HISTORY_SKILLS_DIR_NAME,
  PROJECT_HISTORY_SKILLS_TOMBSTONES_DIR_NAME,
} from "./projectHistoryPaths.constant";
import { ensureProjectDataTree, resolveProjectDataDir } from "./resolveProjectDataDir";

export type ProjectSkillTombstoneRecord = {
  readonly skillId: string;
  readonly revokedAt: string;
  readonly lastContentHash: string;
};

export type TombstoneProjectSkillResult = { readonly removed: boolean };

const isUsableSkillId = (skillId: string): boolean =>
  skillId.length > 0 &&
  !skillId.startsWith("_") &&
  !skillId.includes("/") &&
  !skillId.includes("\\") &&
  !skillId.includes("..");

const sweepHiddenSkillSiblings = (skillsDir: string, skillId: string): void => {
  if (!fs.existsSync(skillsDir)) {
    return;
  }
  const prefix = `.${skillId}.`;
  for (const name of fs.readdirSync(skillsDir)) {
    if (!name.startsWith(prefix)) {
      continue;
    }
    const full = path.join(skillsDir, name);
    try {
      fs.rmSync(full, { recursive: true, force: true });
    } catch {
      // best effort sweep
    }
  }
};

/**
 * Deletes `skills/<skillId>/` by renaming to a hidden sibling then removing.
 * Atomically writes `skills/_tombstones/<skillId>.json`. Idempotent. Rejects `_` ids.
 */
export const tombstoneProjectSkill = (input: {
  readonly projectId: string;
  readonly skillId: string;
  readonly lastContentHash: string;
  readonly revokedAt?: string;
}): TombstoneProjectSkillResult => {
  if (!isUsableSkillId(input.skillId)) {
    throw new Error("invalid_project_skill_id");
  }
  const projectDataDir = ensureProjectDataTree(input.projectId);
  const skillsDir = path.join(projectDataDir, PROJECT_HISTORY_SKILLS_DIR_NAME);
  const skillDir = path.join(skillsDir, input.skillId);
  let removed = false;
  if (fs.existsSync(skillDir)) {
    const hidden = path.join(
      skillsDir,
      `.${input.skillId}.${process.pid}.${Date.now()}`,
    );
    try {
      fs.renameSync(skillDir, hidden);
      fs.rmSync(hidden, { recursive: true, force: true });
      removed = true;
    } catch {
      // fall through to tombstone write
    }
  }
  sweepHiddenSkillSiblings(skillsDir, input.skillId);

  const tombstonesDir = path.join(
    skillsDir,
    PROJECT_HISTORY_SKILLS_TOMBSTONES_DIR_NAME,
  );
  ensureDir0700(tombstonesDir);
  const tombstonePath = path.join(tombstonesDir, `${input.skillId}.json`);
  const record: ProjectSkillTombstoneRecord = {
    skillId: input.skillId,
    revokedAt: input.revokedAt ?? new Date().toISOString(),
    lastContentHash: input.lastContentHash,
  };
  atomicWriteFile0600(tombstonePath, `${JSON.stringify(record)}\n`);
  return { removed };
};

export const readProjectSkillTombstone = (input: {
  readonly projectId: string;
  readonly skillId: string;
}): ProjectSkillTombstoneRecord | null => {
  if (!isUsableSkillId(input.skillId)) {
    return null;
  }
  let projectDataDir: string;
  try {
    projectDataDir = resolveProjectDataDir(input.projectId);
  } catch {
    return null;
  }
  const tombstonePath = path.join(
    projectDataDir,
    PROJECT_HISTORY_SKILLS_DIR_NAME,
    PROJECT_HISTORY_SKILLS_TOMBSTONES_DIR_NAME,
    `${input.skillId}.json`,
  );
  if (!fs.existsSync(tombstonePath)) {
    return null;
  }
  try {
    const parsed: unknown = JSON.parse(fs.readFileSync(tombstonePath, "utf8"));
    if (
      typeof parsed !== "object" ||
      parsed === null ||
      typeof (parsed as { skillId?: unknown }).skillId !== "string" ||
      typeof (parsed as { revokedAt?: unknown }).revokedAt !== "string" ||
      typeof (parsed as { lastContentHash?: unknown }).lastContentHash !==
        "string"
    ) {
      return null;
    }
    const record = parsed as ProjectSkillTombstoneRecord;
    return {
      skillId: record.skillId,
      revokedAt: record.revokedAt,
      lastContentHash: record.lastContentHash,
    };
  } catch {
    return null;
  }
};

import fs from "node:fs";
import path from "node:path";

import {
  PROJECT_HISTORY_SKILL_META_FILE_NAME,
  PROJECT_HISTORY_SKILLS_DIR_NAME,
} from "./projectHistoryPaths.constant";
import { resolveProjectDataDir } from "./resolveProjectDataDir";

export type ProjectSkillLocalMirrorRef = {
  readonly skillId: string;
  readonly contentHash: string;
};

/** Local mirrors under skills/ (no `_`-prefixed dirs). */
export const listProjectSkillIds = (input: {
  readonly projectId: string;
}): readonly ProjectSkillLocalMirrorRef[] => {
  let projectDataDir: string;
  try {
    projectDataDir = resolveProjectDataDir(input.projectId);
  } catch {
    return [];
  }
  const skillsDir = path.join(projectDataDir, PROJECT_HISTORY_SKILLS_DIR_NAME);
  if (!fs.existsSync(skillsDir)) {
    return [];
  }
  const refs: ProjectSkillLocalMirrorRef[] = [];
  for (const name of fs.readdirSync(skillsDir)) {
    if (name.startsWith("_") || name.startsWith(".")) {
      continue;
    }
    const metaPath = path.join(
      skillsDir,
      name,
      PROJECT_HISTORY_SKILL_META_FILE_NAME,
    );
    if (!fs.existsSync(metaPath)) {
      continue;
    }
    try {
      const meta = JSON.parse(fs.readFileSync(metaPath, "utf8")) as {
        contentHash?: unknown;
      };
      if (typeof meta.contentHash !== "string") {
        continue;
      }
      refs.push({ skillId: name, contentHash: meta.contentHash });
    } catch {
      continue;
    }
  }
  return refs;
};

import fs from "node:fs";
import path from "node:path";

import { gitBlobSha } from "./collectDocSources";
import { DOC_SKILL_ORIGIN } from "./docIngest.constants";
import { splitDocFrontMatter } from "./docSkillText";
import { PROJECT_HISTORY_SKILLS_DIR_NAME } from "./projectHistoryPaths.constant";
import { resolveProjectDataDir } from "./resolveProjectDataDir";

export type DocOriginSkill = {
  readonly skillId: string;
  readonly relPath: string;
  readonly sha: string;
};

const VERSION_FILE = /^v\d+\.md$/;

const latestBody = (dir: string): string | null => {
  const latest = fs
    .readdirSync(dir)
    .filter((name) => VERSION_FILE.test(name))
    .sort()
    .pop();
  return latest === undefined
    ? null
    : fs.readFileSync(path.join(dir, latest), "utf8");
};

/** Mirrored skills whose latest version was made from a folder doc (`origin: folder-doc`). */
export const listDocOriginSkills = (
  projectId: string,
): readonly DocOriginSkill[] => {
  const root = path.join(
    resolveProjectDataDir(projectId),
    PROJECT_HISTORY_SKILLS_DIR_NAME,
  );
  try {
    return fs
      .readdirSync(root, { withFileTypes: true })
      .filter((entry) => entry.isDirectory() && !entry.name.startsWith("_"))
      .flatMap((entry) => {
        const body = latestBody(path.join(root, entry.name));
        const { fm } = splitDocFrontMatter(body ?? "");
        const [relPath, sha] = (fm.source ?? "").split("@");
        return fm.origin === DOC_SKILL_ORIGIN && relPath && sha
          ? [{ skillId: entry.name, relPath, sha }]
          : [];
      });
  } catch {
    return [];
  }
};

export type StaleDocSkill = {
  readonly skillId: string;
  readonly relPath: string;
  readonly status: "changed" | "deleted";
};

/** Doc-made skills whose source file changed or disappeared since they were saved. */
export const findStaleDocSkills = (
  folder: string,
  skills: readonly DocOriginSkill[],
): readonly StaleDocSkill[] =>
  skills.flatMap((skill): StaleDocSkill[] => {
    try {
      const current = gitBlobSha(
        fs.readFileSync(path.join(folder, skill.relPath)),
      );
      return current === skill.sha
        ? []
        : [
            {
              skillId: skill.skillId,
              relPath: skill.relPath,
              status: "changed",
            },
          ];
    } catch {
      return [
        { skillId: skill.skillId, relPath: skill.relPath, status: "deleted" },
      ];
    }
  });

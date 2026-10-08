import fs from "node:fs";
import path from "node:path";

import { splitSkillBundle } from "@agent-witch/shared/projectSkills";

/** Same layout the History skill pull writes: skills/<id>/{meta.json,vNNNN.md}. */
const SKILLS_DIR = "skills";
const META_FILE = "meta.json";
export const SCRIPTS_DIR = "scripts";
export const SCRIPTS_MANIFEST_FILE = "manifest.json";
const VERSION_PAD = 4;

const SAFE_ID = /^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$/;

export const isSafeSkillPathId = (id: string): boolean =>
  SAFE_ID.test(id) && !id.includes("..");

export type MirrorSkill = {
  readonly skillId: string;
  readonly version: number;
  readonly dir: string;
  readonly hasScripts: boolean;
};

const readVersion = (metaPath: string): number | null => {
  try {
    const meta = JSON.parse(fs.readFileSync(metaPath, "utf8")) as {
      version?: unknown;
    };
    return Number.isInteger(meta.version) ? (meta.version as number) : null;
  } catch {
    return null;
  }
};

export const resolveMirrorSkillsDir = (
  projectDataDir: string,
  projectId: string,
): string | null =>
  isSafeSkillPathId(projectId)
    ? path.join(projectDataDir, projectId, SKILLS_DIR)
    : null;

/** Installed skills of one project (no `_drafts` / `_tombstones`). */
export const listMirrorSkills = (skillsDir: string): MirrorSkill[] => {
  if (!fs.existsSync(skillsDir)) {
    return [];
  }
  return fs
    .readdirSync(skillsDir)
    .filter((name) => isSafeSkillPathId(name) && !name.startsWith("_"))
    .flatMap((skillId) => {
      const dir = path.join(skillsDir, skillId);
      const version = readVersion(path.join(dir, META_FILE));
      return version === null
        ? []
        : [
            {
              skillId,
              version,
              dir,
              hasScripts: fs.existsSync(
                path.join(dir, SCRIPTS_DIR, SCRIPTS_MANIFEST_FILE),
              ),
            },
          ];
    });
};

export const readMirrorSkillBody = (skill: MirrorSkill): string | null => {
  try {
    return fs.readFileSync(
      path.join(
        skill.dir,
        `v${String(skill.version).padStart(VERSION_PAD, "0")}.md`,
      ),
      "utf8",
    );
  } catch {
    return null;
  }
};

/** SKILL.md without the embedded script bundle comment. */
export const readMirrorSkillMarkdown = (skill: MirrorSkill): string | null => {
  const body = readMirrorSkillBody(skill);
  return body === null ? null : splitSkillBundle(body).markdown;
};

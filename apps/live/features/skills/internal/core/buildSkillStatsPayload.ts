import fs from "node:fs";
import path from "node:path";

import { resolveAgentWitchLocalLayout } from "@agent-witch/install-layout";
import { parseSkillManifest } from "@agent-witch/shared/projectSkills";

import { computeSkillSavings, computeSkillWeekly } from "./computeSkillSavings";
import type { SkillSavings, SkillWeeklyPoint } from "./computeSkillSavings";
import type { SkillIndexDb } from "./skillIndex.types";
import { ensureSkillIndexSchema } from "./skillIndexSchema";
import { SCRIPTS_DIR, SCRIPTS_MANIFEST_FILE } from "./skillMirror";

export type SkillStatsPayload = {
  readonly projectId: string;
  readonly skills: readonly (SkillSavings & { readonly scriptCount: number })[];
  readonly weekly: readonly SkillWeeklyPoint[];
};

const MAX_PROJECTS = 20;

const countScripts = (
  projectDataDir: string,
  projectId: string,
  skillId: string,
): number => {
  try {
    const file = path.join(
      projectDataDir,
      projectId,
      "skills",
      skillId,
      SCRIPTS_DIR,
      SCRIPTS_MANIFEST_FILE,
    );
    return (
      parseSkillManifest(JSON.parse(fs.readFileSync(file, "utf8")))?.scripts
        .length ?? 0
    );
  } catch {
    return 0;
  }
};

/**
 * Heartbeat block: per project with indexed skills, the savings table and the
 * weekly chosen/missed series. Only counts and ids, never skill text.
 */
export const buildSkillStatsPayload = (
  db: SkillIndexDb,
  projectDataDir: string = resolveAgentWitchLocalLayout().projectDataDir,
): SkillStatsPayload[] => {
  ensureSkillIndexSchema(db);
  const projects = db
    .prepare("SELECT DISTINCT project_id FROM skill_index")
    .all() as { project_id: string }[];
  return projects.slice(0, MAX_PROJECTS).map(({ project_id: projectId }) => ({
    projectId,
    skills: computeSkillSavings(db, projectId).map((skill) => ({
      ...skill,
      scriptCount: countScripts(projectDataDir, projectId, skill.skillId),
    })),
    weekly: computeSkillWeekly(db, projectId),
  }));
};

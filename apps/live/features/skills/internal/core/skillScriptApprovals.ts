import fs from "node:fs";
import path from "node:path";

import {
  parseSkillManifest,
  type SkillScriptEntry,
} from "@agent-witch/shared/projectSkills";

import type { SkillIndexDb } from "./skillIndex.types";
import {
  listMirrorSkills,
  resolveMirrorSkillsDir,
  SCRIPTS_DIR,
  SCRIPTS_MANIFEST_FILE,
} from "./skillMirror";
import { getScriptApproval, setScriptApproval } from "./skillScriptApprovalDb";

export type ScriptApprovalRequest = {
  readonly skillId: string;
  readonly entry: SkillScriptEntry;
  readonly content: string;
  /** Stable id that ties the cloud question to this exact script version. */
  readonly key: string;
  /** null: never asked; pending: question posted, no answer yet. */
  readonly status: "pending" | null;
};

/**
 * Cluster-style id for the owner question about one script version. The cloud keeps the first 80
 * characters, so the content hash comes first: a long skill or script name must never cut it off,
 * or a new version would inherit the approval of the old one.
 */
export const scriptApprovalKey = (
  skillId: string,
  script: string,
  sha256: string,
): string => `script:${sha256.slice(0, 12)}:${skillId}:${script}`;

/** Installed scripts with no owner decision yet (a new version needs a new one). */
export const listScriptsNeedingApproval = (
  db: SkillIndexDb,
  projectDataDir: string,
  projectId: string,
): ScriptApprovalRequest[] => {
  const skillsDir = resolveMirrorSkillsDir(projectDataDir, projectId);
  const found: ScriptApprovalRequest[] = [];
  for (const skill of skillsDir === null ? [] : listMirrorSkills(skillsDir)) {
    if (!skill.hasScripts) {
      continue;
    }
    const dir = path.join(skill.dir, SCRIPTS_DIR);
    try {
      const manifest = parseSkillManifest(
        JSON.parse(
          fs.readFileSync(path.join(dir, SCRIPTS_MANIFEST_FILE), "utf8"),
        ),
      );
      for (const entry of manifest?.scripts ?? []) {
        const key = {
          projectId,
          skillId: skill.skillId,
          script: entry.name,
          sha256: entry.sha256,
        };
        const status = getScriptApproval(db, key);
        if (status === null || status === "pending") {
          found.push({
            status,
            skillId: skill.skillId,
            entry,
            content: fs.readFileSync(path.join(dir, entry.file), "utf8"),
            key: scriptApprovalKey(skill.skillId, entry.name, entry.sha256),
          });
        }
      }
    } catch {
      // unreadable scripts stay unapproved
    }
  }
  return found;
};

/** Record the owner's answer for one script version. */
export const recordScriptDecision = (
  db: SkillIndexDb,
  projectId: string,
  request: ScriptApprovalRequest,
  status: "approved" | "denied" | "pending",
): void =>
  setScriptApproval(
    db,
    {
      projectId,
      skillId: request.skillId,
      script: request.entry.name,
      sha256: request.entry.sha256,
    },
    status,
  );

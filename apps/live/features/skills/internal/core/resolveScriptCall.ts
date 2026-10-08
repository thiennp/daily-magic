import fs from "node:fs";
import path from "node:path";

import {
  computeSkillScriptSha256,
  parseSkillManifest,
  SKILL_SCRIPT_DEFAULT_TIMEOUT_SEC,
  type SkillScriptEntry,
} from "@agent-witch/shared/projectSkills";

import type { SkillIndexDb } from "./skillIndex.types";
import { findProjectFolderRoot } from "./projectFolderRoot";
import { buildScriptArgv } from "./skillScriptParams";
import { getScriptApproval } from "./skillScriptApprovalDb";
import { SCRIPTS_DIR, SCRIPTS_MANIFEST_FILE } from "./skillMirror";

export type ScriptRequest = {
  readonly name: string;
  readonly params: Readonly<Record<string, unknown>>;
  /** `project-data/<id>/skills/<skill>`. */
  readonly skillDir: string;
  /** Working directory of the calling agent. */
  readonly cwd: string;
  /** Coding-tools pause switch (fail closed when it says paused). */
  readonly isPaused?: () => boolean;
};

export type ResolvedScript =
  | {
      readonly ok: true;
      readonly entry: SkillScriptEntry;
      readonly file: string;
      readonly argv: readonly string[];
      readonly cwd: string;
      readonly timeoutMs: number;
    }
  | { readonly ok: false; readonly error: string };

const fail = (error: string): ResolvedScript => ({ ok: false, error });

const inside = (root: string, target: string): boolean =>
  target === root || target.startsWith(`${root}${path.sep}`);

const readEntry = (
  scriptsDir: string,
  name: string,
): SkillScriptEntry | null => {
  try {
    const manifest = parseSkillManifest(
      JSON.parse(
        fs.readFileSync(path.join(scriptsDir, SCRIPTS_MANIFEST_FILE), "utf8"),
      ),
    );
    return manifest?.scripts.find((s) => s.name === name) ?? null;
  } catch {
    return null;
  }
};

/**
 * Every precondition for running a script, in order: pause switch, manifest
 * entry, file on disk is the pinned hash, owner approval, params, and cwd
 * confined (by realpath) to the project folder.
 */
export const resolveScriptCall = (
  db: SkillIndexDb,
  r: { readonly projectId: string; readonly skillId: string },
  s: ScriptRequest,
): ResolvedScript => {
  if (s.isPaused?.() === true) {
    return fail("coding_tools_paused");
  }
  const scriptsDir = path.join(s.skillDir, SCRIPTS_DIR);
  const entry = readEntry(scriptsDir, s.name);
  if (entry === null) {
    return fail("script_not_found");
  }
  const file = path.join(scriptsDir, entry.file);
  let content: string;
  let real: string;
  try {
    real = fs.realpathSync(file);
    if (!inside(fs.realpathSync(scriptsDir), real)) {
      return fail("script_outside_skill");
    }
    content = fs.readFileSync(real, "utf8");
  } catch {
    return fail("script_missing_on_disk");
  }
  if (computeSkillScriptSha256(content) !== entry.sha256) {
    return fail("script_hash_mismatch");
  }
  const key = { ...r, script: entry.name, sha256: entry.sha256 };
  if (getScriptApproval(db, key) !== "approved") {
    return fail("script_not_approved");
  }
  const argv = buildScriptArgv(entry, s.params);
  if (!argv.ok) {
    return fail(argv.error);
  }
  let cwd: string;
  try {
    cwd = fs.realpathSync(s.cwd);
  } catch {
    return fail("cwd_outside_project");
  }
  const root = findProjectFolderRoot(cwd, r.projectId);
  if (root === null || !inside(fs.realpathSync(root), cwd)) {
    return fail("cwd_outside_project");
  }
  const seconds = entry.timeoutSec ?? SKILL_SCRIPT_DEFAULT_TIMEOUT_SEC;
  return {
    ok: true,
    entry,
    file: real,
    argv: argv.argv,
    cwd,
    timeoutMs: seconds * 1_000,
  };
};

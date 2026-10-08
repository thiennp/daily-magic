import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  buildSkillBundle,
  embedSkillBundle,
  type SkillScriptProposal,
} from "@agent-witch/shared/projectSkills";

import { reindexProject } from "./reindexProject";
import { openTestDb } from "./skillFixtures.testutil";
import { setScriptApproval } from "./skillScriptApprovalDb";

export const ECHO_SCRIPT: SkillScriptProposal = {
  name: "echo-name",
  file: "echo-name.sh",
  description: "Print a greeting",
  params: [{ name: "who", required: true, example: "world" }],
  permissions: { write: false, network: false },
  content: '#!/bin/sh\necho "hello $1"\n',
};

export type ScriptWorld = {
  readonly root: string;
  readonly folder: string;
  readonly db: ReturnType<typeof openTestDb>;
  readonly skillDir: string;
  readonly sha256: string;
  readonly cleanup: () => void;
};

/** Temp project-data mirror with one skill that carries `scripts`, indexed. */
export const makeScriptWorld = async (
  scripts: readonly SkillScriptProposal[] = [ECHO_SCRIPT],
  options: { readonly tamper?: boolean } = {},
): Promise<ScriptWorld> => {
  const root = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), "sk-")));
  const built = buildSkillBundle(scripts);
  if (!built.ok) {
    throw new Error(built.reason);
  }
  const skillDir = path.join(root, "data", "p1", "skills", "greet");
  fs.mkdirSync(skillDir, { recursive: true });
  fs.writeFileSync(path.join(skillDir, "meta.json"), '{"version":1}');
  const bundle = options.tamper
    ? {
        ...built.bundle,
        files: { [ECHO_SCRIPT.file]: "echo tampered\n" },
      }
    : built.bundle;
  fs.writeFileSync(
    path.join(skillDir, "v0001.md"),
    embedSkillBundle(
      "---\nname: Greet\ndescription: Say hello\nkeywords: [hello]\n---\n# Steps\n1. Run it\n",
      bundle,
    ),
  );
  const folder = path.join(root, "work");
  fs.mkdirSync(path.join(folder, ".agent-witch"), { recursive: true });
  fs.writeFileSync(
    path.join(folder, ".agent-witch", "project.json"),
    '{"projectId":"p1"}',
  );
  const db = openTestDb();
  await reindexProject({
    db,
    projectDataDir: path.join(root, "data"),
    projectId: "p1",
  });
  return {
    root,
    folder,
    db,
    skillDir,
    sha256: built.bundle.manifest.scripts[0]?.sha256 ?? "",
    cleanup: () => fs.rmSync(root, { recursive: true, force: true }),
  };
};

export const approve = (world: ScriptWorld, script = "echo-name"): void =>
  setScriptApproval(
    world.db,
    { projectId: "p1", skillId: "greet", script, sha256: world.sha256 },
    "approved",
  );

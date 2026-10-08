import fs from "node:fs";
import path from "node:path";

import {
  computeSkillScriptSha256,
  readSkillBundleFromBody,
  type SkillBundle,
} from "@agent-witch/shared/projectSkills";

import {
  readMirrorSkillBody,
  SCRIPTS_DIR,
  SCRIPTS_MANIFEST_FILE,
  type MirrorSkill,
} from "./skillMirror";

const SEED_FILE = "scripts.seed.json";
const READ_ONLY_FILE = 0o555;

export type SeedStatus = {
  readonly status: "none" | "ok" | "unverified";
  readonly version: number;
  readonly reason?: string;
};

const readSeed = (skill: MirrorSkill): SeedStatus | null => {
  try {
    const seed = JSON.parse(
      fs.readFileSync(path.join(skill.dir, SEED_FILE), "utf8"),
    ) as SeedStatus;
    const manifestOk =
      seed.status !== "ok" ||
      fs.existsSync(path.join(skill.dir, SCRIPTS_DIR, SCRIPTS_MANIFEST_FILE));
    return seed.version === skill.version && manifestOk ? seed : null;
  } catch {
    return null;
  }
};

const removeScripts = (skill: MirrorSkill): void =>
  fs.rmSync(path.join(skill.dir, SCRIPTS_DIR), {
    recursive: true,
    force: true,
  });

/** Write each file read-only, re-read it and verify against the manifest hash. */
const writeVerified = (skill: MirrorSkill, bundle: SkillBundle): boolean => {
  const dir = path.join(skill.dir, SCRIPTS_DIR);
  fs.mkdirSync(dir, { recursive: true, mode: 0o700 });
  for (const entry of bundle.manifest.scripts) {
    const file = path.join(dir, entry.file);
    fs.writeFileSync(file, bundle.files[entry.file] ?? "", {
      mode: READ_ONLY_FILE,
    });
    fs.chmodSync(file, READ_ONLY_FILE);
    if (
      computeSkillScriptSha256(fs.readFileSync(file, "utf8")) !== entry.sha256
    ) {
      return false;
    }
  }
  const manifest = path.join(dir, SCRIPTS_MANIFEST_FILE);
  fs.writeFileSync(manifest, JSON.stringify(bundle.manifest), { mode: 0o444 });
  return true;
};

const record = (skill: MirrorSkill, seed: SeedStatus): SeedStatus => {
  fs.writeFileSync(path.join(skill.dir, SEED_FILE), JSON.stringify(seed));
  return seed;
};

/**
 * Install a published skill's scripts under `skills/<id>/scripts/`: verify
 * the embedded bundle (hashes, caps), write files 0555, refuse on mismatch
 * (logged; the skill is marked unverified and has no scripts in the index).
 * Idempotent per skill version.
 */
export const seedSkillScripts = (skill: MirrorSkill): SeedStatus => {
  const cached = readSeed(skill);
  if (cached !== null) {
    return cached;
  }
  const body = readMirrorSkillBody(skill);
  const { bundle, error } = readSkillBundleFromBody(body ?? "");
  removeScripts(skill);
  if (bundle === null && error === null) {
    return record(skill, { status: "none", version: skill.version });
  }
  if (bundle === null || !writeVerified(skill, bundle)) {
    const reason = error ?? "script_hash_mismatch";
    removeScripts(skill);
    console.warn(
      `[agent-witch] skill ${skill.skillId} scripts unverified: ${reason}`,
    );
    return record(skill, {
      status: "unverified",
      version: skill.version,
      reason,
    });
  }
  return record(skill, { status: "ok", version: skill.version });
};

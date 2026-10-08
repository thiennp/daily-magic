import fs from "node:fs";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { getSkillRow } from "./skillIndexDb";
import { listScriptsNeedingApproval } from "./skillScriptApprovals";
import { makeScriptWorld, type ScriptWorld } from "./skillScripts.testutil";

let world: ScriptWorld | null = null;
afterEach(() => world?.cleanup());

describe("seeding scripts from a skill bundle", () => {
  it("writes verified read-only files, indexes has_scripts and asks for approval", async () => {
    world = await makeScriptWorld();
    const file = path.join(world.skillDir, "scripts", "echo-name.sh");
    expect(fs.statSync(file).mode & 0o777).toBe(0o555);
    expect(getSkillRow(world.db, "p1", "greet")?.hasScripts).toBe(true);
    const needed = listScriptsNeedingApproval(
      world.db,
      path.join(world.root, "data"),
      "p1",
    );
    expect(needed.map((n) => n.entry.name)).toEqual(["echo-name"]);
    expect(needed[0]?.status).toBeNull();
  });

  it("refuses a bundle whose file does not match the manifest hash", async () => {
    world = await makeScriptWorld(undefined, { tamper: true });
    expect(fs.existsSync(path.join(world.skillDir, "scripts"))).toBe(false);
    expect(getSkillRow(world.db, "p1", "greet")?.hasScripts).toBe(false);
    const seed = JSON.parse(
      fs.readFileSync(path.join(world.skillDir, "scripts.seed.json"), "utf8"),
    ) as { status: string; reason: string };
    expect(seed.status).toBe("unverified");
    expect(seed.reason).toContain("script_hash_mismatch");
  });

  it("keeps SKILL.md readable without the bundle comment", async () => {
    world = await makeScriptWorld();
    const { readMirrorSkillMarkdown, listMirrorSkills } =
      await import("./skillMirror");
    const [skill] = listMirrorSkills(
      path.join(world.root, "data", "p1", "skills"),
    );
    expect(readMirrorSkillMarkdown(skill!)).not.toContain("skill-bundle");
  });
});

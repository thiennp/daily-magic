import { mkdir, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { resolveAgentWitchDmgAbsolutePath } from "@/lib/agentWitch/resolveAgentWitchDmgFile";

describe("resolveAgentWitchDmgAbsolutePath", () => {
  it("returns null when no DMG candidates exist", async () => {
    const emptyDir = path.join(os.tmpdir(), `aw-dmg-empty-${Date.now()}`);
    await mkdir(emptyDir, { recursive: true });

    expect(await resolveAgentWitchDmgAbsolutePath(emptyDir)).toBeNull();
  });

  it("prefers public/install/AgentWitch.dmg when present", async () => {
    const root = path.join(os.tmpdir(), `aw-dmg-public-${Date.now()}`);
    const dmgPath = path.join(root, "public", "install", "AgentWitch.dmg");
    await mkdir(path.dirname(dmgPath), { recursive: true });
    await writeFile(dmgPath, "fake-dmg");

    expect(await resolveAgentWitchDmgAbsolutePath(root)).toBe(dmgPath);
  });
});

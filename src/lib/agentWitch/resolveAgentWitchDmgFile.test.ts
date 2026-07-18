import { mkdir, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { resolveAgentWitchDmgAbsolutePath } from "@/lib/agentWitch/resolveAgentWitchDmgFile";

describe("resolveAgentWitchDmgAbsolutePath", () => {
  it("returns null when no DMG candidates exist", async () => {
    const emptyDir = path.join(os.tmpdir(), `aw-dmg-empty-${Date.now()}`);
    await mkdir(emptyDir, { recursive: true });

    expect(
      await resolveAgentWitchDmgAbsolutePath("production", emptyDir),
    ).toBeNull();
    expect(
      await resolveAgentWitchDmgAbsolutePath("local", emptyDir),
    ).toBeNull();
  });

  it("resolves production and local DMG paths separately", async () => {
    const root = path.join(os.tmpdir(), `aw-dmg-public-${Date.now()}`);
    const prodPath = path.join(root, "public", "install", "AgentWitch.dmg");
    const localPath = path.join(
      root,
      "public",
      "install",
      "AgentWitch-local.dmg",
    );
    await mkdir(path.dirname(prodPath), { recursive: true });
    await writeFile(prodPath, "prod-dmg");
    await writeFile(localPath, "local-dmg");

    expect(await resolveAgentWitchDmgAbsolutePath("production", root)).toBe(
      prodPath,
    );
    expect(await resolveAgentWitchDmgAbsolutePath("local", root)).toBe(
      localPath,
    );
  });
});

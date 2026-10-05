import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createHash } from "node:crypto";
import { afterEach, describe, expect, it } from "vitest";

import { buildAgentWitchBundledDepsArchive } from "./buildAgentWitchBundledDepsArchive";

const tempDirs: string[] = [];

afterEach(() => {
  for (const dir of tempDirs.splice(0)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

describe("buildAgentWitchBundledDepsArchive", () => {
  it("writes the same bytes when built twice", () => {
    const workspaceRoot = path.resolve(__dirname, "../../../../../../");
    if (!fs.existsSync(path.join(workspaceRoot, "node_modules/node-pty"))) {
      return;
    }

    const appDir = fs.mkdtempSync(path.join(os.tmpdir(), "aw-deps-archive-"));
    tempDirs.push(appDir);

    buildAgentWitchBundledDepsArchive({ workspaceRoot, appDir });
    const first = fs.readFileSync(path.join(appDir, "deps.tar.gz"));
    buildAgentWitchBundledDepsArchive({ workspaceRoot, appDir });
    const second = fs.readFileSync(path.join(appDir, "deps.tar.gz"));

    expect(createHash("sha256").update(second).digest("hex")).toBe(
      createHash("sha256").update(first).digest("hex"),
    );
  });
});

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { ensureNodePtySpawnHelpersExecutable } from "./ensureNodePtySpawnHelpersExecutable";

const dirs: string[] = [];
afterEach(() => {
  for (const dir of dirs.splice(0)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

const makeDeps = (modes: Record<string, number>): string => {
  const depsDir = fs.mkdtempSync(path.join(os.tmpdir(), "aw-deps-"));
  dirs.push(depsDir);
  for (const [arch, mode] of Object.entries(modes)) {
    const dir = path.join(depsDir, "node-pty", "prebuilds", arch);
    fs.mkdirSync(dir, { recursive: true });
    const helper = path.join(dir, "spawn-helper");
    fs.writeFileSync(helper, "x");
    fs.chmodSync(helper, mode);
  }
  return depsDir;
};

describe("ensureNodePtySpawnHelpersExecutable", () => {
  it("adds the execute bit where it is missing and leaves good helpers alone", () => {
    const depsDir = makeDeps({ "darwin-arm64": 0o644, "darwin-x64": 0o755 });
    const fixed = ensureNodePtySpawnHelpersExecutable(depsDir);
    expect(fixed).toHaveLength(1);
    expect(fixed[0]).toContain("darwin-arm64");
    for (const arch of ["darwin-arm64", "darwin-x64"]) {
      const mode = fs.statSync(
        path.join(depsDir, "node-pty", "prebuilds", arch, "spawn-helper"),
      ).mode;
      expect(mode & 0o111).toBe(0o111);
    }
    expect(ensureNodePtySpawnHelpersExecutable(depsDir)).toEqual([]);
  });

  it("is a no-op when the deps folder or prebuilds are missing", () => {
    expect(ensureNodePtySpawnHelpersExecutable("/nonexistent/deps")).toEqual(
      [],
    );
  });
});

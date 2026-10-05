import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { ensureAgentWitchProjectFolder } from "./ensureAgentWitchProjectFolder";
import { resolveAgentWitchProjectIdFromCwd } from "./resolveAgentWitchProjectIdFromCwd";

const tempDirs: string[] = [];

afterEach(() => {
  for (const tempDir of tempDirs.splice(0)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

const makeTempDir = (): string => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "awl-project-cwd-"));
  tempDirs.push(tempDir);
  return tempDir;
};

describe("resolveAgentWitchProjectIdFromCwd", () => {
  it("finds the projectId from a nested cwd inside a saved project folder", () => {
    const root = makeTempDir();
    ensureAgentWitchProjectFolder({
      projectFolderPath: root,
      projectId: "proj-1",
    });
    const nested = path.join(root, "src", "deep");
    fs.mkdirSync(nested, { recursive: true });

    expect(resolveAgentWitchProjectIdFromCwd(nested)).toBe("proj-1");
    expect(resolveAgentWitchProjectIdFromCwd(root)).toBe("proj-1");
  });

  it("returns null when no ancestor has a projectId", () => {
    const root = makeTempDir();
    ensureAgentWitchProjectFolder({ projectFolderPath: root });

    expect(resolveAgentWitchProjectIdFromCwd(root)).toBeNull();
  });
});

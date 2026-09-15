import { describe, expect, it } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  mergeLocalHarnessRevealWithCursorDir,
  resolveCursorDirFromUserPath,
} from "./mergeLocalHarnessRevealWithCursorDir";

describe("mergeLocalHarnessRevealWithCursorDir", () => {
  it("resolves repo root to .cursor and merges a set", () => {
    const tempRoot = fs.mkdtempSync(
      path.join(os.homedir(), ".agent-witch-test-merge-"),
    );
    const repoDir = path.join(tempRoot, "manual-repo");
    const cursorDir = path.join(repoDir, ".cursor");
    fs.mkdirSync(path.join(cursorDir, "commands"), { recursive: true });
    fs.writeFileSync(path.join(cursorDir, "commands", "demo.md"), "# demo\n");

    expect(resolveCursorDirFromUserPath(repoDir)).toBe(
      fs.realpathSync(cursorDir),
    );

    const merged = mergeLocalHarnessRevealWithCursorDir({
      reveal: { scanRoots: [tempRoot], sets: [] },
      projectPath: repoDir,
    });

    expect(merged?.sets.length).toBe(1);
    expect(merged?.sets[0]?.proposedSlug).toBe("manual-repo");

    fs.rmSync(tempRoot, { recursive: true, force: true });
  });
});

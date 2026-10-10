import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { runTaskIntakeCli } from "./runTaskIntakeCli";
import { readTaskIntakePrefs } from "./taskIntakePrefsStore";

const tempDirs: string[] = [];
afterEach(() => {
  for (const d of tempDirs.splice(0)) {
    fs.rmSync(d, { recursive: true, force: true });
  }
});

const run = (argv: string[], claimed: boolean) => {
  const root = fs.realpathSync(
    fs.mkdtempSync(path.join(os.tmpdir(), "awl-cli-")),
  );
  tempDirs.push(root);
  const out: string[] = [];
  const err: string[] = [];
  const layout = { installDir: path.join(root, "home"), profileEmail: "a@b.c" };
  const code = runTaskIntakeCli(argv, {
    layout,
    resolveProjectId: () => "p1",
    readClaims: () =>
      claimed
        ? [{ accountEmail: "a@b.c", projectId: "p1", folderRealPath: root }]
        : [],
    writeStdout: (t) => out.push(t),
    writeStderr: (t) => err.push(t),
    defaultCwd: root,
  });
  return { code, out, err, layout };
};

describe("runTaskIntakeCli", () => {
  it("remember saves outside the repo for a valid project", () => {
    const { code, layout } = run(["remember"], true);
    expect(code).toBe(0);
    expect(readTaskIntakePrefs(layout).byProjectId.p1?.mode).toBe("always-yes");
  });

  it("remember refuses a project that is not valid here", () => {
    const { code, err, layout } = run(["remember"], false);
    expect(code).toBe(1);
    expect(err.join("")).toContain("not valid");
    expect(readTaskIntakePrefs(layout).byProjectId).toEqual({});
  });

  it("rejects an unknown action", () => {
    expect(run(["bogus"], true).code).toBe(1);
  });
});

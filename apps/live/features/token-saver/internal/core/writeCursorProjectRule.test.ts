import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { createTempCliIo } from "./createNodeCliFs";
import {
  CURSOR_PROJECT_RULE_RELATIVE,
  HTML_MARKER_BEGIN,
} from "./tokenSaverMarkers.constants";
import { writeCursorProjectRule } from "./writeCursorProjectRule";
import { writeGitInfoExclude } from "./writeGitInfoExclude";

const tempDirs: string[] = [];
afterEach(() => {
  for (const d of tempDirs.splice(0)) {
    fs.rmSync(d, { recursive: true, force: true });
  }
});

const openRepo = () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "awl-rule-"));
  tempDirs.push(root);
  fs.mkdirSync(path.join(root, ".git", "info"), { recursive: true });
  fs.writeFileSync(path.join(root, ".git", "info", "exclude"), "# user\n");
  return { root, io: createTempCliIo(root) };
};

describe("writeCursorProjectRule", () => {
  it("writes fresh rule and exclude; re-run is idempotent", () => {
    const { root, io } = openRepo();
    const first = writeCursorProjectRule({
      fs: io,
      projectRoot: root,
      projectId: "p1",
    });
    expect(first.wrote).toBe(true);
    const filePath = path.join(root, CURSOR_PROJECT_RULE_RELATIVE);
    const body = io.readUtf8(filePath);
    expect(body).toContain("alwaysApply: true");
    expect(body).toContain("projectId: p1");
    expect(body).toContain(HTML_MARKER_BEGIN);
    const second = writeCursorProjectRule({
      fs: io,
      projectRoot: root,
      projectId: "p1",
    });
    expect(second.wrote).toBe(false);
    writeGitInfoExclude({
      fs: io,
      repoRoot: root,
      relativePaths: [CURSOR_PROJECT_RULE_RELATIVE],
    });
    const exclude = io.readUtf8(path.join(root, ".git/info/exclude"));
    expect(exclude).toContain("# user");
    expect(exclude).toContain(CURSOR_PROJECT_RULE_RELATIVE);
  });

  it("preserves unmarked user content when markers are appended", () => {
    const { root, io } = openRepo();
    const filePath = path.join(root, CURSOR_PROJECT_RULE_RELATIVE);
    io.mkdirp(path.dirname(filePath));
    io.writeUtf8(filePath, "# keep-me\n");
    writeCursorProjectRule({ fs: io, projectRoot: root, projectId: "p2" });
    const body = io.readUtf8(filePath);
    expect(body.startsWith("# keep-me")).toBe(true);
    expect(body).toContain(HTML_MARKER_BEGIN);
    expect(body).toContain("projectId: p2");
  });
  it("replaces only our marked block in an existing rule (projectId change, backup)", () => {
    const { root, io } = openRepo();
    writeCursorProjectRule({ fs: io, projectRoot: root, projectId: "old" });
    const filePath = path.join(root, CURSOR_PROJECT_RULE_RELATIVE);
    io.writeUtf8(filePath, `${io.readUtf8(filePath)}# user tail\n`);
    const result = writeCursorProjectRule({
      fs: io,
      projectRoot: root,
      projectId: "new",
    });
    expect(result.wrote).toBe(true);
    expect(result.backupPath).toBeTruthy();
    const body = io.readUtf8(filePath);
    expect(body).toContain("alwaysApply: true");
    expect(body).toContain("projectId: new");
    expect(body).not.toContain("projectId: old");
    expect(body).toContain("# user tail");
    expect(body.split(HTML_MARKER_BEGIN)).toHaveLength(2);
  });
});

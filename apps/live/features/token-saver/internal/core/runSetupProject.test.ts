import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { createTempCliIo } from "./createNodeCliFs";
import { isDeclinedCwd } from "./declinedProjectsStore";
import { runSetupProject } from "./runSetupProject";
import { CURSOR_PROJECT_RULE_RELATIVE } from "./tokenSaverMarkers.constants";

const tempDirs: string[] = [];
afterEach(() => {
  for (const d of tempDirs.splice(0)) {
    fs.rmSync(d, { recursive: true, force: true });
  }
});

const open = () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "awl-setup-"));
  tempDirs.push(root);
  const installDir = path.join(root, ".agent-witch");
  fs.mkdirSync(path.join(installDir, "profiles", "t@x.com"), {
    recursive: true,
  });
  const project = path.join(root, "repo");
  fs.mkdirSync(path.join(project, ".git", "info"), { recursive: true });
  fs.writeFileSync(path.join(project, ".git", "info", "exclude"), "");
  const io = createTempCliIo(root);
  const layout = { installDir, profileEmail: "t@x.com" };
  return { root, layout, project, io };
};

describe("runSetupProject", () => {
  it("decline is terminal: no fragments or defaults written", () => {
    const { layout, project, io } = open();
    const result = runSetupProject({
      layout,
      cwd: project,
      accept: false,
      fs: io,
      io,
    });
    expect(result).toEqual({ ok: true, state: "Declined" });
    expect(isDeclinedCwd({ layout, cwd: project, fs: io })).toBe(true);
    expect(
      io.exists(path.join(project, CURSOR_PROJECT_RULE_RELATIVE)),
    ).toBe(false);
    expect(
      io.exists(path.join(project, ".agent-witch", "token-saver.json")),
    ).toBe(false);
  });

  it("accept applies defaults + Cursor fragment; clears prior decline", () => {
    const { layout, project, io } = open();
    runSetupProject({ layout, cwd: project, accept: false, fs: io, io });
    const result = runSetupProject({
      layout,
      cwd: project,
      accept: true,
      projectId: "proj-9",
      fs: io,
      io,
    });
    expect(result.ok).toBe(true);
    expect(result.state).toBe("ProjectFragmentsWritten");
    expect(result.projectId).toBe("proj-9");
    expect(isDeclinedCwd({ layout, cwd: project, fs: io })).toBe(false);
    expect(
      io.readUtf8(path.join(project, CURSOR_PROJECT_RULE_RELATIVE)),
    ).toContain("projectId: proj-9");
    expect(
      io.readUtf8(path.join(project, ".agent-witch", "token-saver.json")),
    ).toContain('"history": false');
  });
});

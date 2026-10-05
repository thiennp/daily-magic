import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { createTempCliIo } from "./createNodeCliFs";
import {
  clearProjectDecline,
  declineProjectForCwd,
  isDeclinedCwd,
  readDeclinedProjectsStore,
} from "./declinedProjectsStore";

const tempDirs: string[] = [];
afterEach(() => {
  for (const d of tempDirs.splice(0)) {
    fs.rmSync(d, { recursive: true, force: true });
  }
});

const open = () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "awl-decline-"));
  tempDirs.push(root);
  const installDir = path.join(root, ".agent-witch");
  const profile = path.join(installDir, "profiles", "t@x.com");
  fs.mkdirSync(profile, { recursive: true });
  const project = path.join(root, "proj");
  fs.mkdirSync(project);
  const io = createTempCliIo(root);
  const layout = { installDir, profileEmail: "t@x.com" };
  return { root, layout, project, io };
};

describe("declinedProjectsStore", () => {
  it("writes decline and isDeclined becomes true (terminal)", () => {
    const { layout, project, io } = open();
    expect(isDeclinedCwd({ layout, cwd: project, fs: io })).toBe(false);
    declineProjectForCwd({
      layout,
      cwd: project,
      fs: io,
      nowIso: "2026-10-05T12:00:00.000Z",
    });
    expect(isDeclinedCwd({ layout, cwd: project, fs: io })).toBe(true);
    const store = readDeclinedProjectsStore(layout, io);
    const key = io.realpath(project);
    expect(store.byRealpath[key]?.declinedAt).toBe("2026-10-05T12:00:00.000Z");
  });

  it("clearDecline removes the key; re-run decline is idempotent", () => {
    const { layout, project, io } = open();
    declineProjectForCwd({ layout, cwd: project, fs: io });
    declineProjectForCwd({ layout, cwd: project, fs: io });
    expect(Object.keys(readDeclinedProjectsStore(layout, io).byRealpath)).toHaveLength(1);
    expect(clearProjectDecline({ layout, cwd: project, fs: io })).toBe(true);
    expect(isDeclinedCwd({ layout, cwd: project, fs: io })).toBe(false);
    expect(clearProjectDecline({ layout, cwd: project, fs: io })).toBe(false);
  });
});

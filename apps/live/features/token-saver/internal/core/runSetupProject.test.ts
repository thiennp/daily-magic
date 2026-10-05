import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  buildDefaultProjectFlags,
  parseProjectFlags,
} from "@agent-witch/shared/projects";
import { afterEach, describe, expect, it } from "vitest";

import type { CliIo } from "./cliFs.types";
import { createTempCliIo } from "./createNodeCliFs";
import {
  isDeclinedCwd,
  readDeclinedProjectsStore,
} from "./declinedProjectsStore";
import { resolveDeclinedProjectsPath } from "./resolveDeclinedProjectsPath";
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

/** Track rename targets so success-order asserts resolve → clearDecline → defaults/fragments. */
const withOrderTracking = (io: CliIo, calls: string[]): CliIo => ({
  ...io,
  rename: (from, to) => {
    if (to.endsWith("declined-projects.json")) {
      calls.push("clearDecline");
    } else if (to.endsWith("token-saver.json")) {
      calls.push("defaults");
    } else if (to.endsWith("agent-witch-check-context.mdc")) {
      calls.push("fragments");
    }
    io.rename(from, to);
  },
});

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
    const flagsRaw: unknown = JSON.parse(
      io.readUtf8(path.join(project, ".agent-witch", "token-saver.json")),
    );
    expect(flagsRaw).toEqual(buildDefaultProjectFlags());
    expect(parseProjectFlags(flagsRaw)).toEqual(buildDefaultProjectFlags());
  });

  it("when resolve fails, clearProjectDecline is not called and decline is unchanged", () => {
    const { layout, project, io } = open();
    runSetupProject({ layout, cwd: project, accept: false, fs: io, io });
    const declinePath = resolveDeclinedProjectsPath(layout);
    const before = io.readUtf8(declinePath);
    const storeBefore = readDeclinedProjectsStore(layout, io);

    const missing = runSetupProject({
      layout,
      cwd: project,
      accept: true,
      fs: io,
      io,
    });
    expect(missing).toEqual({
      ok: false,
      state: "Declined",
      reason: "projectId required on accept",
    });
    expect(io.readUtf8(declinePath)).toBe(before);
    expect(isDeclinedCwd({ layout, cwd: project, fs: io })).toBe(true);
    expect(readDeclinedProjectsStore(layout, io)).toEqual(storeBefore);
    expect(
      io.exists(path.join(project, CURSOR_PROJECT_RULE_RELATIVE)),
    ).toBe(false);
    expect(
      io.exists(path.join(project, ".agent-witch", "token-saver.json")),
    ).toBe(false);

    expect(() =>
      runSetupProject({
        layout,
        cwd: project,
        accept: true,
        fs: io,
        io,
        resolveProject: () => {
          throw new Error("cloud resolve failed");
        },
      }),
    ).toThrow("cloud resolve failed");
    expect(io.readUtf8(declinePath)).toBe(before);
    expect(isDeclinedCwd({ layout, cwd: project, fs: io })).toBe(true);
    expect(
      io.exists(path.join(project, CURSOR_PROJECT_RULE_RELATIVE)),
    ).toBe(false);
    expect(
      io.exists(path.join(project, ".agent-witch", "token-saver.json")),
    ).toBe(false);
  });

  it("on success, order is resolve, then clearDecline, then defaults/fragments", () => {
    const { layout, project, io } = open();
    runSetupProject({ layout, cwd: project, accept: false, fs: io, io });
    const calls: string[] = [];
    const tracked = withOrderTracking(io, calls);
    const result = runSetupProject({
      layout,
      cwd: project,
      accept: true,
      fs: tracked,
      io: tracked,
      resolveProject: () => {
        expect(isDeclinedCwd({ layout, cwd: project, fs: tracked })).toBe(
          true,
        );
        calls.push("resolve");
        return { projectId: "proj-order", kind: "created" };
      },
    });
    expect(result).toEqual({
      ok: true,
      state: "ProjectFragmentsWritten",
      projectId: "proj-order",
    });
    expect(isDeclinedCwd({ layout, cwd: project, fs: tracked })).toBe(false);
    expect(calls).toEqual([
      "resolve",
      "clearDecline",
      "defaults",
      "fragments",
    ]);
  });
});

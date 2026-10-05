import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";

const { resolveAgentWitchProjectIdFromCwd } = vi.hoisted(() => ({
  resolveAgentWitchProjectIdFromCwd: vi.fn<(cwd: string) => string | null>(
    () => null,
  ),
}));

vi.mock("@agent-witch/live-projects", () => ({
  resolveAgentWitchProjectIdFromCwd,
}));

import { createCheckContextRunner } from "./createCheckContextRunner";
import { declineProjectForCwd } from "./declinedProjectsStore";

const tempDirs: string[] = [];

afterEach(() => {
  resolveAgentWitchProjectIdFromCwd.mockReset();
  for (const tempDir of tempDirs.splice(0)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

const makeLayout = () => {
  const installDir = fs.mkdtempSync(path.join(os.tmpdir(), "awl-ccr-"));
  tempDirs.push(installDir);
  return { installDir, profileEmail: "test@example.com" };
};

const makeRunner = (layout = makeLayout()) =>
  createCheckContextRunner({ layout, logError: () => undefined });

describe("createCheckContextRunner", () => {
  it("resolves cwd → projectId via the live-projects public API", () => {
    resolveAgentWitchProjectIdFromCwd.mockReturnValue("proj-cwd");
    const result = makeRunner()({
      cwd: "/tmp/some-repo",
      message: "unrelated",
    });
    expect(resolveAgentWitchProjectIdFromCwd).toHaveBeenCalledWith(
      "/tmp/some-repo",
    );
    expect(result).toEqual({ status: "miss", projectId: "proj-cwd" });
  });

  it("returns none + promptCreate when live-projects finds no project", () => {
    resolveAgentWitchProjectIdFromCwd.mockReturnValue(null);
    const result = makeRunner()({ cwd: "/tmp/no-project" });
    expect(result).toEqual({ status: "none", promptCreate: true });
  });

  it("defaults isDeclined to the decline store (none, no project lookup)", () => {
    const layout = makeLayout();
    const repo = fs.mkdtempSync(path.join(os.tmpdir(), "awl-ccr-repo-"));
    tempDirs.push(repo);
    declineProjectForCwd({ layout, cwd: repo });
    resolveAgentWitchProjectIdFromCwd.mockReturnValue("proj-cwd");
    const result = makeRunner(layout)({ cwd: repo, message: "npm install" });
    expect(result).toEqual({ status: "none" });
    expect(resolveAgentWitchProjectIdFromCwd).not.toHaveBeenCalled();
  });
});

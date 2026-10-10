import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import {
  buildTaskIntakeHookContext,
  isTaskIntakeCandidatePrompt,
} from "./buildTaskIntakeHookContext";
import {
  findValidFolderClaim,
  forgetTaskIntake,
  pruneInvalidTaskIntakePrefs,
  readTaskIntakePrefs,
  rememberTaskIntakeYes,
  type TaskIntakeFolderClaim,
} from "./taskIntakePrefsStore";

const REQUEST = "please add a settings page for the project";
const tempDirs: string[] = [];
afterEach(() => {
  for (const d of tempDirs.splice(0)) {
    fs.rmSync(d, { recursive: true, force: true });
  }
});

const setup = () => {
  const root = fs.realpathSync(
    fs.mkdtempSync(path.join(os.tmpdir(), "awl-intake-")),
  );
  tempDirs.push(root);
  const folder = path.join(root, "repo");
  fs.mkdirSync(path.join(folder, "sub"), { recursive: true });
  const layout = { installDir: path.join(root, "home"), profileEmail: "a@b.c" };
  const claim: TaskIntakeFolderClaim = {
    accountEmail: "a@b.c",
    projectId: "p1",
    folderRealPath: folder,
  };
  return { root, folder, layout, claim };
};

describe("task intake prefs", () => {
  it("asks until the user remembers, then goes automatic", () => {
    const { folder, layout, claim } = setup();
    const ctx = () =>
      buildTaskIntakeHookContext({
        layout,
        projectId: "p1",
        cwd: path.join(folder, "sub"),
        prompt: REQUEST,
        readClaims: () => [claim],
      });
    expect(ctx()).toContain("ask once per session");
    rememberTaskIntakeYes({ layout, projectId: "p1", folderRealPath: folder });
    const auto = ctx() ?? "";
    expect(auto).toContain("Do not ask again");
    expect(auto).toContain("mention it in one line");
    expect(auto).toContain("say nothing about tasks");
    expect(forgetTaskIntake({ layout, projectId: "p1" })).toBe(true);
    expect(ctx()).toContain("ask once per session");
  });

  it("ignores messages that are too short to be a request", () => {
    const { folder, layout, claim } = setup();
    for (const prompt of [
      "ok",
      "thanks a lot",
      "yes please do it",
      undefined,
    ]) {
      expect(
        buildTaskIntakeHookContext({
          layout,
          projectId: "p1",
          cwd: folder,
          prompt,
          readClaims: () => [claim],
        }),
      ).toBeNull();
    }
    expect(isTaskIntakeCandidatePrompt(REQUEST)).toBe(true);
  });

  it("fires nothing when the project has no valid claim for the folder", () => {
    const { folder, layout, claim } = setup();
    const base = { layout, projectId: "p1", cwd: folder, prompt: REQUEST };
    expect(
      buildTaskIntakeHookContext({ ...base, readClaims: () => [] }),
    ).toBeNull();
    expect(
      buildTaskIntakeHookContext({
        ...base,
        readClaims: () => [{ ...claim, accountEmail: "other@x.y" }],
      }),
    ).toBeNull();
    expect(
      buildTaskIntakeHookContext({
        ...base,
        projectId: undefined,
        readClaims: () => [claim],
      }),
    ).toBeNull();
  });

  it("ignores and prunes a remembered choice once its claim is gone or moved", () => {
    const { folder, layout, claim } = setup();
    rememberTaskIntakeYes({ layout, projectId: "p1", folderRealPath: folder });
    const moved = { ...claim, folderRealPath: path.join(folder, "sub") };
    const ctx = buildTaskIntakeHookContext({
      layout,
      projectId: "p1",
      cwd: folder,
      prompt: REQUEST,
      readClaims: () => [moved],
    });
    expect(ctx).toBeNull();
    expect(readTaskIntakePrefs(layout).byProjectId.p1).toBeUndefined();
  });

  it("prunes prefs for projects the account left", () => {
    const { folder, layout } = setup();
    rememberTaskIntakeYes({ layout, projectId: "p1", folderRealPath: folder });
    expect(pruneInvalidTaskIntakePrefs({ layout, claims: [] })).toEqual(["p1"]);
    expect(readTaskIntakePrefs(layout).byProjectId).toEqual({});
  });

  it("does not match a sibling folder that only shares a name prefix", () => {
    const { root, folder, layout, claim } = setup();
    const sibling = `${folder}-other`;
    fs.mkdirSync(sibling);
    expect(
      findValidFolderClaim({
        claims: [claim],
        projectId: "p1",
        profileEmail: layout.profileEmail,
        cwd: sibling,
      }),
    ).toBeNull();
    expect(root).toBeTruthy();
  });
});

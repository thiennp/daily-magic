import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { validateLinkableProjectFolder } from "./validateLinkableProjectFolder";

const root = fs.realpathSync(
  fs.mkdtempSync(path.join(os.tmpdir(), "awl-link-")),
);
const home = path.join(root, "home");
const repo = path.join(home, "repo");
const plain = path.join(home, "plain");
const outside = path.join(root, "outside");
fs.mkdirSync(path.join(repo, ".git"), { recursive: true });
fs.mkdirSync(plain);
fs.mkdirSync(outside);
fs.writeFileSync(path.join(home, "file.txt"), "x");
fs.symlinkSync(repo, path.join(home, "repo-link"));
fs.symlinkSync(outside, path.join(home, "escape"));

const check = (folderPath: string, allowOutsideHome?: boolean) =>
  validateLinkableProjectFolder({
    folderPath,
    homeDir: home,
    ...(allowOutsideHome !== undefined ? { allowOutsideHome } : {}),
  });

describe("validateLinkableProjectFolder", () => {
  it("accepts a git repo inside home", () => {
    expect(check(repo)).toEqual({
      ok: true,
      folderRealPath: repo,
      isGitRepo: true,
    });
  });

  it("accepts a non-git folder and says so", () => {
    expect(check(`${plain}/`)).toEqual({
      ok: true,
      folderRealPath: plain,
      isGitRepo: false,
    });
  });

  it("resolves symlinks to the real folder", () => {
    expect(check(path.join(home, "repo-link"))).toMatchObject({
      ok: true,
      folderRealPath: repo,
    });
  });

  it("refuses a symlink that escapes home unless explicit", () => {
    expect(check(path.join(home, "escape"))).toMatchObject({
      ok: false,
      code: "folder_outside_home",
    });
    expect(check(path.join(home, "escape"), true)).toMatchObject({
      ok: true,
      folderRealPath: outside,
    });
  });

  it.each([
    ["", "folder_required"],
    ["relative/repo", "folder_not_absolute"],
    [path.join(home, "missing"), "folder_not_found"],
    [path.join(home, "file.txt"), "not_a_folder"],
    [home, "folder_is_home"],
  ])("refuses %s with %s", (folderPath, code) => {
    const result = check(folderPath);
    expect(result).toMatchObject({ ok: false, code });
    expect(result.ok ? "" : result.message.length).toBeGreaterThan(0);
  });
});

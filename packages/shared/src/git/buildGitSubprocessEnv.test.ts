import { describe, expect, it } from "vitest";

import { buildGitSubprocessEnv } from "./buildGitSubprocessEnv";

describe("buildGitSubprocessEnv", () => {
  it("removes git hook variables inherited from the parent process", () => {
    const env = buildGitSubprocessEnv({
      ...process.env,
      PATH: "/bin",
      GIT_DIR: ".git",
      GIT_WORK_TREE: "/workspace",
      GIT_INDEX_FILE: ".git/index",
      HOME: "/home/user",
    });

    expect(env.PATH).toBe("/bin");
    expect(env.HOME).toBe("/home/user");
    expect(env.GIT_DIR).toBeUndefined();
    expect(env.GIT_WORK_TREE).toBeUndefined();
    expect(env.GIT_INDEX_FILE).toBeUndefined();
  });
});

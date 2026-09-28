import os from "node:os";
import { describe, expect, it } from "vitest";

import { resolveWriterTaskCwd } from "./resolveWriterTaskCwd";

describe("resolveWriterTaskCwd", () => {
  it("AGENT-128: uses the install workspace when no project folder is set", () => {
    expect(
      resolveWriterTaskCwd({
        workspace: "/Users/me/.agent-witch",
      }),
    ).toBe("/Users/me/.agent-witch");
    expect(
      resolveWriterTaskCwd({
        workspace: "/Users/me/.agent-witch",
        projectFolderPath: "   ",
      }),
    ).toBe("/Users/me/.agent-witch");
  });

  it("AGENT-128: runs the writer in the selected project folder", () => {
    expect(
      resolveWriterTaskCwd({
        workspace: "/Users/me/.agent-witch",
        projectFolderPath: "/Users/me/code/client-work",
      }),
    ).toBe("/Users/me/code/client-work");
  });

  it("AGENT-128: expands a tilde project folder before spawn", () => {
    expect(
      resolveWriterTaskCwd({
        workspace: "/Users/me/.agent-witch",
        projectFolderPath: "~/code/client-work",
      }),
    ).toBe(`${os.homedir()}/code/client-work`);
  });
});

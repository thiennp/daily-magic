import { describe, expect, it } from "vitest";

import { formatGitRemote } from "@/features/projects/settings/folder/formatGitRemote";

describe("formatGitRemote", () => {
  it("shows host and path for every supported remote form", () => {
    expect(formatGitRemote("https://github.com/acme/app.git")).toBe(
      "github.com/acme/app",
    );
    expect(formatGitRemote("git@github.com:acme/app.git")).toBe(
      "github.com/acme/app",
    );
    expect(formatGitRemote("ssh://git@host.example/a/b/")).toBe(
      "host.example/a/b",
    );
  });
});

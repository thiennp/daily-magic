import { describe, expect, it } from "vitest";

import { stripGitRemoteCredentials } from "./readGitFolderInfo";

describe("stripGitRemoteCredentials", () => {
  it("drops user, password and token from https remotes", () => {
    expect(
      stripGitRemoteCredentials("https://user:s3cret@github.com/acme/app.git"),
    ).toBe("https://github.com/acme/app.git");
    expect(
      stripGitRemoteCredentials("https://ghp_abc123@github.com/acme/app.git"),
    ).toBe("https://github.com/acme/app.git");
  });

  it("drops query and fragment, which can carry tokens", () => {
    expect(
      stripGitRemoteCredentials("https://host.example/a/b.git?token=x#frag"),
    ).toBe("https://host.example/a/b.git");
  });

  it("keeps the ssh user but never the password", () => {
    expect(stripGitRemoteCredentials("ssh://git:pw@host.example/a/b.git")).toBe(
      "ssh://git@host.example/a/b.git",
    );
    expect(stripGitRemoteCredentials("git@github.com:acme/app.git")).toBe(
      "git@github.com:acme/app.git",
    );
  });

  it("hides local and unknown schemes", () => {
    expect(stripGitRemoteCredentials("/Users/me/repo")).toBeNull();
    expect(stripGitRemoteCredentials("file:///Users/me/repo")).toBeNull();
    expect(stripGitRemoteCredentials("git://host.example/a.git")).toBeNull();
  });
});

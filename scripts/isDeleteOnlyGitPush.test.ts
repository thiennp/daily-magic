import { describe, expect, it } from "vitest";

import { isDeleteOnlyGitPush } from "./isDeleteOnlyGitPush";

describe("isDeleteOnlyGitPush", () => {
  it("is false for an empty stdin", () => {
    expect(isDeleteOnlyGitPush([])).toBe(false);
  });

  it("is true when every pushed ref is a deletion", () => {
    expect(
      isDeleteOnlyGitPush([
        "refs/heads/old 0000000000000000000000000000000000000000 refs/heads/old abc123",
        "refs/tags/v1 0000000000000000000000000000000000000000 refs/tags/v1 def456",
      ]),
    ).toBe(true);
  });

  it("is false when any ref still has a local object", () => {
    expect(
      isDeleteOnlyGitPush(["refs/heads/main abc123 refs/heads/main def456"]),
    ).toBe(false);
    expect(
      isDeleteOnlyGitPush([
        "refs/heads/del 0000000000000000000000000000000000000000 refs/heads/del abc",
        "refs/heads/keep deadbeef refs/heads/keep cafe",
      ]),
    ).toBe(false);
  });
});

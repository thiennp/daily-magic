import { describe, expect, it } from "vitest";

import { resolveAgentWitchBundleCommitSha } from "./resolveAgentWitchBundleCommitSha";

const SHA = "80a2449dbf1a110bbb8eb9b6c8ea2c7faa77c5bc";

describe("resolveAgentWitchBundleCommitSha (DF-032)", () => {
  it("prefers the deploy env commit", () => {
    expect(
      resolveAgentWitchBundleCommitSha(
        { RAILWAY_GIT_COMMIT_SHA: SHA, GITHUB_SHA: "deadbeef" },
        () => "ffffffff",
      ),
    ).toBe(SHA);
  });

  it("falls back to git HEAD", () => {
    expect(resolveAgentWitchBundleCommitSha({}, () => `${SHA}\n`)).toBe(SHA);
  });

  it("returns null when nothing valid is known", () => {
    expect(
      resolveAgentWitchBundleCommitSha(
        { VERCEL_GIT_COMMIT_SHA: "not-a-sha" },
        () => {
          throw new Error("no git");
        },
      ),
    ).toBeNull();
  });
});

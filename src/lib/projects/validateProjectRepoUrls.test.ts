import { describe, expect, it } from "vitest";

import {
  PROJECT_REPO_URLS_MAX,
  validateDefaultBranch,
  validateProjectRepoUrls,
} from "@/lib/projects/validateProjectRepoUrls";

describe("validateProjectRepoUrls", () => {
  it("accepts https and ssh URLs, dedupes, preserves order", () => {
    const result = validateProjectRepoUrls([
      "https://github.com/org/repo.git",
      " git@github.com:org/other.git ",
      "https://github.com/org/repo.git",
      "ssh://git@github.com/org/third.git",
    ]);
    expect(result).toEqual({
      ok: true,
      repoUrls: [
        "https://github.com/org/repo.git",
        "git@github.com:org/other.git",
        "ssh://git@github.com/org/third.git",
      ],
    });
  });

  it("rejects embedded credentials and token query params", () => {
    expect(
      validateProjectRepoUrls(["https://user:pass@github.com/org/repo.git"])
        .ok,
    ).toBe(false);
    expect(
      validateProjectRepoUrls(["https://user@github.com/org/repo.git"]).ok,
    ).toBe(false);
    expect(
      validateProjectRepoUrls([
        "https://github.com/org/repo.git?token=abc",
      ]).ok,
    ).toBe(false);
    expect(
      validateProjectRepoUrls(["ssh://git:secret@github.com/org/repo.git"])
        .ok,
    ).toBe(false);
  });

  it("rejects non-https/ssh schemes and empty entries", () => {
    expect(validateProjectRepoUrls(["git://github.com/org/repo.git"]).ok).toBe(
      false,
    );
    expect(validateProjectRepoUrls(["http://github.com/org/repo.git"]).ok).toBe(
      false,
    );
    expect(validateProjectRepoUrls(["  "]).ok).toBe(false);
    expect(validateProjectRepoUrls("https://x").ok).toBe(false);
  });

  it("enforces max length", () => {
    const urls = Array.from(
      { length: PROJECT_REPO_URLS_MAX + 1 },
      (_, i) => `https://github.com/org/repo-${i}.git`,
    );
    const result = validateProjectRepoUrls(urls);
    expect(result.ok).toBe(false);
  });
});

describe("validateDefaultBranch", () => {
  it("accepts null and trimmed branch names", () => {
    expect(validateDefaultBranch(null)).toEqual({
      ok: true,
      defaultBranch: null,
    });
    expect(validateDefaultBranch(" main ")).toEqual({
      ok: true,
      defaultBranch: "main",
    });
  });

  it("rejects blank, whitespace, and oversized values", () => {
    expect(validateDefaultBranch("").ok).toBe(false);
    expect(validateDefaultBranch("   ").ok).toBe(false);
    expect(validateDefaultBranch("feat branch").ok).toBe(false);
    expect(validateDefaultBranch("x".repeat(201)).ok).toBe(false);
  });
});

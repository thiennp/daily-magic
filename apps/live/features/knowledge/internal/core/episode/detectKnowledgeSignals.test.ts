import { describe, expect, it } from "vitest";

import {
  findFirstErrorLine,
  findVerifyFailureLine,
  isRevertSubject,
  isUserCorrection,
  parseRevertedSha,
} from "./detectKnowledgeSignals";
import { parseGitLogCommits } from "./readGitRunChanges";
import { matchCommitsToUnverifiedFix } from "./reconcileUnverifiedKnowledgeFixes";

describe("isUserCorrection", () => {
  it("detects short pushback in Vietnamese and English", () => {
    expect(isUserCorrection("không phải, làm lại đi")).toBe(true);
    expect(isUserCorrection("That's not what I asked")).toBe(true);
  });
  it("ignores long messages and ordinary requests", () => {
    expect(isUserCorrection(`wrong ${"x".repeat(500)}`)).toBe(false);
    expect(isUserCorrection("add a retry to the fetch helper")).toBe(false);
  });
});

describe("output analysis", () => {
  it("finds red checks inside otherwise successful output", () => {
    expect(
      findVerifyFailureLine("done\n src/a.ts(3,1): error TS2322: bad\nok"),
    ).toContain("TS2322");
    expect(findVerifyFailureLine("Test Files  1 failed | 4 passed")).toContain(
      "failed",
    );
    expect(findVerifyFailureLine("all green")).toBeNull();
  });
  it("picks the first error-looking line", () => {
    expect(findFirstErrorLine("start\nENOENT: no such file\nend")).toContain(
      "ENOENT",
    );
  });
});

describe("revert + git parsing", () => {
  it("parses revert subjects and the reverted sha", () => {
    expect(isRevertSubject('Revert "feat: x"')).toBe(true);
    expect(isRevertSubject("feat: x")).toBe(false);
    expect(parseRevertedSha("This reverts commit abcdef1234567.")).toBe(
      "abcdef1234567",
    );
  });
  it("parses git log records", () => {
    const raw =
      "aaa\u001fsubject one\u001fbody\u001e\nbbb\u001fsubject two\u001f\u001e";
    expect(parseGitLogCommits(raw)).toEqual([
      { sha: "aaa", subject: "subject one", body: "body" },
      { sha: "bbb", subject: "subject two", body: "" },
    ]);
  });
  it("matches later commits touching the same files to an unverified fix", () => {
    const commits = [
      {
        sha: "new",
        committedAt: "2026-02-02T00:00:00Z",
        subject: "s",
        files: ["src/auth.ts"],
      },
      {
        sha: "old",
        committedAt: "2026-01-01T00:00:00Z",
        subject: "s",
        files: ["src/auth.ts"],
      },
      {
        sha: "other",
        committedAt: "2026-02-03T00:00:00Z",
        subject: "s",
        files: ["README.md"],
      },
    ];
    expect(
      matchCommitsToUnverifiedFix({
        cardFiles: ["lib/auth.ts"],
        cardCreatedAt: "2026-02-01T00:00:00Z",
        commits,
      }),
    ).toEqual(["new"]);
  });
});

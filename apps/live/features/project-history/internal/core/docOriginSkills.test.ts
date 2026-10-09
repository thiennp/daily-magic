import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { gitBlobSha } from "./collectDocSources";
import { makeDocFolder } from "./docSkillFixtures.testutil";
import { findStaleDocSkills } from "./docOriginSkills";

describe("gitBlobSha", () => {
  it("equals git hash-object", () => {
    const text = "line one\nline two\n";
    const git = execFileSync("git", ["hash-object", "--stdin"], {
      input: text,
    })
      .toString()
      .trim();
    expect(gitBlobSha(Buffer.from(text))).toBe(git);
  });
});

describe("findStaleDocSkills", () => {
  const folder = makeDocFolder({ "docs/qa/a.md": "v1\n" });
  const sha = gitBlobSha(Buffer.from("v1\n"));
  const skill = { skillId: "a", relPath: "docs/qa/a.md", sha };

  it("reports nothing while the source is unchanged", () => {
    expect(findStaleDocSkills(folder, [skill])).toEqual([]);
  });

  it("reports a changed and a deleted source", () => {
    fs.writeFileSync(path.join(folder, "docs/qa/a.md"), "v2\n");
    expect(findStaleDocSkills(folder, [skill])).toEqual([
      { skillId: "a", relPath: "docs/qa/a.md", status: "changed" },
    ]);
    fs.rmSync(path.join(folder, "docs/qa/a.md"));
    expect(findStaleDocSkills(folder, [skill])).toEqual([
      { skillId: "a", relPath: "docs/qa/a.md", status: "deleted" },
    ]);
  });
});

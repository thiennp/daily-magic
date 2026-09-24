import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { SHOWCASE_ARTICLES } from "@/features/showcases/showcaseArticleRegistry";

const SHOWCASE_ARTICLES_DIR = join(
  process.cwd(),
  "src/features/showcases/articles",
);
const INSTRUCTION_SECTIONS = [
  join(
    process.cwd(),
    "src/lib/agentWitch/instructions/agentWitchInstructionOverviewSection.ts",
  ),
  join(
    process.cwd(),
    "src/lib/agentWitch/instructions/agentWitchInstructionTasksSection.ts",
  ),
  join(
    process.cwd(),
    "src/lib/agentWitch/instructions/agentWitchInstructionMessageTypes.constant.ts",
  ),
];
const README_PATH = join(process.cwd(), "README.md");
const SERVER_PATH = join(process.cwd(), "server.ts");

const collectShowcaseStrings = (source: string): readonly string[] => {
  const strings: string[] = [];
  const stringLiteral = /"([^"\\]|\\.)*"/g;
  for (const match of source.matchAll(stringLiteral)) {
    strings.push(match[0].slice(1, -1));
  }
  return strings;
};

/** Product philosophy — user-visible strings must not use legacy product labels. */
describe("philosophy user-facing copy", () => {
  it("README titles Agent Witch not Daily Magic as product name", () => {
    const source = readFileSync(README_PATH, "utf8");
    expect(source.startsWith("# Agent Witch")).toBe(true);
    expect(source).not.toMatch(/^# Daily Magic/m);
  });

  it("server startup logs say Agent Witch", () => {
    const source = readFileSync(SERVER_PATH, "utf8");
    expect(source).toContain("Agent Witch");
    expect(source).not.toMatch(/Daily Magic listening/);
  });

  it("showcase article strings avoid Daily Magic brand and Job history label", () => {
    const offenders: string[] = [];

    for (const name of readdirSync(SHOWCASE_ARTICLES_DIR)) {
      if (!name.endsWith(".ts")) {
        continue;
      }
      const source = readFileSync(join(SHOWCASE_ARTICLES_DIR, name), "utf8");
      for (const text of collectShowcaseStrings(source)) {
        if (/\bdaily magic\b/i.test(text)) {
          offenders.push(`${name}: daily magic in "${text.slice(0, 80)}…"`);
        }
        if (/\bJob history\b/.test(text)) {
          offenders.push(`${name}: Job history in "${text.slice(0, 80)}…"`);
        }
      }
    }

    expect(offenders).toEqual([]);
  });

  it("registry articles avoid Job history in marketing fields", () => {
    const offenders: string[] = [];
    for (const article of SHOWCASE_ARTICLES) {
      const blob = JSON.stringify({
        title: article.title,
        subtitle: article.subtitle,
        whatYouNeed: article.whatYouNeed,
        sections: article.sections,
      });
      if (blob.includes("Job history")) {
        offenders.push(article.slug);
      }
    }
    expect(offenders).toEqual([]);
  });

  it("Mac instruction copy uses Reports not Job history", () => {
    for (const path of INSTRUCTION_SECTIONS) {
      const source = readFileSync(path, "utf8");
      expect(source).not.toMatch(/\bJob history\b/);
      if (source.includes("history") || source.includes("Reports")) {
        expect(source).toContain("Reports");
      }
    }
  });
});

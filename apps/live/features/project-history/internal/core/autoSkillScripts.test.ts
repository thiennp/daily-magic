import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { generateAutoSkillDraft } from "./autoSkillDraft";
import { replayScripts } from "./autoSkillReplay";
import { buildScriptQuestionParts } from "./autoSkillScriptQuestion";
import {
  parseScriptProposals,
  splitScriptsBlock,
} from "./autoSkillScriptsBlock";
import type { AutoSkillRunRecord } from "./autoSkill.types";

const SKILL_MD = `---
name: count-lines
description: Count lines in a file
version: 0.1.0
status: draft
---
## When to use
Counting.

## Inputs
- path

## Steps
1. Run count-lines
2. Report
3. Done

## Pitfalls
- None

## Verification
- Output is a number
`;

const proposal = (over: Record<string, unknown> = {}) => ({
  name: "count-lines",
  file: "count-lines.sh",
  description: "Count lines",
  params: [{ name: "path", required: true, example: "data.txt" }],
  permissions: { write: false, network: false },
  content: '#!/bin/sh\nwc -l < "$1" | tr -d " "\n',
  ...over,
});

const modelText = (scripts: unknown): string =>
  `\`\`\`markdown\n${SKILL_MD}\`\`\`\n\n\`\`\`scripts\n${JSON.stringify(scripts)}\n\`\`\`\n`;

const runs: AutoSkillRunRecord[] = [
  {
    runId: "r1",
    prompt: "count lines",
    resultSummary: "3",
    completedAt: "2026-10-01T00:00:00Z",
    writerAgent: null,
  },
];

const dirs: string[] = [];
afterEach(() => {
  for (const d of dirs.splice(0))
    fs.rmSync(d, { recursive: true, force: true });
});

describe("scripts block", () => {
  it("splits the fenced block from the skill markdown", () => {
    const split = splitScriptsBlock(modelText([proposal()]));
    expect(split.json).toContain("count-lines.sh");
    expect(split.rest).not.toContain("```scripts");
  });

  it("accepts a valid proposal and computes sha256 per script", () => {
    const parsed = parseScriptProposals(JSON.stringify([proposal()]));
    expect(parsed?.bundle.manifest.scripts[0]?.sha256).toMatch(
      /^[0-9a-f]{64}$/,
    );
  });

  it.each([
    ["not json", "{nope"],
    ["empty list", "[]"],
    ["home path", JSON.stringify([proposal({ content: "cat /Users/me/x" })])],
    ["parent traversal", JSON.stringify([proposal({ content: "cat ../x" })])],
    [
      "undeclared network",
      JSON.stringify([proposal({ content: "curl https://x.io" })]),
    ],
    [
      "secret",
      JSON.stringify([
        proposal({ content: "KEY=sk-abcdefghijklmnopqrstuvwxyz123456" }),
      ]),
    ],
    ["bad file name", JSON.stringify([proposal({ file: "../x.sh" })])],
  ])("rejects %s (skill ships without scripts)", (_label, json) => {
    expect(parseScriptProposals(json)).toBeNull();
  });

  it("allows network tools when declared", () => {
    const ok = parseScriptProposals(
      JSON.stringify([
        proposal({
          content: "curl -s $1",
          permissions: { write: false, network: true },
        }),
      ]),
    );
    expect(ok).not.toBeNull();
  });
});

describe("draft with scripts", () => {
  it("returns the skill plus validated scripts, or the skill alone when invalid", async () => {
    const good = await generateAutoSkillDraft(runs, async () => ({
      ok: true,
      text: modelText([proposal()]),
    }));
    expect(good.ok && good.scripts?.proposals).toHaveLength(1);
    const bad = await generateAutoSkillDraft(runs, async () => ({
      ok: true,
      text: modelText("garbage"),
    }));
    expect(bad.ok).toBe(true);
    expect(bad.ok && bad.scripts).toBeUndefined();
  });
});

describe("replay before asking", () => {
  const folder = () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "replay-"));
    dirs.push(dir);
    fs.writeFileSync(path.join(dir, "data.txt"), "a\nb\nc\n");
    return dir;
  };

  it("runs a trivial script in a temp copy and reports the result", async () => {
    const dir = folder();
    const parsed = parseScriptProposals(JSON.stringify([proposal()]))!;
    const [result] = await replayScripts(parsed.proposals, dir);
    expect(result).toMatchObject({
      script: "count-lines",
      status: "ok",
      exitCode: 0,
      stdoutHead: "3\n",
    });
  });

  it("does not touch the real folder and skips network scripts", async () => {
    const dir = folder();
    const parsed = parseScriptProposals(
      JSON.stringify([
        proposal({
          name: "writer",
          file: "writer.sh",
          content: "echo x > made.txt\n",
          params: [],
          permissions: { write: true, network: false },
        }),
        proposal({
          name: "net",
          file: "net.sh",
          content: "curl -s https://x.io\n",
          params: [],
          permissions: { write: false, network: true },
        }),
      ]),
    )!;
    const results = await replayScripts(parsed.proposals, dir);
    expect(results.map((r) => r.status)).toEqual(["ok", "not_replayed"]);
    expect(results[1]?.note).toBe("needs network");
    expect(fs.existsSync(path.join(dir, "made.txt"))).toBe(false);
  });

  it("marks everything not replayed without a folder", async () => {
    const parsed = parseScriptProposals(JSON.stringify([proposal()]))!;
    const [result] = await replayScripts(parsed.proposals, undefined);
    expect(result).toMatchObject({
      status: "not_replayed",
      note: "no project folder",
    });
  });

  it("builds the question payload: bundle embedded, permissions and replay attached", async () => {
    const dir = folder();
    const draft = await generateAutoSkillDraft(runs, async () => ({
      ok: true,
      text: modelText([proposal()]),
    }));
    if (!draft.ok) throw new Error(draft.reason);
    const parts = await buildScriptQuestionParts(draft, dir);
    expect(parts.draftBody).toContain("agent-witch-skill-bundle");
    expect(parts.scriptInfo?.scripts[0]).toMatchObject({
      name: "count-lines",
      permissions: { write: false, network: false },
      replay: { status: "ok", exitCode: 0 },
    });
  });
});

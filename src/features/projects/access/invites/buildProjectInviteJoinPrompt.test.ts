import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { buildProjectInviteAgentPrompt } from "@/features/projects/access/invites/buildProjectInviteAgentPrompt";
import { buildProjectInviteJoinPrompt } from "@/features/projects/access/invites/buildProjectInviteJoinPrompt";
import { buildProjectInviteJoinWakeWebhookStep } from "@/features/projects/access/invites/buildProjectInviteJoinWakeWebhookStep";

const DIR = join(process.cwd(), "src/features/projects/access/invites");
const NL = String.fromCharCode(10);

describe("join orchestrator", () => {
  it("is what callers of buildProjectInviteAgentPrompt get", () => {
    expect(buildProjectInviteAgentPrompt).toBe(buildProjectInviteJoinPrompt);
  });

  it("emits goal then steps 1-9 in order, blank line between, project line last", () => {
    const prompt = buildProjectInviteJoinPrompt({
      inviteUrl: "https://example.com/invite/p/tok-xyz",
      projectId: "proj-1",
      projectName: "Demo",
    });
    const lines = prompt.split(NL);
    expect(lines[0]).toBe(
      "Goal: join this Agent Witch project via invite redeem.",
    );
    const headings = lines
      .filter((line) => /^\d\. /.test(line))
      .map((l) => l[0]);
    expect(headings).toEqual(["1", "2", "3", "4", "5", "6", "7", "8", "9"]);
    lines.forEach((line, i) => {
      if (/^\d\. /.test(line)) expect(lines[i - 1]).toBe("");
    });
    expect(lines.at(-1)).toBe("Project: Demo (proj-1)");
    expect(prompt).toContain(buildProjectInviteJoinWakeWebhookStep().join(NL));
  });

  it("falls back without a token", () => {
    expect(
      buildProjectInviteJoinPrompt({ inviteUrl: "not a url", projectId: "p" }),
    ).toBe(
      [
        "Join this Agent Witch project via invite redeem.",
        "Could not parse invite token from the URL — ask the owner to create a new invite and Copy prompt again.",
        "Project id: p",
      ].join(NL),
    );
  });

  it("has one exported function per join step file", () => {
    const files = readdirSync(DIR).filter(
      (f) => /ProjectInviteJoin.*\.ts$/.test(f) && !f.endsWith(".test.ts"),
    );
    expect(files.length).toBeGreaterThanOrEqual(11);
    for (const file of files) {
      const src = readFileSync(join(DIR, file), "utf8");
      expect(src.match(/^export const /gm), file).toHaveLength(1);
    }
  });

  it("orchestrator and step builders stay pure (no env, clock, or DB)", () => {
    const files = readdirSync(DIR).filter(
      (f) => /ProjectInviteJoin.*\.ts$/.test(f) && !f.endsWith(".test.ts"),
    );
    for (const file of files) {
      const src = readFileSync(join(DIR, file), "utf8");
      expect(src, file).not.toMatch(
        /process\.env|Date\.now|new Date|getSql|@\/lib\/db|fetch\(/,
      );
    }
  });

  it("keeps the wake/webhook step copy-only (no runtime wake imports)", () => {
    const src = readFileSync(
      join(DIR, "buildProjectInviteJoinWakeWebhookStep.ts"),
      "utf8",
    );
    expect(src).not.toMatch(
      /messaging|wakeProject|insertProjectMessage|fetch\(/,
    );
  });
});

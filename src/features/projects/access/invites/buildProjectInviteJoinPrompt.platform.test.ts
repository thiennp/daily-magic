import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { buildProjectInviteJoinMuseWebhookStep } from "@/features/projects/access/invites/buildProjectInviteJoinMuseWebhookStep";
import { buildProjectInviteJoinPrompt } from "@/features/projects/access/invites/buildProjectInviteJoinPrompt";
import { buildProjectInviteJoinWakeWebhookStep } from "@/features/projects/access/invites/buildProjectInviteJoinWakeWebhookStep";

const NL = String.fromCharCode(10);
const INPUT = {
  inviteUrl: "https://www.agentwitch.com/invite/p/tok-snapshot-123",
  token: "tok-snapshot-123",
  projectId: "proj-snapshot",
  projectName: "Snapshot Project",
} as const;
/** Regenerated with invite wake-routine-onboarding join copy; regenerate when shared join copy changes. */
const GROK_MAIN = readFileSync(
  join(
    process.cwd(),
    "src/features/projects/access/invites/__fixtures__/buildProjectInviteJoinPrompt.grok.main.txt",
  ),
  "utf8",
);

describe("join orchestrator per platform", () => {
  it("Grok prompt is byte-identical to main (default and explicit)", () => {
    expect(buildProjectInviteJoinPrompt(INPUT)).toBe(GROK_MAIN);
    expect(buildProjectInviteJoinPrompt({ ...INPUT, platform: "grok" })).toBe(
      GROK_MAIN,
    );
  });

  it("Muse prompt differs from Grok only in step 7", () => {
    const muse = buildProjectInviteJoinPrompt({ ...INPUT, platform: "muse" });
    const grokStep = buildProjectInviteJoinWakeWebhookStep().join(NL);
    const museStep = buildProjectInviteJoinMuseWebhookStep().join(NL);
    expect(muse).toContain(museStep);
    expect(muse).not.toContain(grokStep);
    expect(muse).toBe(GROK_MAIN.replace(grokStep, museStep));
  });

  it("Muse prompt keeps the shared redeem, dispatch and ack copy", () => {
    const muse = buildProjectInviteJoinPrompt({ ...INPUT, platform: "muse" });
    expect(muse).toContain('{ "token": "tok-snapshot-123"');
    expect(muse).toContain("project_dispatch");
    expect(muse).toContain("ack_project_message");
    const headings = muse
      .split(NL)
      .filter((line) => /^\d\. /.test(line))
      .map((line) => line[0]);
    expect(headings).toEqual(["1", "2", "3", "4", "5", "6", "7", "8", "9"]);
  });

  it("both platforms use the same fallback without a token", () => {
    const input = { inviteUrl: "not a url", projectId: "p" };
    expect(buildProjectInviteJoinPrompt({ ...input, platform: "muse" })).toBe(
      buildProjectInviteJoinPrompt(input),
    );
  });
});

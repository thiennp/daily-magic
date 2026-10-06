import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { buildProjectInviteAgentPrompt } from "@/features/projects/access/invites/buildProjectInviteAgentPrompt";
import { buildProjectInviteShortPrompt } from "@/features/projects/access/invites/buildProjectInviteShortPrompt";

const NL = String.fromCharCode(10);
const TOKEN = "tok-snapshot-123";
const URL = `https://www.agentwitch.com/join/${TOKEN}`;

/** Locked EN (COPY.md S0c v2 FINAL). */
const SHORT_WITH_NAME = `Join my AgentWitch project "Snapshot Project": read ${URL} and follow it. Start with the terms, and tell me when you're waiting for my approval.`;

describe("short Copy prompt", () => {
  it("is the locked one-liner with the project name and /join URL", () => {
    const prompt = buildProjectInviteShortPrompt({
      token: TOKEN,
      projectName: "Snapshot Project",
    });
    expect(prompt).toBe(SHORT_WITH_NAME);
    expect(prompt).toContain(URL);
    expect(prompt.split(NL).length).toBeLessThanOrEqual(3);
  });

  it('drops ` "{projectName}"` when the name is missing', () => {
    expect(
      buildProjectInviteShortPrompt({ token: TOKEN, projectName: null }),
    ).toBe(
      `Join my AgentWitch project: read ${URL} and follow it. Start with the terms, and tell me when you're waiting for my approval.`,
    );
    expect(
      buildProjectInviteShortPrompt({ token: TOKEN, projectName: "  " }),
    ).not.toContain('""');
  });

  it("stays at most 3 lines even when the project name has line breaks", () => {
    const prompt = buildProjectInviteShortPrompt({
      token: TOKEN,
      projectName: `Multi${NL}line${NL}${NL}name`,
    });
    expect(prompt.split(NL).length).toBeLessThanOrEqual(3);
    expect(prompt).toContain('"Multi line name"');
  });

  it("carries only the invite code — no bearer or project key", () => {
    const prompt = buildProjectInviteShortPrompt({
      token: TOKEN,
      projectName: "P",
    });
    expect(prompt).not.toMatch(/\b(aw_|awc_proj_|awc_atr_|awc_whsec_)/);
    expect(prompt).not.toMatch(/bearer/i);
  });
});

describe("fallback full prompt (Assistant can't open links? Copy full prompt)", () => {
  it("is unchanged — byte-identical to the main snapshot", () => {
    const fixture = readFileSync(
      join(
        process.cwd(),
        "src/features/projects/access/invites/__fixtures__/buildProjectInviteJoinPrompt.grok.main.txt",
      ),
      "utf8",
    );
    expect(
      buildProjectInviteAgentPrompt({
        inviteUrl: `https://www.agentwitch.com/invite/p/${TOKEN}`,
        token: TOKEN,
        projectId: "proj-snapshot",
        projectName: "Snapshot Project",
      }),
    ).toBe(fixture);
  });
});

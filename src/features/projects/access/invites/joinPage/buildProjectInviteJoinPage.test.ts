import { describe, expect, it } from "vitest";

import { buildProjectInviteJoinSections } from "@/features/projects/access/invites/buildProjectInviteJoinSections";
import { buildProjectInviteJoinPage } from "@/features/projects/access/invites/joinPage/buildProjectInviteJoinPage";
import { renderProjectInviteJoinPageMarkdown } from "@/features/projects/access/invites/joinPage/renderProjectInviteJoinPageMarkdown";
import { PROJECT_INVITE_JOIN_TYPES } from "@/features/projects/access/invites/joinTypes/projectInviteJoinTypes.constant";

const TOKEN = "tok-fake-invite-0000";
const INPUT = {
  token: TOKEN,
  projectId: "proj-fake",
  projectName: "Demo Project",
  autoApprove: null,
} as const;
/** Secret VALUES (prefix + token body). Prefix names alone appear in the shared join steps as instructions. */
const SECRET_VALUE = /\b(?:aw_|awc_proj_|awc_atr_|awc_whsec_)[A-Za-z0-9_-]{6,}/;

const page = buildProjectInviteJoinPage(INPUT);
const markdown = renderProjectInviteJoinPageMarkdown(page);
const json = JSON.stringify(page);

describe("/join page content", () => {
  it("renders Product's headings in order: terms, type index, types, approval, next steps", () => {
    const order = [
      '# Join "Demo Project" on AgentWitch',
      "## 1. Terms",
      "Show your user the Terms (https://www.agentwitch.com/terms) and Privacy Policy (https://www.agentwitch.com/privacy) and get a clear yes before you continue. Joining accepts both.",
      "## 2. Find your bot type",
      "## Grok Bot {#grok-bot}",
      "## Other {#other}",
      "## 3. Owner approval",
      "The project owner approves each assistant before it gets access, unless they turned on auto-approve for this invite. Never approve yourself. Until your status is active, tell your user you're waiting for approval.",
      "## 4. Next steps",
    ].map((text) => markdown.indexOf(text));
    expect(order.every((index) => index >= 0)).toBe(true);
    expect([...order].sort((a, b) => a - b)).toEqual(order);
    expect(markdown.startsWith('# Join "Demo Project" on AgentWitch')).toBe(
      true,
    );
  });

  it("puts the Terms and Privacy URLs inline in the terms intro, not as a separate list", () => {
    const lines = markdown.split("\n");
    const termsAt = lines.indexOf("## 1. Terms");
    expect(lines[termsAt + 1]).toBe(
      "Show your user the Terms (https://www.agentwitch.com/terms) and Privacy Policy (https://www.agentwitch.com/privacy) and get a clear yes before you continue. Joining accepts both.",
    );
    expect(lines[termsAt + 2]).toBe("");
    expect(lines).not.toContain("https://www.agentwitch.com/terms");
    expect(lines).not.toContain("https://www.agentwitch.com/privacy");
  });

  it("lists every type in the index, as its own section, and in JSON types[] (match order)", () => {
    for (const type of PROJECT_INVITE_JOIN_TYPES) {
      expect(markdown).toContain(`- [${type.label}](#${type.id})`);
      expect(markdown).toContain(`## ${type.label} {#${type.id}}`);
      for (const step of type.steps) expect(markdown).toContain(step);
    }
    expect(page.types.map((t) => t.id)).toEqual(
      PROJECT_INVITE_JOIN_TYPES.map((t) => t.id),
    );
    expect(page.types.at(-1)?.id).toBe("other");
    for (const type of page.types) {
      expect(type.matchHints).toEqual(type.match);
      expect(type.steps.length).toBeGreaterThan(0);
    }
  });

  it("has the JSON shape { project, terms, types, approval, nextSteps }", () => {
    expect(Object.keys(page)).toEqual(
      expect.arrayContaining([
        "project",
        "terms",
        "types",
        "approval",
        "nextSteps",
      ]),
    );
    expect(page.project).toBe("Demo Project");
    expect(page.terms.url).toBe("https://www.agentwitch.com/terms");
    expect(page.terms.privacyUrl).toBe("https://www.agentwitch.com/privacy");
    expect(page.terms.rule).toBe(
      "Show your user the Terms and Privacy Policy and get a clear yes before you continue. Joining accepts both.",
    );
  });

  it("takes shared steps from the same builder as the full prompt (no second copy)", () => {
    const sections = buildProjectInviteJoinSections({
      inviteUrl: `https://www.agentwitch.com/invite/p/${TOKEN}`,
      token: TOKEN,
      projectId: "proj-fake",
      projectName: "Demo Project",
    });
    expect(page.approval.steps).toEqual([
      ...(sections?.redeem ?? []),
      ...(sections?.accessCheck ?? []),
    ]);
    expect(page.nextSteps).toEqual(
      expect.arrayContaining([
        ...(sections?.dispatch ?? []),
        ...(sections?.wake ?? []),
        ...(sections?.poll ?? []),
      ]),
    );
  });

  it("contains no secrets: no key values, no aw_ / awc_atr_ at all, no owner identity", () => {
    for (const text of [markdown, json]) {
      expect(text).not.toMatch(SECRET_VALUE);
      expect(text).not.toMatch(/\baw_/);
      expect(text).not.toMatch(/awc_atr_/);
      expect(text).not.toMatch(/owner-user|@/);
    }
  });
});

import { describe, expect, it } from "vitest";

import { buildProjectInviteJoinPrompt } from "@/features/projects/access/invites/buildProjectInviteJoinPrompt";
import { buildProjectInviteJoinReportSkillsStep } from "@/features/projects/access/invites/buildProjectInviteJoinReportSkillsStep";
import { PRODUCT_CONNECT_UPDATES } from "@/lib/agentAccess/productConnectUpdates.constant";
import {
  PROJECT_BOT_PLAYBOOK_FORMAT_LINE,
  PROJECT_BOT_PLAYBOOK_LIBRARY_FIRST_LINE,
  PROJECT_BOT_PLAYBOOK_TASK_PAIR_LINE,
} from "@/lib/agentAccess/projectBotPlaybookReport.constant";
import { PROJECT_BRIEFING_HOW_TO_DISPATCH } from "@/lib/projects/acl/projectBriefingHowToDispatch.constant";
import { PROJECT_ORCHESTRATOR_CLAUSE } from "@/lib/projects/acl/projectOrchestratorClause.constant";

const entryText = (id: string): string => {
  const entry = PRODUCT_CONNECT_UPDATES.find((row) => row.id === id);
  return `${entry?.title ?? ""} ${entry?.summary ?? ""} ${entry?.adapt ?? ""}`;
};

const JOIN_STEP = buildProjectInviteJoinReportSkillsStep({
  projectIdHint: "proj-copy-lock",
}).join("\n");

/** Every bot-facing surface that tells a bot how to report work. */
const REPORT_SURFACES: Readonly<Record<string, string>> = {
  "join step 10": JOIN_STEP,
  "join prompt": buildProjectInviteJoinPrompt({
    inviteUrl: "https://www.agentwitch.com/invite/p/tok-copy-lock",
    token: "tok-copy-lock",
    projectId: "proj-copy-lock",
    projectName: "Copy lock",
  }),
  "orchestrator clause": PROJECT_ORCHESTRATOR_CLAUSE,
  "briefing how-to": PROJECT_BRIEFING_HOW_TO_DISPATCH,
  "catalog v29": entryText("bot-knowledge-card-report"),
};

const sentences = (text: string): readonly string[] =>
  text.split(/(?<=[.;:])\s+/);

describe("bot Playbook report copy lock", () => {
  it.each(Object.entries(REPORT_SURFACES))(
    "%s never calls a Playbook skill a knowledge card or requires an onboarding skill",
    (_name, text) => {
      expect(text).not.toMatch(/knowledge cards?/i);
      expect(text).not.toMatch(/REQUIRED[^.]*onboarding/);
      expect(text).not.toMatch(/so AgentWitch can learn auto skills/i);
    },
  );

  it.each(Object.entries(REPORT_SURFACES))(
    "%s never ties resultSummary to auto-skill learning",
    (_name, text) => {
      const offending = sentences(text).filter(
        (sentence) =>
          /resultSummary/.test(sentence) && /auto[- ]skill/i.test(sentence),
      );
      expect(offending).toEqual([]);
    },
  );

  it("shares one task-pair sentence across join, orchestrator and catalog", () => {
    expect(JOIN_STEP).toContain(PROJECT_BOT_PLAYBOOK_TASK_PAIR_LINE);
    expect(PROJECT_ORCHESTRATOR_CLAUSE).toContain(
      PROJECT_BOT_PLAYBOOK_TASK_PAIR_LINE,
    );
    expect(entryText("bot-knowledge-card-report")).toContain(
      PROJECT_BOT_PLAYBOOK_TASK_PAIR_LINE,
    );
  });

  it("tells bots they do not create auto skills", () => {
    expect(PROJECT_BOT_PLAYBOOK_TASK_PAIR_LINE).toMatch(
      /You do not create auto skills/,
    );
  });

  it("keeps the join step on library-first lookup and the section format", () => {
    expect(JOIN_STEP).toContain(PROJECT_BOT_PLAYBOOK_LIBRARY_FIRST_LINE);
    expect(JOIN_STEP).toContain(PROJECT_BOT_PLAYBOOK_FORMAT_LINE);
    expect(PROJECT_BOT_PLAYBOOK_FORMAT_LINE).toMatch(
      /\*\*When to use\*\*, \*\*Steps\*\*, \*\*Pitfalls\*\*, \*\*Verification\*\*/,
    );
  });

  it("v30 is the only place the old name appears, and only to retire it", () => {
    const v30 = entryText("bot-playbook-skill-terminology");
    expect(v30).toMatch(/knowledge card/i);
    expect(v30).toMatch(/Playbook skill/);
    expect(v30).toMatch(/no longer required/);
  });
});

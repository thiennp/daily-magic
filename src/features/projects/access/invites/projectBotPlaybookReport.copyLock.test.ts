import { describe, expect, it } from "vitest";

import { buildProjectInviteJoinPrompt } from "@/features/projects/access/invites/buildProjectInviteJoinPrompt";
import { buildProjectInviteJoinReportSkillsStep } from "@/features/projects/access/invites/buildProjectInviteJoinReportSkillsStep";
import { PRODUCT_CONNECT_UPDATES } from "@/lib/agentAccess/productConnectUpdates.constant";
import {
  PROJECT_BOT_PLAYBOOK_FORMAT_LINE,
  PROJECT_BOT_PLAYBOOK_LIBRARY_FIRST_LINE,
  PROJECT_BOT_PLAYBOOK_RETIRED_TERMS_NOTE,
  PROJECT_BOT_PLAYBOOK_TASK_PAIR_LINE,
} from "@/lib/agentAccess/projectBotPlaybookReport.constant";
import { PROJECT_BRIEFING_HOW_TO_DISPATCH } from "@/lib/projects/acl/projectBriefingHowToDispatch.constant";
import { PROJECT_ORCHESTRATOR_CLAUSE } from "@/lib/projects/acl/projectOrchestratorClause.constant";

const CATALOG_ENTRY_ID = "bot-playbook-skill-report";

/** The catalog entry minus its one-time note about retired wording. */
const catalogText = (): string => {
  const entry = PRODUCT_CONNECT_UPDATES.find(
    (row) => row.id === CATALOG_ENTRY_ID,
  );
  return `${entry?.title ?? ""} ${entry?.summary ?? ""} ${entry?.adapt ?? ""}`
    .replace(PROJECT_BOT_PLAYBOOK_RETIRED_TERMS_NOTE, "")
    .trim();
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
  catalog: catalogText(),
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
    expect(catalogText()).toContain(PROJECT_BOT_PLAYBOOK_TASK_PAIR_LINE);
  });

  it.each(Object.entries(REPORT_SURFACES))(
    "%s never tells a bot to read the whole library",
    (_name, text) => {
      expect(text).not.toMatch(
        /list_project_skills(,| and) (then )?get_project_skill/,
      );
    },
  );

  it("library lookup has two lanes: skills_find first, list with a query otherwise", () => {
    expect(PROJECT_BOT_PLAYBOOK_LIBRARY_FIRST_LINE).toMatch(/skills_find/);
    expect(PROJECT_BOT_PLAYBOOK_LIBRARY_FIRST_LINE).toMatch(
      /only if you do not have it, or it answers unavailable/,
    );
    expect(PROJECT_BOT_PLAYBOOK_LIBRARY_FIRST_LINE).toMatch(
      /list_project_skills \{ projectId, query:/,
    );
    expect(PROJECT_BOT_PLAYBOOK_LIBRARY_FIRST_LINE).toMatch(
      /never the whole library/,
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

  it("the catalog entry names the retired wording once, to retire it", () => {
    const entry = PRODUCT_CONNECT_UPDATES.find(
      (row) => row.id === CATALOG_ENTRY_ID,
    );
    expect(entry?.adapt).toContain(PROJECT_BOT_PLAYBOOK_RETIRED_TERMS_NOTE);
    expect(PROJECT_BOT_PLAYBOOK_RETIRED_TERMS_NOTE).toMatch(/knowledge cards/);
    expect(PROJECT_BOT_PLAYBOOK_RETIRED_TERMS_NOTE).toMatch(
      /do not publish another/,
    );
  });
});

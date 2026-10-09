import { describe, expect, it } from "vitest";

import {
  CATALOG_ENTRY_ID,
  catalogText,
  JOIN_STEP,
  REPORT_SURFACES,
} from "@/features/projects/access/invites/projectBotPlaybookReport.surfaces.testutil";
import { PRODUCT_CONNECT_UPDATES } from "@/lib/agentAccess/productConnectUpdates.constant";
import {
  PROJECT_BOT_PLAYBOOK_FORMAT_LINE,
  PROJECT_BOT_PLAYBOOK_LIBRARY_FIRST_LINE,
  PROJECT_BOT_PLAYBOOK_RETIRED_TERMS_NOTE,
  PROJECT_BOT_PLAYBOOK_TASK_PAIR_LINE,
} from "@/lib/agentAccess/projectBotPlaybookReport.constant";
import { PROJECT_BRIEFING_HOW_TO_DISPATCH_POLL } from "@/lib/projects/acl/projectBriefingPollDelivery.constant";
import { PROJECT_ORCHESTRATOR_CLAUSE } from "@/lib/projects/acl/projectOrchestratorClause.constant";

describe("bot Playbook report copy lock: required rules", () => {
  it("shares one task-pair sentence across join, orchestrator and catalog", () => {
    expect(JOIN_STEP).toContain(PROJECT_BOT_PLAYBOOK_TASK_PAIR_LINE);
    expect(PROJECT_ORCHESTRATOR_CLAUSE).toContain(
      PROJECT_BOT_PLAYBOOK_TASK_PAIR_LINE,
    );
    expect(catalogText()).toContain(PROJECT_BOT_PLAYBOOK_TASK_PAIR_LINE);
  });

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

  it("the poll briefing and the agent guideline carry the lookup and report rules", () => {
    for (const text of [
      PROJECT_BRIEFING_HOW_TO_DISPATCH_POLL,
      REPORT_SURFACES["agent guideline"] ?? "",
    ]) {
      expect(text).toContain(PROJECT_BOT_PLAYBOOK_LIBRARY_FIRST_LINE);
    }
    expect(PROJECT_BRIEFING_HOW_TO_DISPATCH_POLL).toContain(
      PROJECT_BOT_PLAYBOOK_TASK_PAIR_LINE,
    );
    expect(REPORT_SURFACES["agent guideline"]).toContain(
      PROJECT_BOT_PLAYBOOK_FORMAT_LINE,
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

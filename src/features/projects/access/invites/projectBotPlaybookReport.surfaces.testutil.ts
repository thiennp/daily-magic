import { buildProjectInviteJoinPrompt } from "@/features/projects/access/invites/buildProjectInviteJoinPrompt";
import { buildProjectInviteJoinReportSkillsStep } from "@/features/projects/access/invites/buildProjectInviteJoinReportSkillsStep";
import { PRODUCT_CONNECT_UPDATES } from "@/lib/agentAccess/productConnectUpdates.constant";
import { PROJECT_BOT_PLAYBOOK_RETIRED_TERMS_NOTE } from "@/lib/agentAccess/projectBotPlaybookReport.constant";
import { buildProjectAclAgentGuidelineSection } from "@/lib/agentAccess/buildProjectAclAgentGuidelineSection";
import { PROJECT_BRIEFING_HOW_TO_DISPATCH } from "@/lib/projects/acl/projectBriefingHowToDispatch.constant";
import { PROJECT_BRIEFING_HOW_TO_DISPATCH_POLL } from "@/lib/projects/acl/projectBriefingPollDelivery.constant";
import { PROJECT_ORCHESTRATOR_CLAUSE } from "@/lib/projects/acl/projectOrchestratorClause.constant";

export const CATALOG_ENTRY_ID = "bot-playbook-skill-report";

/** The catalog entry minus its one-time note about retired wording. */
export const catalogText = (): string => {
  const entry = PRODUCT_CONNECT_UPDATES.find(
    (row) => row.id === CATALOG_ENTRY_ID,
  );
  return `${entry?.title ?? ""} ${entry?.summary ?? ""} ${entry?.adapt ?? ""}`
    .replace(PROJECT_BOT_PLAYBOOK_RETIRED_TERMS_NOTE, "")
    .trim();
};

export const JOIN_STEP = buildProjectInviteJoinReportSkillsStep({
  projectIdHint: "proj-copy-lock",
}).join("\n");

/** Every bot-facing surface that tells a bot how to report work. */
export const REPORT_SURFACES: Readonly<Record<string, string>> = {
  "join step 10": JOIN_STEP,
  "join prompt": buildProjectInviteJoinPrompt({
    inviteUrl: "https://www.agentwitch.com/invite/p/tok-copy-lock",
    token: "tok-copy-lock",
    projectId: "proj-copy-lock",
    projectName: "Copy lock",
  }),
  "orchestrator clause": PROJECT_ORCHESTRATOR_CLAUSE,
  "briefing how-to": PROJECT_BRIEFING_HOW_TO_DISPATCH,
  "poll briefing": PROJECT_BRIEFING_HOW_TO_DISPATCH_POLL,
  "agent guideline": buildProjectAclAgentGuidelineSection().body.join("\n"),
  "every older catalog entry": PRODUCT_CONNECT_UPDATES.filter(
    (row) => row.id !== CATALOG_ENTRY_ID,
  )
    .map((row) => `${row.summary} ${row.adapt ?? ""}`)
    .join("\n"),
  catalog: catalogText(),
};

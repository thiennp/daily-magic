import { buildAgentAccessUrls } from "@/lib/agentAccess/buildAgentAccessUrls";
import { buildProjectInviteJoinAccessCheckStep } from "@/features/projects/access/invites/buildProjectInviteJoinAccessCheckStep";
import { buildProjectInviteJoinBriefingPeersStep } from "@/features/projects/access/invites/buildProjectInviteJoinBriefingPeersStep";
import { buildProjectInviteJoinConnectStep } from "@/features/projects/access/invites/buildProjectInviteJoinConnectStep";
import { buildProjectInviteJoinDispatchStep } from "@/features/projects/access/invites/buildProjectInviteJoinDispatchStep";
import { buildProjectInviteJoinLocalFirstStep } from "@/features/projects/access/invites/buildProjectInviteJoinLocalFirstStep";
import { buildProjectInviteJoinLeaveStep } from "@/features/projects/access/invites/buildProjectInviteJoinLeaveStep";
import { buildProjectInviteJoinReportSkillsStep } from "@/features/projects/access/invites/buildProjectInviteJoinReportSkillsStep";
import { buildProjectInviteJoinPollStep } from "@/features/projects/access/invites/buildProjectInviteJoinPollStep";
import { buildProjectInviteJoinProjectLine } from "@/features/projects/access/invites/buildProjectInviteJoinProjectLine";
import { buildProjectInviteJoinRedeemStep } from "@/features/projects/access/invites/buildProjectInviteJoinRedeemStep";
import type { ProjectInvitePlatform } from "@/features/projects/access/invites/projectInvitePlatform.type";
import { resolveProjectInviteJoinToken } from "@/features/projects/access/invites/resolveProjectInviteJoinToken";
import { selectProjectInviteJoinWakeStep } from "@/features/projects/access/invites/selectProjectInviteJoinWakeStep";
import { PROJECT_ORCHESTRATOR_CLAUSE } from "@/lib/projects/acl/projectOrchestratorClause.constant";
import { PROJECT_TASKS_FIRST_CLAUSE } from "@/lib/projects/acl/projectTasksFirstClause.constant";

/** Static join text (no input, not reused elsewhere): kept inline. */
const GOAL_LINES: readonly string[] = [
  "Goal: join this AgentWitch project via invite redeem.",
];

/** Step 5 — human summary before further work. */
const SUMMARY_LINES: readonly string[] = [
  "5. BEFORE any further work: print a clear human summary to your user covering project name, folder/repo refs, your nickname (self), peer nicknames (projectDisplayName) and teamLabels, and how to work on this project.",
  "   In that summary (or next line): say you can connect with peer bots to send/receive work via project_dispatch preferring toMembershipId from list_project_peers (else toProjectDisplayName).",
  `   REQUIRED from now on — ${PROJECT_TASKS_FIRST_CLAUSE}`,
  `   ${PROJECT_ORCHESTRATOR_CLAUSE}`,
];

/** Step 9 — check_product_updates. */
const PRODUCT_UPDATES_LINES: readonly string[] = [
  "9. Product updates — after connect / post-Approve summary, and periodically while active:",
  '   Call check_product_updates { "sinceCatalogVersion": <lastSeen or 0> }.',
  "   Start with sinceCatalogVersion 0 after join; afterwards pass the last catalogVersion you stored.",
  "   Response includes catalogVersion, entries[], tools[], connect, and adaptHint.",
  "   When hasUpdates (catalog advances): adapt behavior from entries[].adapt, tools, connect, and adaptHint; tell your user briefly that the product catalog advanced.",
  "   Ignore deprecated catalog id local-wake-receiver (cloudflared installer). Non–Grok Bot inbox delivery is poll-only — follow step 7.",
  "   Store returned catalogVersion for the next call. check_product_updates is catalog-wide — use agent-access Bearer (required/preferred); awc_proj_ alone 401s. Dual-auth: awc_proj_ OK only for project-scoped tools listed in step 4c; prefer agent-access for register_project_webhook and ack_project_message.",
];

export type ProjectInviteJoinPromptInput = {
  readonly inviteUrl: string;
  readonly token?: string | null;
  readonly projectId?: string;
  readonly projectName?: string | null;
  /** Picks step 7 only (wake/webhook). Default grok. */
  readonly platform?: ProjectInvitePlatform;
};

/** Every join step as its own block. Single source for the full Copy prompt and the /join page. */
export type ProjectInviteJoinSections = {
  readonly goal: readonly string[];
  readonly connect: readonly string[];
  readonly redeem: readonly string[];
  /** "Check this project first" — right after redeem, same for every type. */
  readonly localFirst: readonly string[];
  readonly accessCheck: readonly string[];
  readonly briefingPeers: readonly string[];
  readonly summary: readonly string[];
  readonly dispatch: readonly string[];
  /** Step 7 for the input platform (Grok routine wake by default). */
  readonly wake: readonly string[];
  /** Step 7 variant for assistants without a wake link (Checks on demand). Not in the full prompt. */
  readonly poll: readonly string[];
  readonly leave: readonly string[];
  readonly productUpdates: readonly string[];
  /** Step 10 — report work + reuse skills (local rule, or direct report). */
  readonly reportSkills: readonly string[];
  readonly projectLine: string | null;
};

/**
 * Builds every join step block once. Returns null when no invite token can be
 * resolved (callers fall back). Pure: no env, clock, or DB reads; copy only.
 */
export const buildProjectInviteJoinSections = (
  input: ProjectInviteJoinPromptInput,
): ProjectInviteJoinSections | null => {
  const token = resolveProjectInviteJoinToken(input);
  if (!token) {
    return null;
  }
  const projectIdHint =
    input.projectId?.trim() || "<projectId from redeem response>";
  return {
    goal: GOAL_LINES,
    connect: buildProjectInviteJoinConnectStep({
      urls: buildAgentAccessUrls(),
    }),
    redeem: buildProjectInviteJoinRedeemStep({ token }),
    localFirst: buildProjectInviteJoinLocalFirstStep(),
    accessCheck: buildProjectInviteJoinAccessCheckStep({ projectIdHint }),
    briefingPeers: buildProjectInviteJoinBriefingPeersStep({ projectIdHint }),
    summary: SUMMARY_LINES,
    dispatch: buildProjectInviteJoinDispatchStep({ projectIdHint }),
    wake: selectProjectInviteJoinWakeStep(input.platform ?? "grok")(),
    poll: buildProjectInviteJoinPollStep(),
    leave: buildProjectInviteJoinLeaveStep({ projectIdHint }),
    productUpdates: PRODUCT_UPDATES_LINES,
    reportSkills: buildProjectInviteJoinReportSkillsStep({ projectIdHint }),
    projectLine: buildProjectInviteJoinProjectLine(input),
  };
};

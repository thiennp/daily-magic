import { buildAgentAccessUrls } from "@/lib/agentAccess/buildAgentAccessUrls";
import { buildProjectInviteUrl } from "@/lib/projects/acl/invites/buildProjectInviteUrl";
import { buildProjectInviteJoinLocalFirstStep } from "@/features/projects/access/invites/buildProjectInviteJoinLocalFirstStep";
import { buildProjectInviteJoinSections } from "@/features/projects/access/invites/buildProjectInviteJoinSections";
import { buildProjectInviteJoinPollTypeSteps } from "@/features/projects/access/invites/joinPage/buildProjectInviteJoinPollTypeSteps";
import {
  PROJECT_INVITE_JOIN_PAGE_COPY as COPY,
  PROJECT_INVITE_JOIN_POLL_LIMIT_PER_MINUTE,
} from "@/features/projects/access/invites/joinPage/projectInviteJoinPageCopy.constant";
import type {
  ProjectInviteJoinPage,
  ProjectInviteJoinPageType,
} from "@/features/projects/access/invites/joinPage/projectInviteJoinPage.type";
import { PROJECT_INVITE_JOIN_TYPES } from "@/features/projects/access/invites/joinTypes/public-api/types";
import type { ProjectInviteJoinType } from "@/features/projects/access/invites/joinTypes/public-api/types";

export type BuildProjectInviteJoinPageInput = {
  readonly token: string;
  readonly projectId: string;
  readonly projectName: string | null;
  readonly autoApprove: boolean | null;
  /** Override for tests; defaults to the registry in match order. */
  readonly types?: readonly ProjectInviteJoinType[];
};

/** "Check this project first" as one types[] step (nested list in markdown), last in every type. */
const LOCAL_FIRST_TYPE_STEP = buildProjectInviteJoinLocalFirstStep().join(
  String.fromCharCode(10),
);

const toPageType = (
  type: ProjectInviteJoinType,
): ProjectInviteJoinPageType => ({
  id: type.id,
  label: type.label,
  match: type.match,
  matchHints: type.match,
  deliveryMode: type.deliveryMode,
  connectPath: type.connectPath,
  steps: [
    ...type.steps,
    ...buildProjectInviteJoinPollTypeSteps(type),
    LOCAL_FIRST_TYPE_STEP,
  ],
  ...(type.note ? { note: type.note } : {}),
});

/**
 * Public /join page content (JSON shape; markdown renders the same object).
 * Shared steps come from buildProjectInviteJoinSections — the same builder as
 * the full Copy prompt. Per-type steps come from the joinTypes registry.
 * Never includes a bearer, a project key, or owner identity.
 */
export const buildProjectInviteJoinPage = (
  input: BuildProjectInviteJoinPageInput,
): ProjectInviteJoinPage => {
  const sections = buildProjectInviteJoinSections({
    inviteUrl: buildProjectInviteUrl(input.token),
    token: input.token,
    projectId: input.projectId,
    projectName: input.projectName,
    platform: "grok",
  });
  if (!sections) {
    throw new Error("buildProjectInviteJoinPage: invite token is required");
  }
  const { origin } = buildAgentAccessUrls();
  const autoApprove =
    input.autoApprove === null
      ? {}
      : {
          autoApprove: input.autoApprove,
          autoApproveLine: input.autoApprove
            ? COPY.autoApproveOn
            : COPY.autoApproveOff,
        };
  return {
    project: input.projectName,
    terms: {
      url: `${origin}/terms`,
      privacyUrl: `${origin}/privacy`,
      rule: COPY.termsRule,
    },
    types: (input.types ?? PROJECT_INVITE_JOIN_TYPES).map(toPageType),
    approval: {
      rule: COPY.approvalRule,
      autoApproveActiveMeans: COPY.autoApproveActiveMeans,
      ...autoApprove,
      steps: [...sections.redeem, ...sections.accessCheck],
    },
    nextSteps: [
      COPY.nextIntro,
      ...sections.briefingPeers,
      ...sections.summary,
      ...sections.dispatch,
      ...sections.wake,
      ...sections.poll,
      ...sections.leave,
      ...sections.productUpdates,
      ...sections.reportSkills,
      COPY.nextRepair,
      ...(sections.projectLine ? [sections.projectLine] : []),
    ],
    pollLimitPerMinute: PROJECT_INVITE_JOIN_POLL_LIMIT_PER_MINUTE,
  };
};

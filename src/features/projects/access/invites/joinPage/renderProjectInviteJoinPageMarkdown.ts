import { PROJECT_INVITE_JOIN_PAGE_COPY as COPY } from "@/features/projects/access/invites/joinPage/projectInviteJoinPageCopy.constant";
import type {
  ProjectInviteJoinPage,
  ProjectInviteJoinPageType,
} from "@/features/projects/access/invites/joinPage/projectInviteJoinPage.type";

const NL = String.fromCharCode(10);

const renderType = (type: ProjectInviteJoinPageType): readonly string[] => [
  `## ${type.label} {#${type.id}}`,
  type.deliveryMode === "webhook" ? COPY.deliveryWebhook : COPY.deliveryPoll,
  "",
  ...type.steps.map((step, index) => `${index + 1}. ${step}`),
  ...(type.note ? ["", `Note: ${type.note}`] : []),
  "",
];

/** Markdown for GET /join/<inviteToken>. Same content as the JSON, in Product's order. */
export const renderProjectInviteJoinPageMarkdown = (
  page: ProjectInviteJoinPage,
): string => {
  const title = page.project
    ? COPY.titleWithProject.replace("{projectName}", page.project)
    : COPY.titleNoProject;
  const autoApproveLine = page.approval.autoApproveLine
    ? [page.approval.autoApproveLine]
    : [];
  const lines: readonly string[] = [
    `# ${title}`,
    "",
    `## ${COPY.termsHeading}`,
    COPY.termsIntro,
    page.terms.url,
    page.terms.privacyUrl,
    "",
    `## ${COPY.indexHeading}`,
    COPY.indexIntro,
    ...page.types.map(
      (type) => `- [${type.label}](#${type.id}) — ${type.match.join("; ")}`,
    ),
    "",
    ...page.types.flatMap(renderType),
    `## ${COPY.approvalHeading}`,
    COPY.approvalIntro,
    COPY.approvalActive,
    ...autoApproveLine,
    "",
    ...page.approval.steps,
    "",
    `## ${COPY.nextHeading}`,
    ...page.nextSteps.slice(0, 1),
    "",
    ...page.nextSteps.slice(1),
  ];
  return lines.join(NL) + NL;
};

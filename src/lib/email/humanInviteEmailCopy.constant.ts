import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";

/** DF-025 invite email — short plain English; product name is one word. */
export const HUMAN_INVITE_EMAIL_BRAND_COLOR = "#1f6656";

export const buildHumanInviteEmailSubject = (input: {
  readonly inviterName: string;
  readonly projectName: string;
}): string =>
  `${input.inviterName} invited you to ${input.projectName} on ${AGENT_WITCH_PRODUCT_NAME}`;

export const buildHumanInviteEmailIntro = (input: {
  readonly inviterName: string;
  readonly projectName: string;
  readonly roleLabel: string;
}): string =>
  `${input.inviterName} invited you to join ${input.projectName} on ${AGENT_WITCH_PRODUCT_NAME} as a ${input.roleLabel}.`;

export const HUMAN_INVITE_EMAIL_CTA = "Open invite";

export const buildHumanInviteEmailExpiryNote = (days: number): string =>
  `The link works for ${days} days. Sign in or sign up with this email, then accept.`;

export const HUMAN_INVITE_EMAIL_APPROVAL_NOTE =
  "The project owner approves new people before they join.";

export const HUMAN_INVITE_EMAIL_DISCLAIMER =
  "If you did not expect this email, you can ignore it.";

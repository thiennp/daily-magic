import {
  HUMAN_INVITE_EMAIL_APPROVAL_NOTE,
  HUMAN_INVITE_EMAIL_DISCLAIMER,
  buildHumanInviteEmailExpiryNote,
  buildHumanInviteEmailIntro,
} from "@/lib/email/humanInviteEmailCopy.constant";
import type HumanInviteEmailContent from "@/lib/email/types/HumanInviteEmailContent.type";

/** Plain-text body for the DF-025 human invite email. */
export default function buildHumanInviteEmailText(
  content: HumanInviteEmailContent,
): string {
  return [
    buildHumanInviteEmailIntro(content),
    "",
    "Open this link to join:",
    content.url,
    "",
    buildHumanInviteEmailExpiryNote(content.expiresInDays),
    ...(content.requiresApproval ? [HUMAN_INVITE_EMAIL_APPROVAL_NOTE] : []),
    HUMAN_INVITE_EMAIL_DISCLAIMER,
    "",
  ].join("\n");
}

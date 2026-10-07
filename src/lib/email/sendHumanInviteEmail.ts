import buildHumanInviteEmailHtml from "@/lib/email/buildHumanInviteEmailHtml";
import buildHumanInviteEmailText from "@/lib/email/buildHumanInviteEmailText";
import getResendClient from "@/lib/email/getResendClient";
import { buildHumanInviteEmailSubject } from "@/lib/email/humanInviteEmailCopy.constant";
import resolveEmailFrom from "@/lib/email/resolveEmailFrom";
import type HumanInviteEmailContent from "@/lib/email/types/HumanInviteEmailContent.type";

export type SendHumanInviteEmailResult =
  | { readonly ok: true }
  | {
      readonly ok: false;
      readonly code: "email_not_configured" | "email_send_failed";
    };

/**
 * Sends the DF-025 invite through the existing Resend client. Never logs the
 * recipient, the token, or the link — only a fixed tag + provider error name.
 */
export default async function sendHumanInviteEmail(
  input: HumanInviteEmailContent & { readonly to: string },
): Promise<SendHumanInviteEmailResult> {
  const from = resolveEmailFrom();
  if (from === undefined) {
    return { ok: false, code: "email_not_configured" };
  }
  try {
    const { error } = await getResendClient().emails.send({
      from,
      to: input.to,
      subject: buildHumanInviteEmailSubject(input),
      html: buildHumanInviteEmailHtml(input),
      text: buildHumanInviteEmailText(input),
    });
    if (error) {
      console.warn("[human-invite-email] send failed", {
        name: typeof error.name === "string" ? error.name : "unknown",
      });
      return { ok: false, code: "email_send_failed" };
    }
    return { ok: true };
  } catch (thrown) {
    console.warn("[human-invite-email] send threw", {
      name: thrown instanceof Error ? thrown.name : "unknown",
    });
    return { ok: false, code: "email_send_failed" };
  }
}

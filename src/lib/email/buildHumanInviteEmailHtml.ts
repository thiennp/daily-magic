import escapeHtmlAttribute from "@/lib/email/escapeHtmlAttribute";
import escapeHtmlText from "@/lib/email/escapeHtmlText";
import {
  HUMAN_INVITE_EMAIL_APPROVAL_NOTE,
  HUMAN_INVITE_EMAIL_BRAND_COLOR,
  HUMAN_INVITE_EMAIL_CTA,
  HUMAN_INVITE_EMAIL_DISCLAIMER,
  buildHumanInviteEmailExpiryNote,
  buildHumanInviteEmailIntro,
} from "@/lib/email/humanInviteEmailCopy.constant";
import type HumanInviteEmailContent from "@/lib/email/types/HumanInviteEmailContent.type";

const P = "margin:0 0 12px;font-size:15px;line-height:1.5;color:#2b2a26;";
const NOTE = "margin:0 0 8px;font-size:13px;line-height:1.5;color:#6b675e;";

/** Minimal HTML body (sand background, Pine button). User text is escaped. */
export default function buildHumanInviteEmailHtml(
  content: HumanInviteEmailContent,
): string {
  const intro = escapeHtmlText(buildHumanInviteEmailIntro(content));
  const href = escapeHtmlAttribute(content.url);
  const notes = [
    buildHumanInviteEmailExpiryNote(content.expiresInDays),
    ...(content.requiresApproval ? [HUMAN_INVITE_EMAIL_APPROVAL_NOTE] : []),
    HUMAN_INVITE_EMAIL_DISCLAIMER,
  ]
    .map((line) => `<p style="${NOTE}">${escapeHtmlText(line)}</p>`)
    .join("");
  return `<!DOCTYPE html>
<html lang="en">
<body style="margin:0;padding:24px;background:#f6f3ec;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;">
<div style="max-width:480px;margin:0 auto;background:#ffffff;border:1px solid #e6e0d3;border-radius:12px;padding:24px;">
<p style="${P}">${intro}</p>
<p style="margin:0 0 16px;"><a href="${href}" style="display:inline-block;background:${HUMAN_INVITE_EMAIL_BRAND_COLOR};color:#ffffff;text-decoration:none;font-weight:600;font-size:14px;padding:10px 16px;border-radius:8px;">${escapeHtmlText(HUMAN_INVITE_EMAIL_CTA)}</a></p>
${notes}
</div>
</body>
</html>`;
}

import resolveEmailFrom from "@/lib/email/resolveEmailFrom";
import resolveResendApiKey from "@/lib/email/resolveResendApiKey";

/** Same Resend config as sign-in magic links: AUTH_RESEND_KEY|RESEND_API_KEY + EMAIL_FROM. */
export default function isHumanInviteEmailConfigured(): boolean {
  return (
    resolveResendApiKey() !== undefined && resolveEmailFrom() !== undefined
  );
}

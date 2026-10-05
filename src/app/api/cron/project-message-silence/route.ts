import { isValidCronSecretHeader } from "@/lib/cron/isValidCronSecretHeader";
import { checkProjectMessageSilence } from "@/lib/projects/acl/messaging/checkProjectMessageSilence";

export const dynamic = "force-dynamic";

/**
 * Scheduler entry for the bot-to-bot silence check (every minute).
 * Idempotent: each notice fires once per delivery via the conditional claim.
 */
export async function POST(request: Request): Promise<Response> {
  if (!isValidCronSecretHeader(request.headers, process.env)) {
    return Response.json({ ok: false }, { status: 401 });
  }
  const notified = await checkProjectMessageSilence({ now: new Date() });
  return Response.json({ ok: true, notified });
}

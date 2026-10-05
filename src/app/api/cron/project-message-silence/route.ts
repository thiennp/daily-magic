import {
  CRON_SECRET_ENV,
  PROJECT_MESSAGE_SILENCE_CRON_PATH,
} from "@/lib/cron/cronSecret.constants";
import { isCronSecretConfigured } from "@/lib/cron/isCronSecretConfigured";
import { isValidCronSecretHeader } from "@/lib/cron/isValidCronSecretHeader";
import { checkProjectMessageSilence } from "@/lib/projects/acl/messaging/checkProjectMessageSilence";

export const dynamic = "force-dynamic";

/** Named route path for ops docs and schedulers. */
export const PROJECT_MESSAGE_SILENCE_CRON_ROUTE = PROJECT_MESSAGE_SILENCE_CRON_PATH;

/**
 * Optional external trigger for the bot-to-bot silence check. The server
 * already runs it in-process every minute. Idempotent: each notice fires
 * once per delivery via the conditional claim.
 */
export async function POST(request: Request): Promise<Response> {
  if (!isCronSecretConfigured(process.env)) {
    return Response.json(
      { ok: false, disabled: true, reason: `${CRON_SECRET_ENV} not set` },
      { status: 503 },
    );
  }
  if (!isValidCronSecretHeader(request.headers, process.env)) {
    return Response.json({ ok: false }, { status: 401 });
  }
  const notified = await checkProjectMessageSilence({ now: new Date() });
  return Response.json({ ok: true, notified });
}

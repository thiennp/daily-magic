import { CRON_SECRET_ENV } from "@/lib/cron/cronSecret.constants";
import { isCronSecretConfigured } from "@/lib/cron/isCronSecretConfigured";
import { isValidCronSecretHeader } from "@/lib/cron/isValidCronSecretHeader";
import { flushDueProjectUpdatedNotifies } from "@/lib/projects/acl/messaging/flushDueProjectUpdatedNotifies";

export const dynamic = "force-dynamic";

/**
 * Optional external trigger for debounced project.updated flush. The server
 * already runs it in-process every second when a database is configured.
 * Idempotent: each pending row is claimed once via conditional state update.
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
  const flushed = await flushDueProjectUpdatedNotifies({ now: new Date() });
  return Response.json({ ok: true, flushed });
}

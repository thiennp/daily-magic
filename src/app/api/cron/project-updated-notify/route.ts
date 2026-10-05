import { CRON_SECRET_ENV } from "@/lib/cron/cronSecret.constants";
import { isCronSecretConfigured } from "@/lib/cron/isCronSecretConfigured";
import { isValidCronSecretHeader } from "@/lib/cron/isValidCronSecretHeader";
import { flushDueProjectUpdatedNotifies } from "@/lib/projects/acl/messaging/flushDueProjectUpdatedNotifies";

export const dynamic = "force-dynamic";

/**
 * Sole flush owner for debounced project.updated notify.
 * Multi-instance safe: each pending row is claimed once via conditional state
 * update; stale flushed rows (>~60s) reclaim to pending before claim.
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

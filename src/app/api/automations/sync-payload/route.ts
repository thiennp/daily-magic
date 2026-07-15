import { listLocalScheduledAutomationSyncPayloads } from "@/lib/automations/listLocalScheduledAutomationSyncPayloads";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const automations = await listLocalScheduledAutomationSyncPayloads(actor.id);

  return Response.json({ ok: true, automations });
}

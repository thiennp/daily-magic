import { requireAuth } from "@/lib/auth/requireAuth";
import { getCursorCloudConnectionSummary } from "@/lib/cursorCloud/cursorCloudConnectionQueries";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) {
    return error;
  }

  const summary = await getCursorCloudConnectionSummary(actor.id);
  return Response.json({
    ok: true,
    cursorCloudConnected: summary.connected,
  });
}

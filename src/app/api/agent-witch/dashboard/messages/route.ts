import isAgentWitchMessage from "@/lib/agentWitch/isAgentWitchMessage";
import { getAgentWitchHub } from "@/lib/agentWitch/getAgentWitchHub";
import { registerHttpDashboardWitchClient } from "@/lib/agentWitch/registerHttpDashboardWitchClient";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

/** Browser → hub messages (replaces dashboard WebSocket sends). */
export async function POST(request: Request): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const body: unknown = await request.json().catch(() => null);

  if (!isAgentWitchMessage(body)) {
    return Response.json(
      { ok: false, error: "Invalid Agent Witch message." },
      { status: 400 },
    );
  }

  const client = registerHttpDashboardWitchClient({
    userId: actor.id,
    email: actor.email,
  });

  const hub = getAgentWitchHub();
  const reply = await hub.handleMessageAsync(client.id, body);

  return Response.json({ ok: true, reply });
}

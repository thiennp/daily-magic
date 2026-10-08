import isAgentWitchMessage from "@/lib/agentWitch/isAgentWitchMessage";
import { getAgentWitchHub } from "@/lib/agentWitch/getAgentWitchHub";
import { recordAgentWitchTraffic } from "@/lib/agentWitch/agentWitchTrafficLog";
import { registerHttpDashboardWitchClient } from "@/lib/agentWitch/registerHttpDashboardWitchClient";
import { logDashboardInputAnswer } from "@/lib/agentWitch/logDashboardInputAnswer";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

export async function POST(request: Request): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const body: unknown = await request.json().catch(() => null);

  if (!isAgentWitchMessage(body)) {
    return Response.json(
      { ok: false, error: "Invalid AgentWitch message." },
      { status: 400 },
    );
  }

  logDashboardInputAnswer(request, body);

  const client = registerHttpDashboardWitchClient({
    userId: actor.id,
    email: actor.email,
  });

  const hub = getAgentWitchHub();
  const reply = await hub.handleMessageAsync(client.id, body);
  const response = { ok: true, reply };

  recordAgentWitchTraffic({
    direction: "browser_to_server",
    path: "/api/agent-witch/dashboard/messages",
    summary: `${body.type} from dashboard`,
    request: body,
    response,
  });

  return Response.json(response);
}

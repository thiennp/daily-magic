import { parseLocalAgentWitchIdentity } from "@/features/agent-witch/utils/parseLocalAgentWitchIdentity";
import type { LocalAgentWitchIdentity } from "@/features/agent-witch/utils/parseLocalAgentWitchIdentity";
import { fetchLocalAgentWitchWakeJson } from "@/lib/agentWitch/fetchLocalAgentWitchWakeJson";
import {
  parseWakePortQuery,
  parseWakePortsQuery,
} from "@/lib/agentWitch/parseWakePortsQuery";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

const fetchIdentityAtWakePort = async (
  wakePort: number,
): Promise<LocalAgentWitchIdentity | null> => {
  const wakeResult = await fetchLocalAgentWitchWakeJson("/identity", {
    wakePort,
  });

  if (!wakeResult.reachable) {
    return null;
  }

  return parseLocalAgentWitchIdentity(wakeResult.payload);
};

export async function GET(request: Request): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const searchParams = new URL(request.url).searchParams;
  const wakePorts = parseWakePortsQuery(searchParams.get("wakePorts"));
  const singleWakePort = parseWakePortQuery(searchParams.get("wakePort"));

  if (wakePorts !== null) {
    for (const wakePort of wakePorts) {
      const identity = await fetchIdentityAtWakePort(wakePort);
      if (identity !== null) {
        return Response.json(identity);
      }
    }

    return new Response(null, { status: 503 });
  }

  if (singleWakePort === null) {
    return Response.json(
      { errorMessage: "Provide wakePort or wakePorts query parameter." },
      { status: 400 },
    );
  }

  const identity = await fetchIdentityAtWakePort(singleWakePort);

  if (identity === null) {
    return new Response(null, { status: 503 });
  }

  return Response.json(identity);
}

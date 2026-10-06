import {
  agentAccessTooLargeResponse,
  guardAgentAccessPost,
} from "@/lib/agentAccess/guardAgentAccessPost";
import { startDeviceAuthorization } from "@/lib/agentAccess/deviceCode/startDeviceAuthorization";
import { readBoundedAgentAccessBody } from "@/lib/agentAccess/readBoundedAgentAccessBody";
import {
  hashAgentAccessClientIp,
  readClientIp,
} from "@/lib/agentAccess/readClientIp";

export const dynamic = "force-dynamic";

export async function POST(request: Request): Promise<Response> {
  const limited = await guardAgentAccessPost(request);
  if (limited !== null) {
    return limited;
  }

  const payload = await readBoundedAgentAccessBody(request);
  if (payload === "too_large") {
    return agentAccessTooLargeResponse();
  }

  const outcome = await startDeviceAuthorization({
    body: payload,
    ipHash: hashAgentAccessClientIp(readClientIp(request)),
  });

  if (!outcome.ok) {
    return Response.json(
      { ok: false, error: outcome.error, code: outcome.code },
      { status: outcome.status },
    );
  }

  return Response.json(outcome.body, { status: outcome.status });
}

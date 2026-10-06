import {
  agentAccessTooLargeResponse,
  guardAgentAccessPost,
} from "@/lib/agentAccess/guardAgentAccessPost";
import { revokeAgentAccessToken } from "@/lib/agentAccess/deviceCode/revokeAgentAccessToken";
import { readBoundedAgentAccessBody } from "@/lib/agentAccess/readBoundedAgentAccessBody";

export const dynamic = "force-dynamic";

/** RFC 7009-style revoke for device-issued access/refresh tokens. */
export async function POST(request: Request): Promise<Response> {
  const limited = await guardAgentAccessPost(request);
  if (limited !== null) {
    return limited;
  }

  const payload = await readBoundedAgentAccessBody(request);
  if (payload === "too_large") {
    return agentAccessTooLargeResponse();
  }

  const body =
    payload !== null && typeof payload === "object"
      ? (payload as Record<string, unknown>)
      : {};
  const token = typeof body.token === "string" ? body.token : "";

  await revokeAgentAccessToken({ token });
  // RFC 7009: always 200 when the client is authenticated enough to call.
  return new Response(null, { status: 200 });
}

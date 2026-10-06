import {
  agentAccessTooLargeResponse,
  guardAgentAccessPost,
} from "@/lib/agentAccess/guardAgentAccessPost";
import { refreshDeviceAccessToken } from "@/lib/agentAccess/deviceCode/refreshDeviceAccessToken";
import { readBoundedAgentAccessBody } from "@/lib/agentAccess/readBoundedAgentAccessBody";

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

  const body =
    payload !== null && typeof payload === "object"
      ? (payload as Record<string, unknown>)
      : {};

  const grantType =
    typeof body.grant_type === "string" ? body.grant_type : "";
  const refreshToken =
    typeof body.refresh_token === "string" ? body.refresh_token : "";

  if (grantType !== "refresh_token") {
    return Response.json(
      {
        error: "unsupported_grant_type",
        error_description: 'grant_type must be "refresh_token"',
      },
      { status: 400 },
    );
  }

  const outcome = await refreshDeviceAccessToken({ refreshToken });
  return Response.json(outcome.body, { status: outcome.status });
}

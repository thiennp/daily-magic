import {
  agentAccessTooLargeResponse,
  guardAgentAccessPost,
} from "@/lib/agentAccess/guardAgentAccessPost";
import { pollDeviceToken } from "@/lib/agentAccess/deviceCode/pollDeviceToken";
import { readBoundedAgentAccessBody } from "@/lib/agentAccess/readBoundedAgentAccessBody";

export const dynamic = "force-dynamic";

const DEVICE_GRANT =
  "urn:ietf:params:oauth:grant-type:device_code";

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
  const deviceCode =
    typeof body.device_code === "string" ? body.device_code : "";

  if (grantType !== DEVICE_GRANT) {
    return Response.json(
      {
        error: "unsupported_grant_type",
        error_description: `grant_type must be ${DEVICE_GRANT}`,
      },
      { status: 400 },
    );
  }

  const outcome = await pollDeviceToken({ deviceCode });
  return Response.json(outcome.body, { status: outcome.status });
}

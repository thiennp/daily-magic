import { AGENT_ACCESS_POSTS_PER_HOUR } from "@/lib/agentAccess/agentAccess.constant";
import { consumeAgentAccessBucket } from "@/lib/agentAccess/consumeAgentAccessBucket";
import {
  hashAgentAccessClientIp,
  readClientIp,
} from "@/lib/agentAccess/readClientIp";

export const agentAccessTooLargeResponse = (): Response =>
  Response.json(
    {
      ok: false,
      error: "Request body is too large.",
      code: "payload_too_large",
    },
    { status: 413 },
  );

export const agentAccessRateLimitedResponse = (): Response =>
  Response.json(
    {
      ok: false,
      error: "Too many requests. Wait before trying again.",
      code: "rate_limited",
    },
    { status: 429 },
  );

export const guardAgentAccessPost = async (
  request: Request,
): Promise<Response | null> => {
  const allowed = await consumeAgentAccessBucket({
    subjectHash: hashAgentAccessClientIp(readClientIp(request)),
    bucket: "post",
    limit: AGENT_ACCESS_POSTS_PER_HOUR,
  });

  return allowed ? null : agentAccessRateLimitedResponse();
};

import { AGENT_ACCESS_POSTS_PER_HOUR } from "@/lib/agentAccess/agentAccess.constant";
import {
  buildAgentAccessRateLimitedBody,
  readAgentAccessRetryAfterHeader,
} from "@/lib/agentAccess/agentAccessRateLimited";
import { consumeAgentAccessBucket } from "@/lib/agentAccess/consumeAgentAccessBucket";
import {
  AGENT_ACCESS_RETRY_AFTER_FALLBACK_SECONDS,
  readAgentAccessBucketRetryAfterSeconds,
} from "@/lib/agentAccess/readAgentAccessBucketRetryAfterSeconds";
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

/** 429 with retryAfterSeconds / retryAfterAt in the body and a Retry-After header. */
export const agentAccessRateLimitedResponse = (
  retryAfterSeconds: number = AGENT_ACCESS_RETRY_AFTER_FALLBACK_SECONDS,
): Response => {
  const body = buildAgentAccessRateLimitedBody(retryAfterSeconds);
  return Response.json(body, {
    status: 429,
    headers: readAgentAccessRetryAfterHeader(body),
  });
};

export const guardAgentAccessPost = async (
  request: Request,
): Promise<Response | null> => {
  const subjectHash = hashAgentAccessClientIp(readClientIp(request));
  const allowed = await consumeAgentAccessBucket({
    subjectHash,
    bucket: "post",
    limit: AGENT_ACCESS_POSTS_PER_HOUR,
  });

  return allowed
    ? null
    : agentAccessRateLimitedResponse(
        await readAgentAccessBucketRetryAfterSeconds({
          subjectHash,
          bucket: "post",
        }),
      );
};

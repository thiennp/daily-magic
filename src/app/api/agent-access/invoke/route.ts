import {
  isNonEmptyString,
  isNonNullObject,
  isType,
  isUndefinedOr,
} from "guardz";

import { executeAgentAccessTool } from "@/lib/agentAccess/executeAgentAccessTool";
import {
  agentAccessTooLargeResponse,
  guardAgentAccessPost,
} from "@/lib/agentAccess/guardAgentAccessPost";
import { readBoundedAgentAccessBody } from "@/lib/agentAccess/readBoundedAgentAccessBody";
import { readClientIp } from "@/lib/agentAccess/readClientIp";

export const dynamic = "force-dynamic";

const parseToolText = (text: string): unknown => {
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return { ok: false, error: text, code: "tool_error" };
  }
};

const isInvokeBody = isType<{
  readonly name: string;
  readonly arguments?: unknown;
}>({
  name: isNonEmptyString,
  arguments: isUndefinedOr(isNonNullObject),
});

const statusForToolError = (parsed: unknown): number => {
  if (typeof parsed !== "object" || parsed === null) {
    return 400;
  }

  const code = (parsed as { code?: unknown }).code;

  if (code === "unauthorized") {
    return 401;
  }

  if (code === "rate_limited" || code === "busy") {
    return 429;
  }

  return 400;
};

export async function POST(request: Request): Promise<Response> {
  const limited = await guardAgentAccessPost(request);

  if (limited !== null) {
    return limited;
  }

  const payload = await readBoundedAgentAccessBody(request);

  if (payload === "too_large") {
    return agentAccessTooLargeResponse();
  }

  const body: unknown = payload;

  if (!isInvokeBody(body)) {
    return Response.json(
      { ok: false, error: "name is required.", code: "invalid_arguments" },
      { status: 400 },
    );
  }

  const result = await executeAgentAccessTool({
    name: body.name,
    args: body.arguments ?? {},
    authorization: request.headers.get("authorization"),
    ip: readClientIp(request),
  });
  const parsed = parseToolText(result.text);

  return Response.json(parsed, {
    status: result.isError ? statusForToolError(parsed) : 200,
  });
}

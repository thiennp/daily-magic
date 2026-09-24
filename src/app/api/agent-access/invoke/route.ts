import {
  isNonEmptyString,
  isNonNullObject,
  isType,
  isUndefinedOr,
} from "guardz";

import { executeAgentAccessTool } from "@/lib/agentAccess/executeAgentAccessTool";
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

export async function POST(request: Request): Promise<Response> {
  const body: unknown = await request.json().catch(() => null);

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

  return Response.json(parsed, { status: result.isError ? 400 : 200 });
}

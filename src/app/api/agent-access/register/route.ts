import {
  agentAccessTooLargeResponse,
  guardAgentAccessPost,
} from "@/lib/agentAccess/guardAgentAccessPost";
import { parseAgentAccessRegisterBody } from "@/lib/agentAccess/parseAgentAccessRegisterBody";
import { readBoundedAgentAccessBody } from "@/lib/agentAccess/readBoundedAgentAccessBody";
import {
  hashAgentAccessClientIp,
  readClientIp,
} from "@/lib/agentAccess/readClientIp";
import { registerAgentAccessAccount } from "@/lib/agentAccess/registerAgentAccessAccount";

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

  const parsed = parseAgentAccessRegisterBody(payload);

  if (!parsed.ok) {
    return Response.json(
      {
        ok: false,
        error: parsed.error,
        code: parsed.code,
      },
      { status: 400 },
    );
  }

  const outcome = await registerAgentAccessAccount({
    body: parsed.body,
    ipHash: hashAgentAccessClientIp(readClientIp(request)),
  });

  if (!outcome.ok) {
    return Response.json(
      { ok: false, error: outcome.error, code: outcome.code },
      { status: outcome.status },
    );
  }

  return Response.json(outcome.body, { status: 201 });
}

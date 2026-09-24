import { parseAgentAccessRegisterBody } from "@/lib/agentAccess/parseAgentAccessRegisterBody";
import {
  hashAgentAccessClientIp,
  readClientIp,
} from "@/lib/agentAccess/readClientIp";
import { registerAgentAccessAccount } from "@/lib/agentAccess/registerAgentAccessAccount";

export const dynamic = "force-dynamic";

export async function POST(request: Request): Promise<Response> {
  const body = parseAgentAccessRegisterBody(
    await request.json().catch(() => null),
  );

  if (body === null) {
    return Response.json(
      {
        ok: false,
        error: 'method must be "none" or "agentmail".',
        code: "invalid_arguments",
      },
      { status: 400 },
    );
  }

  const outcome = await registerAgentAccessAccount({
    body,
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

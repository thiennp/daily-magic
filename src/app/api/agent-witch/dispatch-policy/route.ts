import {
  getUserAgentDispatchPolicy,
  updateUserAgentDispatchPolicy,
} from "@/lib/dispatch/groupUserDispatchPolicyQueries";
import { parseDispatchPolicyBody } from "@/lib/dispatch/parseDispatchPolicyBody";
import { DEFAULT_DISPATCH_POLICY } from "@/lib/dispatch/DispatchPolicy.constant";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const userPolicy = await getUserAgentDispatchPolicy(actor.id);

  return Response.json({
    ok: true,
    dispatchPolicy: userPolicy,
    effectiveDefault: DEFAULT_DISPATCH_POLICY,
  });
}

export async function PATCH(request: Request): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const body: unknown = await request.json();
  const dispatchPolicy = parseDispatchPolicyBody(body);

  if (dispatchPolicy === undefined) {
    return Response.json(
      { error: "dispatchPolicy must be open, approval, or null." },
      { status: 400 },
    );
  }

  await updateUserAgentDispatchPolicy(actor.id, dispatchPolicy);

  return Response.json({ ok: true, dispatchPolicy });
}

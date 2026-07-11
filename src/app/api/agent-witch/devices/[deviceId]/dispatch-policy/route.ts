import { updateDeviceDispatchPolicy } from "@/lib/dispatch/deviceDispatchPolicyQueries";
import { parseDispatchPolicyBody } from "@/lib/dispatch/parseDispatchPolicyBody";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

interface RouteContext {
  readonly params: Promise<{
    readonly deviceId: string;
  }>;
}

export async function PATCH(
  request: Request,
  context: RouteContext,
): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const { deviceId } = await context.params;
  const body: unknown = await request.json();
  const dispatchPolicy = parseDispatchPolicyBody(body);

  if (dispatchPolicy === undefined) {
    return Response.json(
      { error: "dispatchPolicy must be open, approval, or null." },
      { status: 400 },
    );
  }

  const updated = await updateDeviceDispatchPolicy(
    deviceId,
    actor.id,
    dispatchPolicy,
  );

  if (!updated) {
    return Response.json({ error: "Device not found." }, { status: 404 });
  }

  return Response.json({ ok: true, dispatchPolicy });
}

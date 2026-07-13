import { parseUpdateDeviceLabelBody } from "@/lib/agentWitch/parseUpdateDeviceLabelBody";
import { updateAgentWitchDeviceLabel } from "@/lib/agentWitch/updateAgentWitchDeviceLabel";
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
  const deviceLabel = parseUpdateDeviceLabelBody(body);

  if (deviceLabel === undefined) {
    return Response.json(
      { error: "deviceLabel must be a non-empty string up to 80 characters." },
      { status: 400 },
    );
  }

  const updated = await updateAgentWitchDeviceLabel(
    deviceId,
    actor.id,
    deviceLabel,
  );

  if (!updated) {
    return Response.json({ error: "Device not found." }, { status: 404 });
  }

  return Response.json({ ok: true, displayName: deviceLabel });
}

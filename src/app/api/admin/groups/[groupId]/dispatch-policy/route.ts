import { getMembershipForUserInGroup } from "@/lib/auth/groupMembershipQueries";
import { getGroupById } from "@/lib/auth/groupQueries";
import { canConfigureGroupDispatchPolicy } from "@/lib/dispatch/canConfigureGroupDispatchPolicy";
import { updateGroupDispatchPolicy } from "@/lib/dispatch/groupUserDispatchPolicyQueries";
import { parseDispatchPolicyBody } from "@/lib/dispatch/parseDispatchPolicyBody";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

interface RouteContext {
  readonly params: Promise<{
    readonly groupId: string;
  }>;
}

export async function GET(
  _request: Request,
  context: RouteContext,
): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const { groupId } = await context.params;
  const membership = await getMembershipForUserInGroup(groupId, actor.id);

  if (!canConfigureGroupDispatchPolicy(actor, membership)) {
    return Response.json({ error: "Forbidden." }, { status: 403 });
  }

  const group = await getGroupById(groupId);

  if (group === null) {
    return Response.json({ error: "Group not found." }, { status: 404 });
  }

  return Response.json({ ok: true, dispatchPolicy: group.dispatchPolicy });
}

export async function PATCH(
  request: Request,
  context: RouteContext,
): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const { groupId } = await context.params;
  const membership = await getMembershipForUserInGroup(groupId, actor.id);

  if (!canConfigureGroupDispatchPolicy(actor, membership)) {
    return Response.json({ error: "Forbidden." }, { status: 403 });
  }

  const body: unknown = await request.json();
  const dispatchPolicy = parseDispatchPolicyBody(body);

  if (dispatchPolicy === undefined || dispatchPolicy === null) {
    return Response.json(
      { error: "dispatchPolicy must be open or approval." },
      { status: 400 },
    );
  }

  await updateGroupDispatchPolicy(groupId, dispatchPolicy);

  return Response.json({ ok: true, dispatchPolicy });
}

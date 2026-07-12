import { listCapabilityFeedbackInboxForOwner } from "@/lib/feedback/capabilityFeedbackMutations";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const items = await listCapabilityFeedbackInboxForOwner(actor.id);

  return Response.json({ ok: true, items });
}

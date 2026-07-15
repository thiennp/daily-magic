import { DEFAULT_HARNESS_SHARING_VISIBILITY } from "@/lib/harness/HarnessSharingVisibility.constant";
import {
  getUserHarnessSharingVisibility,
  updateUserHarnessSharingVisibility,
} from "@/lib/harness/harnessSharingVisibilityQueries";
import { parseHarnessSharingVisibilityBody } from "@/lib/harness/parseHarnessSharingVisibilityBody";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const visibility = await getUserHarnessSharingVisibility(actor.id);

  return Response.json({
    ok: true,
    visibility,
    effectiveDefault: DEFAULT_HARNESS_SHARING_VISIBILITY,
  });
}

export async function PATCH(request: Request): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const body: unknown = await request.json();
  const visibility = parseHarnessSharingVisibilityBody(body);

  if (visibility === undefined) {
    return Response.json(
      { error: "visibility must be private, group, or public." },
      { status: 400 },
    );
  }

  await updateUserHarnessSharingVisibility(actor.id, visibility);

  return Response.json({ ok: true, visibility });
}

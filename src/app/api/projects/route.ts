import { createUserProject } from "@/lib/projects/userProjectMutations";
import listProjectCompositionCountsForOwner from "@/lib/projects/listProjectCompositionCountsForOwner";
import {
  listUserProjectsForMember,
  listUserProjectsForOwner,
} from "@/lib/projects/userProjectQueries";
import { parseCreateUserProjectBody } from "@/lib/projects/parseUserProjectBody";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

export async function GET(request: Request): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const url = new URL(request.url);
  const deviceId = url.searchParams.get("deviceId");
  const hasDevice = deviceId !== null && deviceId.length > 0;
  const owned = await listUserProjectsForOwner(
    actor.id,
    hasDevice ? deviceId : null,
  );
  // Joined projects have no device of their own: skip them on a device-scoped list.
  const joined = hasDevice ? [] : await listUserProjectsForMember(actor.id);
  const projects = [...owned, ...joined];

  const compositionCountsByProjectId = Object.fromEntries(
    await listProjectCompositionCountsForOwner(actor.id),
  );

  return Response.json({
    ok: true,
    projects,
    compositionCountsByProjectId,
  });
}

export async function POST(request: Request): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const body: unknown = await request.json().catch(() => null);
  const parsed = parseCreateUserProjectBody(body, actor.email);

  if (parsed === null) {
    return Response.json(
      { ok: false, errorMessage: "Invalid project payload." },
      { status: 400 },
    );
  }

  try {
    const project = await createUserProject(actor.id, parsed);

    if (project === null) {
      return Response.json(
        { ok: false, errorMessage: "Could not save project." },
        { status: 500 },
      );
    }

    return Response.json({ ok: true, project });
  } catch (caught) {
    const isDuplicateName =
      caught instanceof Error &&
      (caught.message.includes("user_projects_owner_device_name_idx") ||
        caught.message.includes("user_projects_owner_name_idx"));
    const message = isDuplicateName
      ? "You already have a project with that name."
      : "Could not save project.";

    return Response.json({ ok: false, errorMessage: message }, { status: 409 });
  }
}

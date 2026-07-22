import { createUserProject } from "@/lib/projects/userProjectMutations";
import { ensureDefaultUserProject } from "@/lib/projects/ensureDefaultUserProject";
import { listUserProjectsForOwner } from "@/lib/projects/userProjectQueries";
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
  await ensureDefaultUserProject(
    actor.id,
    deviceId && deviceId.length > 0 ? deviceId : null,
  );
  const projects = await listUserProjectsForOwner(
    actor.id,
    deviceId && deviceId.length > 0 ? deviceId : null,
  );

  return Response.json({ ok: true, projects });
}

export async function POST(request: Request): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const body: unknown = await request.json().catch(() => null);
  const parsed = parseCreateUserProjectBody(body);

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
    const message =
      caught instanceof Error &&
      caught.message.includes("user_projects_owner_name_idx")
        ? "You already have a project with that name."
        : "Could not save project.";

    return Response.json({ ok: false, errorMessage: message }, { status: 409 });
  }
}

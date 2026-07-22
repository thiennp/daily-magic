import {
  deleteUserProject,
  updateUserProject,
} from "@/lib/projects/userProjectMutations";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";
import { parseUpdateUserProjectBody } from "@/lib/projects/parseUserProjectBody";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  context: { params: Promise<{ readonly projectId: string }> },
): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const { projectId } = await context.params;
  const project = await getUserProjectById(projectId);

  if (project === null || project.ownerUserId !== actor.id) {
    return Response.json(
      { ok: false, errorMessage: "Project not found." },
      { status: 404 },
    );
  }

  return Response.json({ ok: true, project });
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ readonly projectId: string }> },
): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const { projectId } = await context.params;
  const body: unknown = await request.json().catch(() => null);
  const parsed = parseUpdateUserProjectBody(body);

  if (parsed.kind === "folder_immutable") {
    return Response.json(
      {
        ok: false,
        errorMessage: "Project folder cannot be changed after it is saved.",
      },
      { status: 400 },
    );
  }

  if (parsed.kind === "invalid") {
    return Response.json(
      { ok: false, errorMessage: "Invalid project payload." },
      { status: 400 },
    );
  }

  try {
    const project = await updateUserProject(actor.id, projectId, parsed.input);

    if (project === null) {
      return Response.json(
        { ok: false, errorMessage: "Project not found." },
        { status: 404 },
      );
    }

    return Response.json({ ok: true, project });
  } catch {
    return Response.json(
      { ok: false, errorMessage: "Could not update project." },
      { status: 409 },
    );
  }
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ readonly projectId: string }> },
): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const { projectId } = await context.params;
  const deleted = await deleteUserProject(actor.id, projectId);

  if (!deleted) {
    return Response.json(
      { ok: false, errorMessage: "Project not found." },
      { status: 404 },
    );
  }

  return Response.json({ ok: true });
}

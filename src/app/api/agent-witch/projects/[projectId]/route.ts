import { isNonNullObject, isString } from "guardz";

import { requireAgentWitchDeviceAuth } from "@/lib/agentWitch/requireAgentWitchDeviceAuth";
import isDefaultUserProject from "@/lib/projects/isDefaultUserProject";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";
import { deleteUserProject } from "@/lib/projects/userProjectMutations";
import { normalizeValidatedProjectFolderPath } from "@/lib/projects/validateProjectFolderPath";
import { updateUserProjectFolderPath } from "@/lib/projects/updateUserProjectFolderPath";

export const dynamic = "force-dynamic";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ readonly projectId: string }> },
): Promise<Response> {
  const auth = await requireAgentWitchDeviceAuth(request);

  if (auth instanceof Response) {
    return auth;
  }

  const body: unknown = await request.json().catch(() => null);
  const folderPath =
    isNonNullObject(body) && isString(body.folderPath)
      ? normalizeValidatedProjectFolderPath(body.folderPath)
      : null;

  if (folderPath === null) {
    return Response.json(
      { ok: false, errorMessage: "Choose a valid project folder." },
      { status: 400 },
    );
  }

  const { projectId } = await context.params;
  const project = await updateUserProjectFolderPath(
    auth.device.userId,
    projectId,
    folderPath,
    auth.device.id,
  );

  if (project === null) {
    return Response.json(
      { ok: false, errorMessage: "Project not found." },
      { status: 404 },
    );
  }

  return Response.json({
    ok: true,
    project: {
      id: project.id,
      name: project.name,
      folderPath: project.folderPath,
    },
  });
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ readonly projectId: string }> },
): Promise<Response> {
  const auth = await requireAgentWitchDeviceAuth(request);

  if (auth instanceof Response) {
    return auth;
  }

  const { projectId } = await context.params;
  const project = await getUserProjectById(projectId.trim());

  if (project === null || project.ownerUserId !== auth.device.userId) {
    return Response.json(
      { ok: false, errorMessage: "Project not found." },
      { status: 404 },
    );
  }

  if (isDefaultUserProject(project)) {
    return Response.json(
      { ok: false, errorMessage: "The Default project cannot be deleted." },
      { status: 400 },
    );
  }

  const deleted = await deleteUserProject(auth.device.userId, projectId);

  if (!deleted) {
    return Response.json(
      { ok: false, errorMessage: "Project not found." },
      { status: 404 },
    );
  }

  return Response.json({ ok: true });
}

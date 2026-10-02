import { isNonNullObject, isString } from "guardz";

import { requireAgentWitchDeviceAuth } from "@/lib/agentWitch/requireAgentWitchDeviceAuth";
import isDefaultUserProject from "@/lib/projects/isDefaultUserProject";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";
import {
  deleteUserProject,
  updateUserProject,
} from "@/lib/projects/userProjectMutations";
import { normalizeValidatedProjectFolderPath } from "@/lib/projects/validateProjectFolderPath";
import { parseOptionalProjectRepoFields } from "@/lib/projects/validateProjectRepoUrls";
import { updateUserProjectFolderPath } from "@/lib/projects/updateUserProjectFolderPath";

export const dynamic = "force-dynamic";

const summarizeDeviceProject = (project: {
  readonly id: string;
  readonly name: string;
  readonly folderPath: string;
  readonly repoUrls: readonly string[];
  readonly defaultBranch: string | null;
}) => ({
  id: project.id,
  name: project.name,
  folderPath: project.folderPath,
  repoUrls: project.repoUrls,
  defaultBranch: project.defaultBranch,
});

export async function PATCH(
  request: Request,
  context: { params: Promise<{ readonly projectId: string }> },
): Promise<Response> {
  const auth = await requireAgentWitchDeviceAuth(request);

  if (auth instanceof Response) {
    return auth;
  }

  const body: unknown = await request.json().catch(() => null);
  if (!isNonNullObject(body)) {
    return Response.json(
      { ok: false, errorMessage: "Invalid project payload." },
      { status: 400 },
    );
  }

  const folderPathRaw =
    "folderPath" in body && isString(body.folderPath) ? body.folderPath : null;
  const folderPath =
    folderPathRaw !== null
      ? normalizeValidatedProjectFolderPath(folderPathRaw)
      : null;

  if (folderPathRaw !== null && folderPath === null) {
    return Response.json(
      { ok: false, errorMessage: "Choose a valid project folder." },
      { status: 400 },
    );
  }

  const repoFields = parseOptionalProjectRepoFields(
    body as Record<string, unknown>,
  );
  if (!repoFields.ok) {
    return Response.json(
      { ok: false, errorMessage: repoFields.error },
      { status: 400 },
    );
  }

  const hasRepoUpdate =
    repoFields.repoUrls !== undefined ||
    repoFields.defaultBranch !== undefined;

  if (folderPath === null && !hasRepoUpdate) {
    return Response.json(
      {
        ok: false,
        errorMessage:
          "Provide folderPath and/or repoUrls/defaultBranch to update.",
      },
      { status: 400 },
    );
  }

  const { projectId } = await context.params;
  let project =
    folderPath !== null
      ? await updateUserProjectFolderPath(
          auth.device.userId,
          projectId,
          folderPath,
          auth.device.id,
        )
      : await getUserProjectById(projectId.trim());

  if (
    project === null ||
    project.ownerUserId !== auth.device.userId
  ) {
    return Response.json(
      { ok: false, errorMessage: "Project not found." },
      { status: 404 },
    );
  }

  if (hasRepoUpdate) {
    project = await updateUserProject(auth.device.userId, projectId, {
      ...(repoFields.repoUrls !== undefined
        ? { repoUrls: repoFields.repoUrls }
        : {}),
      ...(repoFields.defaultBranch !== undefined
        ? { defaultBranch: repoFields.defaultBranch }
        : {}),
    });
    if (project === null) {
      return Response.json(
        { ok: false, errorMessage: "Project not found." },
        { status: 404 },
      );
    }
  }

  return Response.json({
    ok: true,
    project: summarizeDeviceProject(project),
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

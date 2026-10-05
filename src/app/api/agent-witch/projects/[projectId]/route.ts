import { isNonNullObject } from "guardz";

import { requireAgentWitchDeviceAuth } from "@/lib/agentWitch/requireAgentWitchDeviceAuth";
import mapDeleteProjectDbOnlyResultToResponse from "@/lib/projects/delete/mapDeleteProjectDbOnlyResultToResponse";
import orchestrateDeleteProjectDbOnly from "@/lib/projects/delete/orchestrateDeleteProjectDbOnly";
import { applyAgentWitchDeviceProjectPatch } from "@/lib/projects/applyAgentWitchDeviceProjectPatch";
import { parseAgentWitchDeviceProjectPatchBody } from "@/lib/projects/parseAgentWitchDeviceProjectPatchBody";
import { summarizeDeviceUserProject } from "@/lib/projects/summarizeDeviceUserProject";

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
  if (!isNonNullObject(body)) {
    return Response.json(
      { ok: false, errorMessage: "Invalid project payload." },
      { status: 400 },
    );
  }

  const parsed = parseAgentWitchDeviceProjectPatchBody(
    body as Record<string, unknown>,
  );
  if (!parsed.ok) {
    return Response.json(
      { ok: false, errorMessage: parsed.errorMessage },
      { status: parsed.status },
    );
  }

  const { projectId } = await context.params;
  const project = await applyAgentWitchDeviceProjectPatch({
    ownerUserId: auth.device.userId,
    deviceId: auth.device.id,
    projectId,
    folderPath: parsed.folderPath,
    hasRepoUpdate: parsed.hasRepoUpdate,
    ...(parsed.repoUrls !== undefined ? { repoUrls: parsed.repoUrls } : {}),
    ...(parsed.defaultBranch !== undefined
      ? { defaultBranch: parsed.defaultBranch }
      : {}),
  });

  if (project === null) {
    return Response.json(
      { ok: false, errorMessage: "Project not found." },
      { status: 404 },
    );
  }

  return Response.json({
    ok: true,
    project: summarizeDeviceUserProject(project),
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

  try {
    const result = await orchestrateDeleteProjectDbOnly({
      projectId,
      ownerUserId: auth.device.userId,
    });
    return mapDeleteProjectDbOnlyResultToResponse(result);
  } catch {
    return Response.json(
      { ok: false, errorMessage: "Could not delete project." },
      { status: 500 },
    );
  }
}

import { getUserProjectById } from "@/lib/projects/userProjectQueries";
import { isValidProjectFolderPath } from "@/lib/projects/validateProjectFolderPath";
import { requireProjectIdForCreate } from "@/lib/projects/requireProjectIdForCreate";
import type { AgentRunDispatchBody } from "@/lib/dispatch/parseAgentRunDispatchBody";

export type ResolvedAgentRunDispatchProject =
  | {
      readonly ok: true;
      readonly projectId: string;
      readonly projectFolderPath: string;
    }
  | {
      readonly ok: false;
      readonly errorMessage: string;
      readonly code:
        | "project_required"
        | "not_found"
        | "forbidden"
        | "invalid_project";
      readonly status: 400 | 403 | 404;
    };

export const resolveAgentRunDispatchProject = async (input: {
  readonly body: AgentRunDispatchBody;
  readonly requesterUserId: string;
  readonly targetDeviceId: string | null;
}): Promise<ResolvedAgentRunDispatchProject> => {
  const gate = await requireProjectIdForCreate({
    actorUserId: input.requesterUserId,
    projectId: input.body.projectId,
  });
  if (!gate.ok) {
    return {
      ok: false,
      errorMessage: gate.error,
      code: gate.code,
      status: gate.status,
    };
  }

  const project = await getUserProjectById(gate.projectId);
  if (project === null) {
    return {
      ok: false,
      errorMessage:
        "Project not found. Refresh the project list and try again.",
      code: "not_found",
      status: 404,
    };
  }

  if (
    input.targetDeviceId !== null &&
    input.targetDeviceId.length > 0 &&
    project.deviceId !== null &&
    project.deviceId.length > 0 &&
    project.deviceId !== input.targetDeviceId
  ) {
    return {
      ok: false,
      errorMessage:
        "This project is stored on a different Mac. Open Agent Witch on that Mac to run tasks in this repository.",
      code: "invalid_project",
      status: 400,
    };
  }

  const folderPath = project.folderPath.trim();
  if (folderPath.length === 0 || !isValidProjectFolderPath(folderPath)) {
    return {
      ok: false,
      errorMessage:
        "This project has no folder set yet. Choose a folder on the Mac that stores this project.",
      code: "invalid_project",
      status: 400,
    };
  }

  return {
    ok: true,
    projectId: gate.projectId,
    projectFolderPath: folderPath,
  };
};

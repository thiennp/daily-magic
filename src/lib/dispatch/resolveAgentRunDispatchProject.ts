import { getUserProjectById } from "@/lib/projects/userProjectQueries";
import { isValidProjectFolderPath } from "@/lib/projects/validateProjectFolderPath";
import type { AgentRunDispatchBody } from "@/lib/dispatch/parseAgentRunDispatchBody";

export type ResolvedAgentRunDispatchProject =
  | {
      readonly ok: true;
      readonly projectId: string;
      readonly projectFolderPath: string;
    }
  | { readonly ok: false; readonly errorMessage: string };

export const resolveAgentRunDispatchProject = async (input: {
  readonly body: AgentRunDispatchBody;
  readonly requesterUserId: string;
  readonly targetDeviceId: string | null;
}): Promise<ResolvedAgentRunDispatchProject> => {
  const projectId = input.body.projectId?.trim() ?? "";

  if (projectId.length === 0) {
    const hintedPath = input.body.projectFolderPath?.trim() ?? "";
    if (hintedPath.length === 0) {
      return { ok: true, projectId: "", projectFolderPath: "" };
    }
    if (!isValidProjectFolderPath(hintedPath)) {
      return {
        ok: false,
        errorMessage: "Invalid project folder path.",
      };
    }
    return { ok: true, projectId: "", projectFolderPath: hintedPath };
  }

  const project = await getUserProjectById(projectId);
  if (project === null) {
    return {
      ok: false,
      errorMessage:
        "Project not found. Refresh the project list and try again.",
    };
  }

  if (project.ownerUserId !== input.requesterUserId) {
    return {
      ok: false,
      errorMessage: "You do not have access to this project.",
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
    };
  }

  const folderPath = project.folderPath.trim();
  if (folderPath.length === 0 || !isValidProjectFolderPath(folderPath)) {
    return {
      ok: false,
      errorMessage:
        "This project has no folder set yet. Choose a folder on the Mac that stores this project.",
    };
  }

  return {
    ok: true,
    projectId,
    projectFolderPath: folderPath,
  };
};

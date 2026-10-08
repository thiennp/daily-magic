import { requireAuth } from "@/lib/auth/requireAuth";
import { authorizeProjectOwner } from "@/lib/projects/acl/authorizeProjectOwner";
import { projectAccessErrorJson } from "@/lib/projects/acl/mapProjectAccessError";
import {
  isProjectConnectionsFeatureEnabled,
  resolveProjectConnectionsAuthSecret,
} from "@/lib/projects/connections/isProjectConnectionsFeatureEnabled";
import { projectConnectionsUnavailableJson } from "@/lib/projects/connections/projectConnectionsUnavailableJson";

/** Feature gate + session + project-owner check shared by the task-sync routes. */
export const guardTaskSyncOwner = async (
  projectId: string,
): Promise<Response | null> => {
  if (
    !isProjectConnectionsFeatureEnabled() ||
    resolveProjectConnectionsAuthSecret() === null
  ) {
    return projectConnectionsUnavailableJson();
  }
  const { actor, error } = await requireAuth();
  if (error || !actor) return error;
  const owner = await authorizeProjectOwner({
    projectId,
    actorUserId: actor.id,
  });
  if (owner.allow) return null;
  return projectAccessErrorJson(
    owner.reason,
    owner.reason === "not_found" ? 404 : 403,
  );
};

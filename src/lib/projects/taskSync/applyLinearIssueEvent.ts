import { applyLinearPull } from "@/lib/projects/taskSync/applyLinearPull";
import { importLinearIssue } from "@/lib/projects/taskSync/importLinearIssue";
import { loadLinkByExternalId } from "@/lib/projects/taskSync/taskExternalLinkQueries";
import type {
  ParsedTaskWebhook,
  TaskSyncSettings,
} from "@/lib/projects/taskSync/taskSync.types";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

export type LinearUpsertEvent = Extract<
  ParsedTaskWebhook,
  { readonly kind: "upsert" }
>;

/**
 * One Linear issue state (from the webhook or from "Sync now" pull) -> AW task,
 * through the same loop-guarded path. Returns an outcome code.
 */
export const applyLinearIssueEvent = async (input: {
  readonly projectId: string;
  readonly settings: TaskSyncSettings;
  readonly event: LinearUpsertEvent;
}): Promise<string> => {
  const { projectId, settings, event } = input;
  if (event.teamId !== settings.externalTeamId) return "other_team";
  const project = await getUserProjectById(projectId);
  if (project === null) return "project_not_found";
  const link = await loadLinkByExternalId({
    projectId,
    provider: "linear",
    externalId: event.ref.externalId,
  });
  if (link === null) {
    if (!settings.importNew) return "not_linked";
    return importLinearIssue({
      projectId,
      ownerUserId: project.ownerUserId,
      ref: event.ref,
      fields: event.fields,
      descriptionClipped: event.descriptionClipped,
    });
  }
  return applyLinearPull({
    projectId,
    ownerUserId: project.ownerUserId,
    link,
    pulled: event.fields,
    labelsKnown: event.labelsKnown,
    descriptionClipped: event.descriptionClipped,
  });
};

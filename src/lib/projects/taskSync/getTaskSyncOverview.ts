import {
  listLinearTeams,
  type LinearTeam,
} from "@/lib/projects/taskSync/linearTeamOperations";
import { listLinksByProject } from "@/lib/projects/taskSync/taskExternalLinkQueries";
import { loadTaskSyncSettings } from "@/lib/projects/taskSync/taskSyncSettingsQueries";
import {
  loadLinearAccessToken,
  withLinearAccessToken,
} from "@/lib/projects/taskSync/withLinearAccessToken";

export type TaskSyncOverview = {
  readonly provider: "linear";
  readonly connected: boolean;
  readonly enabled: boolean;
  readonly externalTeamId: string | null;
  readonly importNew: boolean;
  readonly webhookActive: boolean;
  readonly lastError: string | null;
  readonly lastSyncedAt: string | null;
  readonly linkedCount: number;
  readonly teams: readonly LinearTeam[];
};

/** Settings (no secrets) + link count + selectable Linear teams. */
export const getTaskSyncOverview = async (
  projectId: string,
): Promise<TaskSyncOverview> => {
  const [settings, links, token] = await Promise.all([
    loadTaskSyncSettings(projectId, "linear"),
    listLinksByProject(projectId, "linear"),
    loadLinearAccessToken(projectId),
  ]);
  const teams =
    token === null
      ? []
      : ((await withLinearAccessToken(projectId, listLinearTeams).catch(
          () => null,
        )) ?? []);
  return {
    provider: "linear",
    connected: token !== null,
    enabled: settings?.enabled ?? false,
    externalTeamId: settings?.externalTeamId ?? null,
    importNew: settings?.importNew ?? false,
    webhookActive: settings?.webhookId != null,
    lastError: settings?.lastError ?? null,
    lastSyncedAt: settings?.lastSyncedAt ?? null,
    linkedCount: links.length,
    teams,
  };
};

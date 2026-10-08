import type {
  LinearTaskSyncBatch,
  LinearTaskSyncState,
  LinearTaskSyncTeam,
} from "@/features/projects/settings/connections/projectTaskSync.types";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const parseTeams = (value: unknown): readonly LinearTaskSyncTeam[] =>
  Array.isArray(value)
    ? value.flatMap((entry): readonly LinearTaskSyncTeam[] =>
        isRecord(entry) &&
        typeof entry.id === "string" &&
        typeof entry.name === "string"
          ? [{ id: entry.id, name: entry.name }]
          : [],
      )
    : [];

const asStringOrNull = (value: unknown): string | null =>
  typeof value === "string" ? value : null;

export const parseLinearTaskSyncState = (
  data: unknown,
): LinearTaskSyncState | null => {
  if (!isRecord(data) || data.ok !== true) return null;
  return {
    connected: data.connected === true,
    enabled: data.enabled === true,
    externalTeamId: asStringOrNull(data.externalTeamId),
    importNew: data.importNew === true,
    webhookActive: data.webhookActive === true,
    lastError: asStringOrNull(data.lastError),
    lastSyncedAt: asStringOrNull(data.lastSyncedAt),
    linkedCount: typeof data.linkedCount === "number" ? data.linkedCount : 0,
    teams: parseTeams(data.teams),
  };
};

const count = (value: unknown): number =>
  typeof value === "number" && Number.isFinite(value) ? value : 0;

export const parseLinearTaskSyncBatch = (
  data: unknown,
): LinearTaskSyncBatch | null =>
  isRecord(data) && data.ok === true
    ? {
        pushed: count(data.pushed),
        failed: count(data.failed),
        remaining: count(data.remaining),
      }
    : null;

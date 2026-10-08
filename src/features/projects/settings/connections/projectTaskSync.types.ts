export type LinearTaskSyncTeam = { readonly id: string; readonly name: string };

/** Body of GET/PUT /task-sync/linear. */
export type LinearTaskSyncState = {
  readonly connected: boolean;
  readonly enabled: boolean;
  readonly externalTeamId: string | null;
  readonly importNew: boolean;
  readonly webhookActive: boolean;
  readonly lastError: string | null;
  readonly lastSyncedAt: string | null;
  readonly linkedCount: number;
  readonly teams: readonly LinearTaskSyncTeam[];
};

export type LinearTaskSyncUpdate = {
  readonly enabled?: boolean;
  readonly externalTeamId?: string | null;
  readonly importNew?: boolean;
};

export type LinearTaskSyncBatch = {
  readonly pushed: number;
  readonly failed: number;
  readonly remaining: number;
};

export type TaskSyncFailureReason =
  "unavailable" | "team_required" | "not_connected" | "sync_disabled" | "error";

export type TaskSyncResult<T> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly reason: TaskSyncFailureReason };

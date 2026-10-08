/** v1 providers — LOCK / API-BRIEF (incl. Notion + Google Drive). */
export type ProjectConnectionProvider =
  "slack" | "linear" | "gmail" | "github" | "notion" | "google_drive";

/** UI status; API `revoked` maps to `none`. */
export type ProjectConnectionStatus =
  "connected" | "expired" | "error" | "none";

export type ProjectConnectionItem = {
  readonly provider: ProjectConnectionProvider;
  readonly status: ProjectConnectionStatus;
  readonly accountLabel: string | null;
  readonly connectedAt: string | null;
  /** False = shared OAuth app not ready, shown as Coming soon. */
  readonly connectEnabled: boolean;
};

export type ProjectConnectionsLoadState =
  "loading" | "ready" | "unavailable" | "error";

export type ProjectConnectionsFetchResult =
  | { readonly ok: true; readonly items: readonly ProjectConnectionItem[] }
  | { readonly ok: false; readonly reason: "unavailable" | "error" };

/** v1 providers — LOCK / API-BRIEF. */
export type ProjectConnectionProvider =
  | "slack"
  | "linear"
  | "gmail"
  | "github";

/** UI status; API `revoked` maps to `none`. */
export type ProjectConnectionStatus =
  | "connected"
  | "expired"
  | "error"
  | "none";

export type ProjectConnectionItem = {
  readonly provider: ProjectConnectionProvider;
  readonly status: ProjectConnectionStatus;
  readonly accountLabel: string | null;
  readonly connectedAt: string | null;
};

export type ProjectConnectionsLoadState =
  | "loading"
  | "ready"
  | "unavailable"
  | "error";

export type ProjectConnectionsFetchResult =
  | { readonly ok: true; readonly items: readonly ProjectConnectionItem[] }
  | { readonly ok: false; readonly reason: "unavailable" | "error" };

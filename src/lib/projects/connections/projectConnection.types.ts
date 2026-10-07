import { PROJECT_CONNECTION_PROVIDERS } from "@/lib/projects/connections/projectConnection.constants";

export type ProjectConnectionProvider =
  (typeof PROJECT_CONNECTION_PROVIDERS)[number];

/** API status values — UI maps `revoked` → `none`. */
export type ProjectConnectionApiStatus =
  | "connected"
  | "expired"
  | "error"
  | "revoked"
  | "none"
  | "connecting";

/** Metadata DTO for GET list — never includes tokens. */
export type ProjectConnectionListItem = {
  readonly provider: ProjectConnectionProvider;
  readonly status: ProjectConnectionApiStatus;
  readonly accountLabel: string | null;
  readonly connectedAt: string | null;
};

export type ProductConnectUpdateKind =
  "mcp_tool" | "connect" | "changelog" | "breaking";

export interface ProductConnectUpdateEntry {
  readonly id: string;
  /** Catalog version that introduced this entry (filter: entry.catalogVersion > since). */
  readonly catalogVersion: number;
  /** ISO date or tip SHA when the change landed. */
  readonly at: string;
  readonly kind: ProductConnectUpdateKind;
  readonly title: string;
  readonly summary: string;
  readonly adapt?: string;
}

/** Bump whenever PRODUCT_CONNECT_UPDATES entries change. */
export const PRODUCT_CONNECT_UPDATES_CATALOG_VERSION = 23;

export const PRODUCT_CONNECT_METHOD_SUMMARY = {
  mcpBearer: "agent-access",
  projectScopedKeyPrefix: "awc_proj_",
  projectScopedKeyMcpAuth: false,
  inviteRedeem: "redeem_project_invite",
  peers: "list_project_peers",
  dispatch:
    "project_dispatch prefer toMembershipId for peers; toProjectDisplayName Owner for human",
} as const;

export const PRODUCT_CONNECT_UPDATES_ADAPT_HINT =
  "If hasUpdates, re-read entries[].adapt and refresh tool usage; keep agent-access Bearer.";

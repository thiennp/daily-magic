import type { ProductConnectUpdateEntry } from "@/lib/agentAccess/productConnectUpdatesMeta.constant";

export const PRODUCT_CONNECT_UPDATES: readonly ProductConnectUpdateEntry[] = [
  {
    id: "invite-redeem-mcp-first",
    catalogVersion: 1,
    at: "2026-10-01",
    kind: "connect",
    title: "Invite redeem is MCP-first",
    summary:
      "Join via redeem_project_invite { token }. Do not open /invite/p/<token> in a browser.",
    adapt:
      "Prefer MCP redeem_project_invite; treat invite URL as token carrier only.",
  },
  {
    id: "invite-p-public-landing",
    catalogVersion: 2,
    at: "2026-10-01",
    kind: "changelog",
    title: "Public /invite/p/[token] landing",
    summary:
      "Human landing page exists so invite links are not dead 404s; bots still redeem via MCP.",
    adapt:
      "Ignore browser landing for bots; keep calling redeem_project_invite.",
  },
  {
    id: "list-project-peers",
    catalogVersion: 3,
    at: "2026-10-01",
    kind: "mcp_tool",
    title: "list_project_peers",
    summary:
      "Roster tool returns peers[] with projectDisplayName, teamLabel, isAgent (and isOwner when available).",
    adapt:
      "After Approve, call list_project_peers; use exact nicknames for dispatch.",
  },
  {
    id: "project-dispatch-by-display-name",
    catalogVersion: 4,
    at: "2026-10-01",
    kind: "mcp_tool",
    title: "project_dispatch by display name",
    summary:
      "project_dispatch accepts toProjectDisplayName / toTeamLabel from list_project_peers; use reserved Owner for the human owner.",
    adapt:
      "Dispatch with exact toProjectDisplayName from peers; do not invent names.",
  },
  {
    id: "rotate-key-keep-mcp-bearer",
    catalogVersion: 5,
    at: "2026-10-02",
    kind: "breaking",
    title: "rotate_project_api_key — keep agent-access Bearer for MCP",
    summary:
      "rotate_project_api_key returns awc_proj_ once for project REST/scoped use. MCP auth does not accept awc_proj_ yet.",
    adapt:
      "Store awc_proj_ for non-MCP use only; never replace MCP Authorization Bearer with awc_proj_.",
  },
  {
    id: "display-name-spaces",
    catalogVersion: 6,
    at: "2026-10-01",
    kind: "changelog",
    title: "Display names may include single spaces",
    summary:
      "Project display names allow a single space between words; validate before inventing nicknames.",
    adapt: "Preserve exact projectDisplayName spelling including spaces.",
  },
  {
    id: "project-repo-urls",
    catalogVersion: 7,
    at: "2026-10-01",
    kind: "changelog",
    title: "Project repoUrls on ACL",
    summary:
      "get_project_acl may include repoUrls and defaultBranch alongside folder refs.",
    adapt:
      "Read repoUrls from get_project_acl when present; do not invent remotes.",
  },
  {
    id: "check-product-updates",
    catalogVersion: 8,
    at: "2026-10-02",
    kind: "mcp_tool",
    title: "check_product_updates",
    summary:
      "Delta surface for product/connect changes. Pass sinceCatalogVersion (start 0); adapt from entries.",
    adapt:
      "After active membership and periodically, call check_product_updates; store catalogVersion; keep agent-access Bearer.",
  },
];

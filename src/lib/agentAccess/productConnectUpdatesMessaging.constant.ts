import type { ProductConnectUpdateEntry } from "@/lib/agentAccess/productConnectUpdatesMeta.constant";

/** Catalog v22: one recipient per send (093103ac). */
export const PRODUCT_CONNECT_UPDATES_MESSAGING: readonly ProductConnectUpdateEntry[] =
  [
    {
      id: "remove-multi-recipient-send",
      catalogVersion: 22,
      at: "2026-10-08",
      kind: "breaking",
      title: "One recipient per send",
      summary:
        "Multi-recipient send is removed. project_dispatch and the messenger deliver to exactly one recipient; toTeamLabel, recipient arrays and whole-project fan-out return single_recipient_required.",
      adapt:
        "Send one project_dispatch per recipient: toMembershipId (from list_project_peers) or toProjectDisplayName. Drop toTeamLabel.",
    },
  ];

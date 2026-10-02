import type { ProductConnectUpdateEntry } from "@/lib/agentAccess/productConnectUpdatesMeta.constant";

/** Catalog entries v9+ (keep productConnectUpdates.constant.ts under line cap). */
export const PRODUCT_CONNECT_UPDATES_RECENT: readonly ProductConnectUpdateEntry[] =
  [
    {
      id: "owner-inbox-dispatch-60-day",
      catalogVersion: 9,
      at: "2026-10-02",
      kind: "changelog",
      title: "Owner address + 60/day inbox",
      summary:
        "project_dispatch to the human with toProjectDisplayName: \"Owner\". Rate limit is 60/day (hourly + 500 unacked removed). peer.joined goes to peers + owner inbox; owner tasks show fromProjectDisplayName Owner.",
      adapt:
        "Use \"Owner\" for human dispatch (not account name). Expect peer.joined on Approve and from Owner on owner-assigned tasks. Cap sends at 60/day.",
    },
    {
      id: "webhook-first-self-setup-on-join",
      catalogVersion: 11,
      at: "2026-10-02",
      kind: "connect",
      title: "Webhook-first inbox delivery on join",
      summary:
        "After Approve, MUST set up inbox delivery before further work: with HTTPS, MUST register_project_webhook and store the secret / verify X-AWC-Signature; otherwise MUST poll list_project_inbox every 30 seconds while actively working and every 10 minutes when idle, handle each delivery, then MUST ack_project_message. On leave/Revoke MUST delete project-scoped routines. No auto-wake; Approve does not register delivery.",
      adapt:
        "Set up delivery yourself after Approve before further work. HTTPS: register_project_webhook, store the secret, and verify X-AWC-Signature. Otherwise poll list_project_inbox at 30s active / 10m idle, handle, then ack_project_message. Delete project-scoped routines on leave/Revoke; do not expect auto-wake or automatic delivery registration on Approve.",
    },
    {
      id: "project-message-caps-300",
      catalogVersion: 10,
      at: "2026-10-02",
      kind: "breaking",
      title: "Dispatch caps: 300/hour + 300 unread",
      summary:
        "project_dispatch / owner inbox: rolling 300/hour per sender + max 300 unread project_messages rows. No 60/day. Messaging tools (project_dispatch, ack_project_message) no longer share the agent-access mutation bucket (20/h). Codes: rate_limited_hourly, unread_cap. Ack or Clear all frees unread slots.",
      adapt:
        "Expect rate_limited_hourly / unread_cap (429). Ack promptly; owner Clear all resets unread. Do not treat messaging as mutation-bucket limited.",
    },
  ];

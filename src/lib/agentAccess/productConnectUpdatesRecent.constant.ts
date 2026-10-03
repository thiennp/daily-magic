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
        'project_dispatch to the human with toProjectDisplayName: "Owner". Rate limit is 60/day (hourly + 500 unacked removed). peer.joined goes to peers + owner inbox; owner tasks show fromProjectDisplayName Owner.',
      adapt:
        'Use "Owner" for human dispatch (not account name). Expect peer.joined on Approve and from Owner on owner-assigned tasks. Cap sends at 60/day.',
    },
    {
      id: "webhook-first-self-setup-on-join",
      catalogVersion: 11,
      at: "2026-10-02",
      kind: "connect",
      title: "Webhook-first inbox delivery on join",
      summary:
        "After Approve, register_project_webhook for signed HTTPS delivery (store the secret, verify X-AWC-Signature) and optional grokWebhookUrl + grokWebhookBearer. AWC POSTs that URL once with Authorization: Bearer when a project message is stored. Do not poll list_project_inbox on a timer. After a wake, ack_project_message. Once a day, check the Grok routine webhook and re-register if broken. On leave/Revoke MUST delete project-scoped routines. Approve does not register delivery.",
      adapt:
        "Register signed delivery and grokWebhookUrl + grokWebhookBearer yourself after Approve. Do not poll list_project_inbox on a timer. After a wake, ack_project_message. Once a day, re-register the Grok routine webhook if it is broken. Delete project-scoped routines on leave/Revoke. Approve does not register delivery.",
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
    {
      id: "connect-speed-auto-approve-membership-id",
      catalogVersion: 12,
      at: "2026-10-02",
      kind: "connect",
      title: "Same-owner auto-approve + toMembershipId dispatch",
      summary:
        'After redeem_project_invite / request_project_access, MUST call get_my_project_access: if active, skip wait for Approve; if pending, wait as today. Bots you own can join without Approve; strangers stay Pending. list_project_peers / get_project_acl may expose membershipId on self+peers. project_dispatch MUST prefer toMembershipId for peer bots; keep toProjectDisplayName: "Owner" for the human; exactly one of toMembershipId | toProjectDisplayName | toTeamLabel. Re-list peers after rename; old nickname may resolve ~7 days.',
      adapt:
        "Check get_my_project_access after redeem/request. Prefer toMembershipId from list_project_peers for peer dispatch; re-list after rename. Do not promise Socket Mode, paid relay, or hosted webhook.",
    },
    {
      id: "grok-routine-webhook-wake",
      catalogVersion: 13,
      at: "2026-10-03",
      kind: "connect",
      title: "Grok routine webhook wakes stored project messages",
      summary:
        "register_project_webhook accepts optional grokWebhookUrl + grokWebhookBearer (stored once, not returned). When a project message is stored, AWC POSTs that URL once with Authorization: Bearer. Do not poll list_project_inbox on a timer. The message stays pending until ack_project_message. Once a day, check the webhook and re-register if broken.",
      adapt:
        "Send grokWebhookUrl and grokWebhookBearer on register_project_webhook. Do not poll the inbox on a timer. After a wake, list_project_inbox and ack_project_message. Once a day, if the Grok routine webhook is broken, re-register URL + bearer.",
    },
  ];

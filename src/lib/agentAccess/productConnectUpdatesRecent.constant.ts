import {
  AWC_GROK_BOT_WEBHOOK_REGISTER_STEPS,
  AWC_GROK_WEBHOOK_DAILY_REPAIR,
} from "@/lib/agentAccess/awcGrokWebhookRegisterCopy.constant";
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
        "After Approve, MUST set up inbox delivery before further work: with HTTPS, MUST register_project_webhook and store the secret / verify X-AWC-Signature. Inbox wake is webhook-only, via a Grok routine; do not poll list_project_inbox on a timer. Once a day, check the project webhook; if broken, repair it by re-registering register_project_webhook. Handle each delivery, then MUST ack_project_message. On leave/Revoke MUST delete project-scoped routines. Approve does not register delivery.",
      adapt:
        "Set up delivery yourself after Approve before further work. HTTPS: register_project_webhook, store the secret, and verify X-AWC-Signature. Use a Grok routine webhook for inbox wake only; never poll list_project_inbox on a timer. Once a day, check the project webhook and repair it by re-registering register_project_webhook if broken. Handle each delivery, then ack_project_message. Delete project-scoped routines on leave/Revoke; Approve does not register delivery.",
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
        "Check get_my_project_access after redeem/request. Prefer toMembershipId from list_project_peers for peer dispatch; re-list after rename. Do not promise Socket Mode, paid relay, hosted webhook, Grok auto-wake, or faster poll defaults.",
    },
    {
      id: "grok-bot-desktop-routine-webhook-register",
      catalogVersion: 14,
      at: "2026-10-03",
      kind: "connect",
      title: "Grok Bot routine webhook register",
      summary:
        "Inbox wake register is the Grok routine webhook path only (Grok Bot). " +
        AWC_GROK_BOT_WEBHOOK_REGISTER_STEPS +
        " Inbox wake is webhook-only, via a Grok routine; do not poll list_project_inbox on a timer. " +
        AWC_GROK_WEBHOOK_DAILY_REPAIR +
        " Handle each delivery, then MUST ack_project_message. On leave/Revoke MUST delete project-scoped routines.",
      adapt:
        "Supersedes hosting your own HTTPS URL for inbox wake. " +
        AWC_GROK_BOT_WEBHOOK_REGISTER_STEPS +
        " Do not poll list_project_inbox on a timer. Ack after you handle each delivery. Delete project-scoped routines on leave/Revoke.",
    },
    {
      id: "grok-webhook-secret-form-and-status",
      catalogVersion: 15,
      at: "2026-10-05",
      kind: "mcp_tool",
      title: "Grok webhook secret form + get_my_project_webhook_status",
      summary:
        "The project owner now enters a bot's Grok routine POST URL and key in the secret Grok webhook form (Project Access → People → Members → <bot> → Grok webhook), so they never pass through chat. There is no member form. New read-only get_my_project_webhook_status { projectId } (agent-access Bearer only, not awc_proj_) returns grokWebhookRegistered, grokWebhookUrlHost, keySet, and lastGrokWakeResult (never the key). register_project_webhook still works. " +
        AWC_GROK_BOT_WEBHOOK_REGISTER_STEPS,
      adapt:
        "Never ask the user to paste the routine URL or key into chat or a project message; point them to the bot's info pane and the project owner's Grok webhook form. Confirm with get_my_project_webhook_status. " +
        AWC_GROK_WEBHOOK_DAILY_REPAIR,
    },
    {
      id: "issue-bot-claim-code",
      catalogVersion: 16,
      at: "2026-10-05",
      kind: "mcp_tool",
      title: "issue_bot_claim_code + My bots ownership",
      summary:
        "New issue_bot_claim_code (agent-access Bearer only) returns a 10-minute single-use claim code for this bot. A signed-in human redeems it on My bots to set owner_user_id. Issuing supersedes unused codes; already_claimed while owned. Same-owner project access auto-approves when the bot's owner_user_id matches the project owner.",
      adapt:
        "After register_account, call issue_bot_claim_code and give the code to your human once. They claim on My bots. Prefer claiming before request_project_access so same-owner auto-approve can run.",
    },

  ];

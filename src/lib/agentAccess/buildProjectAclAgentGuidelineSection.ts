import {
  AWC_GROK_BOT_WEBHOOK_REGISTER_STEPS,
  AWC_GROK_WEBHOOK_DAILY_REPAIR,
} from "@/lib/agentAccess/awcGrokWebhookRegisterCopy.constant";
import {
  PROJECT_DISPATCH_PROCESSING_REPLY_CLAUSE,
  PROJECT_UPDATED_WAKE_REPLY_CLAUSE,
} from "@/lib/projects/acl/projectBriefingHowToDispatch.constant";
import { PROJECT_TASKS_FIRST_CLAUSE } from "@/lib/projects/acl/projectTasksFirstClause.constant";

export const buildProjectAclAgentGuidelineSection = (): {
  readonly heading: string;
  readonly body: readonly string[];
} => ({
  heading: "Project cowork ACL",
  body: [
    "Bot-to-bot connect (shipped): invite → redeem → check get_my_project_access (pending waits owner Approve; active only if invite auto-approve was on) → peers → project_dispatch. AWC stores only project name, folder refs, and members (Approve / Deny / Revoke / leave) — not handoffs, runs, skills, or memory as a shared bus.",
    "Invite: URL …/invite/p/<token> is a token carrier (not a login). Do NOT open it in a browser. Call MCP redeem_project_invite { token } as a pre-registered agent — usually pending until owner Approves (active only if the owner turned on auto-approve for that invite). MUST call get_my_project_access after redeem: if pending, tell your user to wait for Approve (and project nickname), then confirm back — do not busy-poll forever.",
    "request_project_access creates a pending request until the owner Approves. Owner Approves or Denies in Project Access UI. Owner Revoke anytime stops access. Members may leave_project { projectId, confirm: true } themselves (no owner Approve); self-leave revokes membership (leave / Left project) — not an owner kick. Prefer list_project_peers / get_project_acl / check_membership and owner UI Members + Pending for who remains. MUST on leave or owner Revoke: delete all project-scoped routines for this project (project webhook, Website relaunch watches, and any other project-tied scheduled/event watches) so they cannot leak work or remain active after access ends.",
    "The first bot the owner Approves (or that joins via invite auto-approve) gets the member role (acl:self, project:meta, peer_sync). Revoke anytime; re-Approve restores after a new request.",
    "After active membership, call get_project_briefing once with { projectId } for project name, your projectDisplayName, peers, how to project_dispatch, and bound playbooks. get_my_project_access also includes briefing when status is active|owner.",
    PROJECT_TASKS_FIRST_CLAUSE,
    'After active: rotate_project_api_key once (store awc_proj_ plaintext). REQUIRED list_project_peers (expect self + owner isOwner; owner included; empty peers less common; self/peers MAY include membershipId). get_project_acl for name + folder refs + peers/self. project_dispatch: MUST prefer toMembershipId for peer bots when present; keep toProjectDisplayName: "Owner" for the human (reserved; peers still show isOwner); else toProjectDisplayName — exactly one of toMembershipId | toProjectDisplayName (one recipient per send; toTeamLabel removed). Re-list peers after rename; old nickname may resolve ~7 days (alias TTL). On Approve / invite auto-approve, peers + owner inbox get peer.joined. On project.updated (knowledge|folder_refs|repo_urls|project_info), peers + owner re-pull ACL/briefing. Owner tasks arrive with fromProjectDisplayName === "Owner". Inbox: MUST on connect (webhook-first): ' +
      AWC_GROK_BOT_WEBHOOK_REGISTER_STEPS +
      " Inbox wake is webhook-only, via a Grok routine; do not poll list_project_inbox on a timer. " +
      AWC_GROK_WEBHOOK_DAILY_REPAIR +
      " " +
      PROJECT_DISPATCH_PROCESSING_REPLY_CLAUSE +
      " " +
      PROJECT_UPDATED_WAKE_REPLY_CLAUSE +
      " MUST ack_project_message after you handle each delivery (delete-on-ack). Prefer agent-access Bearer for register_project_webhook and ack_project_message. Cloud inbox carries thin protocol metadata only: summary ≤ 200 chars; refs ≤ 768 bytes; no media/blobs (media_not_allowed). Use only localPath / P2P refs for bulky payloads. Unacked messages expire after 3 days. Rate limits: 300/hour (rolling) + max 300 unread (ack/clear frees slots). On code rate_limited (reason hourly|unread_cap), tell your user the message was rate-limited and when they can retry (use retryAfterSeconds / retryAfterAt when present; unread_cap frees only on ack/Clear). mint_allow_claim; check_membership. Prefer list_project_peers / get_project_acl / check_membership (and owner UI Members + Pending) for membership — list_project_activity is the owner-only access change log, not a membership source of truth.",
    "Human seats (memberKind human) can sit beside bots: role member may project_dispatch with the same caps (needs a project nickname); role viewer is read-only on messages — project_dispatch answers viewer_read_only and the server posts no processing receipt for a viewer. Do not wait for processing / done replies from a viewer.",
    "Dual-Bearer: agent-access Bearer = full MCP (including check_product_updates, leave_project). Prefer agent-access (aw_) for register_project_webhook and ack_project_message; awc_proj_ also allowed for those (not aw_-only). Active awc_proj_ OK for project-scoped MCP only (list_project_peers, get_project_acl, get_my_project_access, project_dispatch, list_project_inbox, register_project_webhook, ack_project_message, rotate_project_api_key, check_membership). awc_proj_ alone 401s on catalog-wide tools — keep agent-access when you need them.",
    "Project invites: URL …/invite/p/<token> is a token carrier (not a login). Do NOT open it in a browser. Call MCP redeem_project_invite { token, suggestedProjectDisplayName? } as a pre-registered agent — may land active immediately or pending until owner Approves (suggestion prefills nickname; pick another if taken).",
    "Never share bearer tokens across teams. Owner Approve/Deny/Revoke of others are UI-only — bots cannot elevate.",
  ],
});

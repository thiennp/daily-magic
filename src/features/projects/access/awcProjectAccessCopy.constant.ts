import { PROJECT_ACL_FIRST_CONNECT } from "@/lib/projects/acl/projectAclFirstConnect.constant";

export const AWC_PROJECT_ACCESS_COPY = {
  title: "Project Access",
  intro:
    "Agent Witch Cloud is an ACL + registry for this project: name, folder refs, members, invites, and approve/revoke audit only. After Approve, co-work is local↔local (shared folder, git, or bot channels) — not a cloud content bus. Do not share agent-access tokens.",
  pendingHeading: "Pending requests",
  pendingEmpty: "No pending access requests.",
  membersHeading: "Members",
  membersEmpty: `No approved members yet. ${PROJECT_ACL_FIRST_CONNECT.emptyStateNote}`,
  folderRefsHeading: "Folder refs",
  folderRefsHint:
    "Many machines × many folders. Paths only — project files stay on local machines.",
  folderRefsEmpty: "No folder refs yet. Add machine + folder path strings.",
  approve: "Approve",
  deny: "Deny",
  revoke: "Revoke",
  revokeHint:
    "Revoke anytime. Access is denied immediately on the next ACL check. Re-Approve restores membership after a new request.",
  addFolderRef: "Add folder ref",
  machineRefPlaceholder: "Machine or device ref",
  folderPathPlaceholder: "Folder path",
  remove: "Remove",
  firstConnectRole: PROJECT_ACL_FIRST_CONNECT.role,
  firstConnectNote: PROJECT_ACL_FIRST_CONNECT.emptyStateNote,
  activityHeading: "Activity",
  activityHonesty:
    "Membership and status events via list_project_activity / GET …/activity — not a cloud content store.",
  activityFilterLabel: "Filter",
  activityFilterAll: "All types",
  activityLoading: "Loading activity…",
  activityEmpty: "No membership or status events yet.",
  activityUnavailable:
    "Activity API not available on this deploy yet — membership and status events will appear here once the backend lands.",
  activityNonGoals:
    "No transcripts, run logs, or prompt bodies — those stay on local machines.",
  displayNameLabel: "Project nickname for bots",
  displayNameHint:
    "Required for agent Approve. Unique per project (case-insensitive). Humans keep their account name.",
  displayNameReroll: "Pick another",
  displayNameMissing: "Choose a project nickname before Approve.",
  displayNameTaken: "That nickname is taken — pick another available name.",
  rename: "Rename",
  renameSave: "Save nickname",
  renameCancel: "Cancel",
  unnamedAgent: "Unnamed agent",
  memberUuidMuted: "User id",
  invitesHeading: "Bot invites",
  invitesIntro:
    "Create a one-time invite URL for a specialist bot. The bot redeems with its own agent principal → pending until you Approve and set a project nickname. Never paste or share your agent-access token — invite URL → scoped project key only.",
  invitesCreate: "Create invite",
  invitesCreating: "Creating…",
  invitesEmpty: "No invites yet.",
  invitesCopyUrl: "Copy invite URL",
  invitesCopied: "Invite URL copied.",
  invitesRevoke: "Revoke",
  invitesCreatedOnce:
    "Copy this URL now — the raw token is shown only once and is never listed again.",
  invitesDefaults: "Defaults: max uses 1 · expires in 7 days · owner session only.",
  invitesLoadError: "Invites API not available yet — create/list will work once eng lands.",
  invitesCreateError: "Could not create invite (no fake success).",
  invitesRevokeError: "Could not revoke invite.",
  hooksHeading: "Join hooks status",
  hooksStatus:
    "Webhook optional · inbox poll always · dispatch by project nickname. Bot↔bot plane lands with eng API — chrome only until then.",
  hooksPendingNote:
    "Redeem → pending until Approve + nickname. Scoped key mint on Approve after name is set.",
} as const;

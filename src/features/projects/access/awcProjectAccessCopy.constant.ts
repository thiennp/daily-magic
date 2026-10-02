import { PROJECT_ACL_FIRST_CONNECT } from "@/lib/projects/acl/projectAclFirstConnect.constant";

export const AWC_PROJECT_ACCESS_COPY = {
  title: "Project Access",
  intro:
    "Agent Witch Cloud is an ACL + registry for this project: name, folder refs, members, and approve/revoke audit only. After Approve, co-work is local↔local (shared folder, git, or bot channels) — not a cloud content bus. Do not share agent-access tokens — use invite links + project-scoped keys.",
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
  activityToggleShow: "Show activity",
  activityToggleHide: "Hide activity",
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
  invitesHeading: "Bot invites",
  invitesIntro:
    "Create a one-time invite URL for a specialist bot. Redeem creates a pending request — you Approve and pick a project nickname. Never paste your agent-access token.",
  invitesEmpty: "No invites yet.",
  invitesCreate: "Create invite",
  invitesCopyUrl: "Copy link",
  invitesCopyPrompt: "Copy prompt",
  invitesRevoke: "Revoke",
  invitesUrlCopied: "Invite URL copied — share once; it will not be shown again.",
  invitesPromptCopied: "Prompt copied",
  invitesTokenOnceNote:
    "Redeem token/link is shown once at create — you cannot copy it again from this list.",
  invitesActiveHeading: "Active invites",
  invitesInactiveHeading: "Inactive invites",
  invitesStatusUsedUp: "used up",
  invitesStatusExpired: "expired",
  invitesStatusRevoked: "revoked",
  invitesCreatedOnce:
    "Copy link (for humans) or Copy prompt (for an agent MCP redeem) now. Shown once — bearer secret.",
  displayNameLabel: "Project nickname (bots)",
  displayNameHint:
    "Required for agents. Unique per project (case-insensitive). 2–32 letters, single spaces OK. Prefills a free preset.",
  displayNameRequired: "Enter a project nickname before Approve.",
  displayNameTaken: "That project nickname is already taken.",
  rename: "Rename",
  renameSave: "Save nickname",
  renameCancel: "Cancel",
  renameHint: "2–32 letters, single spaces OK",
  memberUuidMuted: "id",
  memberNoNickname: "No nickname",
  loading: "Loading Project Access…",
  forbidden:
    "Only the project owner can manage Project Access for this project.",
  loadFailed: "Could not load Project Access.",
} as const;

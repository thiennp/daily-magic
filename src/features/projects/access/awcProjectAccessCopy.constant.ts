import { PROJECT_ACL_FIRST_CONNECT } from "@/lib/projects/acl/projectAclFirstConnect.constant";

export const AWC_PROJECT_ACCESS_COPY = {
  eyebrow: "Collaboration",
  title: "Project Access",
  intro:
    "Invite bots, approve members, read their messages, and assign thin tasks. Cloud stores ACL + thin inbox only — playbooks and files stay on local machines.",
  peopleHeading: "People",
  peopleHint: "Pending requests and approved members for this project.",
  pendingHeading: "Pending",
  pendingEmpty: "No pending access requests.",
  membersHeading: "Members",
  membersEmpty: `No approved members yet. ${PROJECT_ACL_FIRST_CONNECT.emptyStateNote}`,
  folderRefsHeading: "Folder refs",
  folderRefsHint:
    "Map machines to local folders (many × many). Registry only — files stay on those machines.",
  folderRefsEmpty:
    "No folder refs yet. Register a machine (or device) and a local folder path below.",
  folderRefsFormHint:
    "Each ref is a machine id/label + path string. AWC stores the mapping, not the files.",
  machineRefLabel: "Machine or device",
  machineRefPlaceholder: "e.g. MacBook Pro or device id",
  machineRefHelp: "Which machine holds the folder — label or device id.",
  folderPathLabel: "Folder path",
  folderPathPlaceholder: "e.g. ~/code/daily-magic",
  folderPathHelp: "Absolute or ~ path on that machine.",
  approve: "Approve",
  deny: "Deny",
  revoke: "Revoke",
  revokeHint:
    "Revoke anytime to kick a member — access is denied on the next ACL check. Re-Approve restores membership after a new request.",
  membersLeaveHint:
    "Agent members can leave on their own (leave_project, no owner Approve). Revoke is for kicking; Activity may show leave / Left project (membership revoked) for self-leave — not an owner kick.",
  addFolderRef: "Add folder ref",
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
    "One-time links for specialist bots. Redeem → pending → you Approve with a nickname.",
  invitesEmpty: "No invites yet.",
  invitesCreate: "Create invite",
  invitesCopyUrl: "Copy link",
  invitesCopyPrompt: "Copy prompt",
  invitesRevoke: "Revoke",
  invitesUrlCopied:
    "Invite URL copied — share once; it will not be shown again.",
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

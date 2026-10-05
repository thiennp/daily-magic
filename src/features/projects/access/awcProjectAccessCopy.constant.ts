import { PROJECT_ACL_FIRST_CONNECT } from "@/lib/projects/acl/projectAclFirstConnect.constant";

export const AWC_PROJECT_ACCESS_COPY = {
  eyebrow: "Collaboration",
  title: "Project Access",
  intro:
    "Invite bots, approve who can join, read their messages and send them tasks. Cloud stores who has access, project messages and shared skills (text up to 64 KB each); your files stay on your machines.",
  peopleHeading: "People",
  peopleHint:
    "Pending requests and approved members for this project. Bots you own can join without Approve; others stay Pending.",
  pendingHeading: "Pending",
  pendingEmpty: "No pending access requests.",
  autoApprovedBanner: "Auto-approved — bot joined without Approve.",
  autoApprovedBadge: "Auto-approved",
  membersHeading: "Members",
  membersEmpty: `No approved members yet. ${PROJECT_ACL_FIRST_CONNECT.emptyStateNote}`,
  folderRefsHeading: "Folder refs",
  folderRefsHint:
    "Map machines to local folders (many × many). Registry only — files stay on those machines.",
  folderRefsEmpty:
    "No folder refs yet. Register a machine (or device) and a local folder path below.",
  folderRefsFormHint:
    "Each ref is a machine id/label + path string. Agent Witch Cloud stores the mapping, not the files.",
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
    "Revoke anytime to remove a member — they lose access right away. Approve again after a new request to restore them.",
  membersLeaveHint:
    "Bots can leave a project on their own; use Revoke to remove one. Members shows who is in the project now.",
  addFolderRef: "Add folder ref",
  remove: "Remove",
  firstConnectRole: PROJECT_ACL_FIRST_CONNECT.role,
  firstConnectNote: PROJECT_ACL_FIRST_CONNECT.emptyStateNote,
  invitesHeading: "Bot invites",
  invitesIntro:
    "Invite a bot with a copied prompt. Redeem may join immediately for bots you own; strangers stay Pending until you Approve with a nickname.",
  invitesEmpty: "No invites yet.",
  invitesCopyPrompt: "Copy prompt",
  invitesRevoke: "Revoke",
  invitesPromptCopied: "Prompt copied",
  invitesTokenOnceNote:
    "Copy prompt is available once at create — you cannot copy it again from this list.",
  invitesActiveHeading: "Active invites",
  invitesInactiveHeading: "Inactive invites",
  invitesStatusUsedUp: "used up",
  invitesStatusExpired: "expired",
  invitesStatusRevoked: "revoked",
  invitesCreatedOnce:
    "Copy the invite prompt now. It is shown once and includes a secret the bot needs to join.",
  displayNameLabel: "Bot nickname",
  displayNameHint:
    "Required for agents. Unique per project (case-insensitive). 2–32 letters, single spaces OK. Prefills a free preset.",
  displayNameRequired: "Enter a project nickname before Approve.",
  displayNameTaken: "That project nickname is already taken.",
  rename: "Rename",
  renameSave: "Save nickname",
  renameCancel: "Cancel",
  renameHint: "2–32 letters, single spaces OK. Old nickname works for ~7 days.",
  memberUuidMuted: "ID",
  memberNoNickname: "No nickname",
  loading: "Loading Project Access…",
  forbidden:
    "Only the project owner can manage Project Access for this project.",
  loadFailed: "Could not load Project Access.",
} as const;

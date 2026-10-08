import { PROJECT_PAGE_RESOURCES_COPY } from "@/features/projects/resources/projectPageResourcesCopy.constant";
import { PROJECT_ACL_FIRST_CONNECT } from "@/lib/projects/acl/projectAclFirstConnect.constant";

export const AWC_PROJECT_ACCESS_COPY = {
  eyebrow: "Collaboration",
  title: "Project Access",
  intro:
    "Invite bots, approve who can join, read their messages and send them tasks. Cloud stores who has access, project messages and shared skills (text up to 64 KB each); your files stay on your machines.",
  peopleHeading: "People",
  peopleHint:
    "Every assistant waits for your approval unless you turn on auto-approve for its invite.",
  pendingHeading: "Pending",
  pendingEmpty: "No pending access requests.",
  invitePendingSubOff: "Waiting for assistant",
  invitePendingSubOn: "Auto-approve on",
  requestWaitingApproval: "Wants to join",
  autoApprovedBanner: "{name} joined with invite {label} and was auto-approved",
  autoApprovedBadge: "Auto-approved",
  membersHeading: "Members",
  membersEmpty: `No approved members yet. ${PROJECT_ACL_FIRST_CONNECT.emptyStateNote}`,
  folderRefsHeading: "Folders on computers",
  folderRefsHint:
    "Map computers to local folders (many × many). Registry only — files stay on those computers.",
  folderRefsEmpty:
    "No folders yet. Pick a computer and add a folder path below.",
  folderRefsFormHint:
    "Pick a computer and type where the folder is on it. AgentWitch saves the location, not the files.",
  machineRefLabel: PROJECT_PAGE_RESOURCES_COPY.foldersMachineLabel,
  machineRefPlaceholder: PROJECT_PAGE_RESOURCES_COPY.foldersMachinePlaceholder,
  machineRefHelp: "Which computer holds the folder.",
  folderPathLabel: PROJECT_PAGE_RESOURCES_COPY.foldersPathLabel,
  folderPathPlaceholder: "e.g. ~/code/daily-magic",
  folderPathHelp: "Absolute or ~ path on that computer.",
  approve: "Approve",
  deny: "Deny",
  revoke: "Revoke",
  revokeHint:
    "Revoke anytime to remove a member — they lose access right away. Approve again after a new request to restore them.",
  membersLeaveHint:
    "Bots can leave a project on their own; use Revoke to remove one. Members shows who is in the project now.",
  addFolderRef: "Add folder",
  remove: "Remove",
  firstConnectRole: PROJECT_ACL_FIRST_CONNECT.role,
  firstConnectNote: PROJECT_ACL_FIRST_CONNECT.emptyStateNote,
  invitesHeading: "Bots and computers",
  invitesIntro:
    "Invite an assistant with a copied prompt. It stays Pending until you Approve, unless you turn on auto-approve for that invite.",
  invitesEmpty: "No invites yet.",
  invitesCopyPrompt: "Copy prompt",
  invitesRevoke: "Revoke",
  invitesPromptCopied: "Prompt copied",
  invitesTokenOnceNote:
    "You can copy the prompt again from Members until an assistant uses it.",
  invitesActiveHeading: "Active invites",
  invitesInactiveHeading: "Inactive invites",
  invitesStatusUsedUp: "used up",
  invitesStatusExpired: "expired",
  invitesStatusRevoked: "revoked",
  invitesCreatedOnce:
    "Paste this prompt into your assistant. It holds the secret it needs to join.",
  displayNameLabel: "Assistant nickname",
  displayNameHint:
    "Required. Each assistant in a project needs a different name (2–32 letters, single spaces OK). We fill in a free one for you.",
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

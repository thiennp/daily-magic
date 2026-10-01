import { AWC_PROJECT_ACCESS_FIRST_CONNECT } from "@/features/projects/access/awcProjectAccessFirstConnect.constant";

export const AWC_PROJECT_ACCESS_COPY = {
  title: "Project Access",
  intro:
    "Agent Witch Cloud is an ACL + registry for this project: name, folder refs, members, and approve/revoke audit only. After Approve, co-work is local↔local (shared folder, git, or bot channels) — not a cloud content bus. Do not share agent-access tokens.",
  pendingHeading: "Pending requests",
  pendingEmpty: "No pending access requests.",
  membersHeading: "Members",
  membersEmpty: `No approved members yet. ${AWC_PROJECT_ACCESS_FIRST_CONNECT.emptyStateNote}`,
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
  firstConnectRole: AWC_PROJECT_ACCESS_FIRST_CONNECT.role,
  firstConnectNote: AWC_PROJECT_ACCESS_FIRST_CONNECT.emptyStateNote,
  activityHeading: "Activity",
  activityHonesty:
    "Membership and status events — not a cloud content store.",
  activityFilterLabel: "Filter",
  activityFilterAll: "All types",
  activityLoading: "Loading activity…",
  activityEmpty: "No membership or status events yet.",
  activityUnavailable:
    "Activity API not available on this deploy yet — membership and status events will appear here once the backend lands.",
  activityNonGoals:
    "No transcripts, run logs, or prompt bodies — those stay on local machines.",
} as const;

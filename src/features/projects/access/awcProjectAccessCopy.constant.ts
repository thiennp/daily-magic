import { PROJECT_ACL_FIRST_CONNECT } from "@/lib/projects/acl/projectAclFirstConnect.constant";

export const AWC_PROJECT_ACCESS_COPY = {
  title: "Project Access",
  intro:
    "Agent Witch Cloud is an ACL + registry for this project: name, folder refs, members, and approve/revoke audit only. After Approve, co-work is local↔local (shared folder, git, or bot channels) — not a cloud content bus. Do not share agent-access tokens.",
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
    "Revoke anytime. Access is denied immediately on the next ACL check.",
  addFolderRef: "Add folder ref",
  machineRefPlaceholder: "Machine or device ref",
  folderPathPlaceholder: "Folder path",
  remove: "Remove",
  firstConnectRole: PROJECT_ACL_FIRST_CONNECT.role,
  firstConnectNote: PROJECT_ACL_FIRST_CONNECT.emptyStateNote,
  proposedFeedCallout:
    "Activity API (list_project_activity / GET …/activity) returns allowlisted membership and status events only — still not project content on the cloud. A fuller Activity UI may bind later.",
} as const;

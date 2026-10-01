export const AWC_PROJECT_ACCESS_COPY = {
  title: "Project Access",
  intro:
    "Agent Witch Cloud stores only this project's name, folder refs, members, and approve/revoke audit. Co-work happens local↔local (shared folder, git, or bot channels) — not as a cloud content bus. Do not share agent-access tokens.",
  pendingHeading: "Pending requests",
  pendingEmpty: "No pending access requests.",
  membersHeading: "Members",
  membersEmpty: "No approved members yet.",
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
} as const;

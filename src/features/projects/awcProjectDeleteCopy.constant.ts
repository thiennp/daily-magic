/** Shared delete copy for /projects dialog and Settings danger zone. */
export const AWC_PROJECT_DELETE_COPY = {
  title: "Delete this project?",
  trigger: "Delete project",
  /** What Cloud removes; local repos/files stay. */
  scope:
    "This removes the project and its access for everyone: members, invites, webhooks, API keys, messages, library items, and reports. The repo and files on your computer are not touched. You cannot undo this.",
  typeToConfirmPrefix: "Type the project name",
  typeToConfirmSuffix: "to confirm",
  confirm: "Delete forever",
  deleting: "Deleting…",
  cancel: "Cancel",
  ownerOnlyError: "Only the owner can delete this project.",
  genericError: "Could not delete project.",
} as const;

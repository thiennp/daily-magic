/** Shared delete copy for /projects dialog and Settings danger zone. */
export const AWC_PROJECT_DELETE_COPY = {
  title: "Delete this project?",
  trigger: "Delete project",
  /** What Cloud removes; local repos/files stay. */
  scope:
    "Remove from Agent Witch Cloud: members, invites, wake links, keys, and messages. Repos and files on computers aren't touched.",
  typeToConfirmPrefix: "Type the project name",
  typeToConfirmSuffix: "to confirm",
  confirm: "Delete permanently",
  deleting: "Deleting…",
  cancel: "Cancel",
  ownerOnlyError: "Only the owner can delete this project.",
  genericError: "Could not delete project.",
} as const;

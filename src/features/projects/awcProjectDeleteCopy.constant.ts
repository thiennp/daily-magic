export const AWC_PROJECT_DELETE_COPY = {
  trigger: "Delete project",
  scope:
    "Removes this project from Agent Witch Cloud: members, invites, webhooks, API keys, and messages. Repos and files on any Mac are not touched.",
  typeToConfirm: "Type the project name to confirm",
  confirm: "Delete project",
  deleting: "Deleting…",
  cancel: "Cancel",
} as const;

/** Resources tab — Product EN (ARTIFACT-STRINGS Center · Resources). */
export const PROJECT_PAGE_RESOURCES_COPY = {
  pwaHeading: "Playbooks, Workflows, Agents",
  pwaAttach: "Attach on this computer",
  playbooksTitle: "Playbooks",
  workflowsTitle: "Workflows",
  agentsTitle: "Agents",
  pwaEmptySub: (computerName: string) =>
    `None attached. View here, edit on ${computerName}.`,
  foldersTitle: "Folders on this computer",
  foldersEmpty:
    "No folders yet. Only the folder location is stored; files stay on your computer.",
  foldersHint:
    "Only the folder location is stored; files stay on your computer.",
  foldersOwnerOnly:
    "Only the project owner can add and remove folder paths for this project.",
  foldersLoading: "Loading folders…",
  foldersAdd: "Add",
  foldersRemove: "Remove",
  gitTitle: "Git remotes (optional)",
  gitHint:
    "HTTPS or SSH, with no login details. Clear every URL and leave the branch empty, then save to remove the config.",
  skillsHeading: "Shared skills",
} as const;

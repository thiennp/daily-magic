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
  foldersMachineLabel: "Computer",
  foldersMachinePlaceholder: "Choose a computer",
  foldersMachineOfflineSuffix: " · offline",
  foldersMachineNone:
    "No computers connected yet. Connect this computer first.",
  foldersChooseComputerFirst: "Choose a computer first.",
  foldersDeviceNotMember: "Pick a computer that's part of this project.",
  foldersAdded: "Folder added.",
  foldersAddFailed: "Could not add the folder. Try again.",
  foldersPathLabel: "Folder path",
  /** Row: "{deviceName} · {path}". */
  foldersRow: (deviceName: string, path: string) => `${deviceName} · ${path}`,
  gitTitle: "Git remotes (optional)",
  gitHint:
    "HTTPS or SSH, with no login details. Clear every URL and leave the branch empty, then save to remove the config.",
  skillsHeading: "Shared skills",
} as const;

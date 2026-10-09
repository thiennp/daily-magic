export const OVERVIEW_FOLDER_PROMPT_COPY = {
  titleFirst: "Add your folder for this project",
  titleThisComputer: "Add this project's folder on this computer",
  hintFirst:
    "AgentWitch needs to know where the project lives. It saves the location, not the files.",
  hintThisComputer:
    "No folder is saved for this computer yet, so work sent here cannot find the project. Each person keeps their own folder.",
  hintNoComputer:
    "Connect this computer first, then add the folder where the project lives.",
  pathLabel: "Folder path",
  pathPlaceholder: "e.g. ~/code/my-project",
  add: "Add folder",
  adding: "Adding…",
  openResources: "Open Resources",
  added: "Folder added.",
  failed: "Could not add the folder. Check the path and try again.",
} as const;

const FRIENDLY: Readonly<Record<string, string>> = {
  folder_required:
    "Type the full path of the folder, for example /Users/you/baby-care.",
  project_id_invalid:
    "This project could not be identified. Reload the page and try again.",
  folder_not_absolute: "Use a full path that starts with / or ~.",
  folder_not_found: "That folder does not exist on this computer.",
  not_a_folder: "That path is a file, not a folder.",
  folder_not_readable:
    "AgentWitch cannot read that folder. Check its permissions.",
  folder_is_home:
    "Pick a project folder inside your home folder, not the home folder itself.",
  folder_outside_home:
    "That folder is outside your home folder. Tick Allow outside home to use it anyway.",
  not_paired:
    "This computer is not connected to AgentWitch yet. Open AgentWitch Local to connect it.",
  cloud_update_failed:
    "The folder is fine, but AgentWitch Cloud could not save it. Try again in a moment.",
  forbidden_origin:
    "This computer refused the request. Open AgentWitch Local to change the folder.",
};

/** Plain-words message for a link-folder refusal code (falls back to the server's own words). */
export const describeProjectFolderLinkError = (
  code: string | null,
  serverMessage: string | null,
): string =>
  (code !== null ? FRIENDLY[code] : undefined) ??
  serverMessage ??
  "Could not change the folder. Open AgentWitch Local on that computer to change it.";

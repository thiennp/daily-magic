/**
 * S0 refusal codes AWL puts on `command.claude.result.payload.errorCode`
 * when it will not start (or keep) a coding tool run.
 */
export const LocalCodingToolRefusalCode = {
  /** Run had no project folder (e.g. computer-seat dispatch sends none). */
  FOLDER_REQUIRED: "folder_required",
  /** realpath(cwd) is not inside a folder registered for this project + device. */
  FOLDER_NOT_REGISTERED: "folder_not_registered",
  /** Registered folder does not exist on this computer (AWL never creates it). */
  FOLDER_NOT_FOUND: "folder_not_found",
  /** Registered folders could not be loaded; fail closed. */
  FOLDER_CHECK_UNAVAILABLE: "folder_check_unavailable",
  /** Local "Pause all coding tools" is on. */
  CODING_TOOLS_PAUSED: "coding_tools_paused",
} as const;

export type LocalCodingToolRefusalCodeValue =
  (typeof LocalCodingToolRefusalCode)[keyof typeof LocalCodingToolRefusalCode];

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
  /** folder overlaps a folder another account on this computer uses for a different project or a different folder; cross-account sharing only for the same project's exact folder */
  FOLDER_OWNED_BY_OTHER_ACCOUNT: "folder_owned_by_other_account",
  /** another account's coding tool is writing in this folder right now */
  FOLDER_LOCKED_BY_OTHER_ACCOUNT: "folder_locked_by_other_account",
} as const;

export type LocalCodingToolRefusalCodeValue =
  (typeof LocalCodingToolRefusalCode)[keyof typeof LocalCodingToolRefusalCode];

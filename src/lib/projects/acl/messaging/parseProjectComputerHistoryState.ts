import {
  DEFAULT_PROJECT_COMPUTER_HISTORY_STATE,
  PROJECT_COMPUTER_HISTORY_STATES,
  type ProjectComputerHistoryState,
} from "@/lib/projects/acl/messaging/projectComputerHistoryStateMachine";

/** DB value → state. No row or an unknown value means on_configuring (default ON). */
export const parseProjectComputerHistoryState = (
  value: unknown,
): ProjectComputerHistoryState =>
  PROJECT_COMPUTER_HISTORY_STATES.find((state) => state === value) ??
  DEFAULT_PROJECT_COMPUTER_HISTORY_STATE;

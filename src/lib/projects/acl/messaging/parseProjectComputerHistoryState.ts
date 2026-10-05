import {
  PROJECT_COMPUTER_HISTORY_STATES,
  type ProjectComputerHistoryState,
} from "@/lib/projects/acl/messaging/projectComputerHistoryStateMachine";

/** DB value → state. No row or an unknown value means off (today's rules). */
export const parseProjectComputerHistoryState = (
  value: unknown,
): ProjectComputerHistoryState =>
  PROJECT_COMPUTER_HISTORY_STATES.find((state) => state === value) ?? "off";

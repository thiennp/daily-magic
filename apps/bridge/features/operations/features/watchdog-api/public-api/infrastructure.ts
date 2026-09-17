import {
  buildAgentWitchWatchdogStatusResponse,
  readAgentWitchWatchdogLogs,
} from "../../../../../adapters/macLifecycle";

export const readAgentWitchWatchdogLogEntries = (
  limit: number = 20,
): ReturnType<typeof readAgentWitchWatchdogLogs> =>
  readAgentWitchWatchdogLogs(limit);

export const buildAgentWitchWatchdogStatus =
  buildAgentWitchWatchdogStatusResponse;

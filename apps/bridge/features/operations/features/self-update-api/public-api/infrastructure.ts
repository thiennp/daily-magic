import {
  buildAgentWitchSelfUpdateStatus,
  readAgentWitchSelfUpdateLogs,
  runAgentWitchSelfUpdate,
} from "../../../../../adapters/macLifecycle";

export const buildAgentWitchSelfUpdateStatusFromWakeServer =
  buildAgentWitchSelfUpdateStatus;

export const readAgentWitchSelfUpdateLogEntries = (
  limit: number = 20,
): ReturnType<typeof readAgentWitchSelfUpdateLogs> =>
  readAgentWitchSelfUpdateLogs(limit);

export const runAgentWitchSelfUpdateFromWakeServer = (input?: {
  readonly force?: boolean;
}): ReturnType<typeof runAgentWitchSelfUpdate> =>
  runAgentWitchSelfUpdate(input);

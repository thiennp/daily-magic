import type { AgentWitchLocalConnectVersionStatus } from "@/lib/agentWitch/types/AgentWitchLocalConnectVersionStatus.type";

export type HomeMacDeviceRowConnectFooter =
  "connect_this_mac" | "too_old_note" | null;

/**
 * This computer row (offline or too old) carries the Connect this computer CTA so there is
 * never a second "This computer" row; other too-old rows get an inline note.
 */
export const resolveHomeMacDeviceRowConnectFooter = (input: {
  readonly isThisMac: boolean;
  readonly isThisMacReachable: boolean;
  readonly connectVersionStatus?: AgentWitchLocalConnectVersionStatus;
}): HomeMacDeviceRowConnectFooter => {
  const isTooOld = input.connectVersionStatus === "too_old";
  if (input.isThisMac) {
    return isTooOld || !input.isThisMacReachable ? "connect_this_mac" : null;
  }

  return isTooOld ? "too_old_note" : null;
};

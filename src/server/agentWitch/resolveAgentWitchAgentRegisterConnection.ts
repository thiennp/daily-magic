import type { AgentWitchHub } from "@/lib/agentWitch/agentWitchHub";
import { findAgentWitchDeviceByToken } from "@/lib/agentWitch/findAgentWitchDeviceByToken";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import {
  DEV_DASHBOARD_EMAIL,
  DEV_DASHBOARD_USER_ID,
  isAgentWitchDevDashboardEnabled,
} from "@/lib/auth/resolveDevDashboardActor";

import type { AgentWitchConnectionState } from "@/server/agentWitch/processAgentWitchRegisterMessage";

export const resolveAgentWitchAgentRegisterConnection = async (
  hub: AgentWitchHub,
  connectionState: AgentWitchConnectionState,
  message: AgentWitchMessage,
  pairingToken: string,
): Promise<void> => {
  connectionState.role = "agent";
  connectionState.pairingToken = pairingToken;
  const devDashboardEnabled = isAgentWitchDevDashboardEnabled();
  const claimedPairing =
    await hub.pairingStore.resolveClaimedPairing(pairingToken);
  const device = devDashboardEnabled
    ? null
    : await findAgentWitchDeviceByToken(pairingToken);

  if (
    devDashboardEnabled &&
    claimedPairing === null &&
    device?.userId === undefined
  ) {
    await hub.pairingStore.claimPairing(
      pairingToken,
      DEV_DASHBOARD_USER_ID,
      DEV_DASHBOARD_EMAIL,
    );
  }

  const resolvedPairing =
    claimedPairing ??
    (await hub.pairingStore.resolveClaimedPairing(pairingToken));
  connectionState.userId = resolvedPairing?.userId ?? device?.userId;

  const hostname =
    typeof message.payload?.hostname === "string"
      ? message.payload.hostname.trim()
      : "";
  const profileEmail =
    typeof message.payload?.email === "string"
      ? message.payload.email.trim().toLowerCase()
      : "";
  const activeDevice = device?.revokedAt === null ? device : null;
  connectionState.deviceId = activeDevice?.id ?? claimedPairing?.deviceId;
  connectionState.deviceLabel =
    hostname.length > 0 ? hostname : (activeDevice?.deviceLabel ?? undefined);
  if (profileEmail.length > 0) {
    connectionState.email = profileEmail;
  }
};

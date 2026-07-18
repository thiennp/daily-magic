import { findEnrichedAgentClientForUser } from "@/lib/agentWitch/findEnrichedAgentClientForUser";
import { getAgentWitchHub } from "@/lib/agentWitch/getAgentWitchHub";
import { sendHarnessInstallToAgentClient } from "@/lib/harness/sendHarnessInstallToAgentClient";
import type HarnessInstallBundle from "@/lib/agentWitch/harness/types/HarnessInstallBundle.type";

export const pushHarnessInstallBundleToDevice = async (input: {
  readonly userId: string;
  readonly deviceId: string;
  readonly bundle: HarnessInstallBundle;
}): Promise<{
  readonly installed: boolean;
  readonly errorMessage: string | null;
}> => {
  const agentClient = await findEnrichedAgentClientForUser(
    getAgentWitchHub(),
    input.userId,
    input.deviceId,
  );

  if (agentClient === undefined) {
    return {
      installed: false,
      errorMessage: "The selected Mac is not online right now.",
    };
  }

  sendHarnessInstallToAgentClient(agentClient, input.bundle);
  return { installed: true, errorMessage: null };
};

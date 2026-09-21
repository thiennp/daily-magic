import { AGENT_WITCH_DISPATCH_ERROR_CODES } from "@/lib/agentWitch/agentWitchDispatchErrorCode.constant";
import { deliverOrQueueAgentWitchDispatchMessage } from "@/lib/agentWitch/deliverOrQueueAgentWitchDispatchMessage";
import type HarnessInstallBundle from "@/lib/agentWitch/harness/types/HarnessInstallBundle.type";
import { buildHarnessInstallDispatchMessage } from "@/lib/harness/sendHarnessInstallToAgentClient";

export const pushHarnessInstallBundleToDevice = async (input: {
  readonly userId: string;
  readonly deviceId: string;
  readonly bundle: HarnessInstallBundle;
}): Promise<{
  readonly installed: boolean;
  readonly queued: boolean;
  readonly errorMessage: string | null;
  readonly errorCode?: string;
}> => {
  const message = await buildHarnessInstallDispatchMessage({
    harness: input.bundle,
    userId: input.userId,
    deviceId: input.deviceId,
  });
  const idempotencyKey = `harness-install:${input.userId}:${input.deviceId}:${input.bundle.slug}`;

  const result = await deliverOrQueueAgentWitchDispatchMessage({
    userId: input.userId,
    deviceId: input.deviceId,
    message,
    idempotencyKey,
  });

  if (result.kind === "delivered") {
    return { installed: true, queued: false, errorMessage: null };
  }

  if (result.kind === "queued") {
    return {
      installed: false,
      queued: true,
      errorMessage: null,
      errorCode: AGENT_WITCH_DISPATCH_ERROR_CODES.MAC_QUEUED,
    };
  }

  return {
    installed: false,
    queued: false,
    errorMessage: result.errorMessage,
    errorCode: result.errorCode,
  };
};

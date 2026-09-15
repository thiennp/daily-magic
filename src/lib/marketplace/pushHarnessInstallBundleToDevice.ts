import { AGENT_WITCH_DISPATCH_ERROR_CODES } from "@/lib/agentWitch/agentWitchDispatchErrorCode.constant";
import { deliverOrQueueAgentWitchDispatchMessage } from "@/lib/agentWitch/deliverOrQueueAgentWitchDispatchMessage";
import type HarnessInstallBundle from "@/lib/agentWitch/harness/types/HarnessInstallBundle.type";
import { buildHarnessInstallDispatchMessages } from "@/lib/harness/sendHarnessInstallToAgentClient";

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
  const messages = buildHarnessInstallDispatchMessages(input.bundle);
  const idempotencyBase = `harness-install:${input.userId}:${input.deviceId}:${input.bundle.slug}`;

  for (const [index, message] of messages.entries()) {
    const result = await deliverOrQueueAgentWitchDispatchMessage({
      userId: input.userId,
      deviceId: input.deviceId,
      message,
      idempotencyKey: `${idempotencyBase}:${index}`,
    });

    if (result.kind === "delivered") {
      continue;
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
  }

  return { installed: true, queued: false, errorMessage: null };
};

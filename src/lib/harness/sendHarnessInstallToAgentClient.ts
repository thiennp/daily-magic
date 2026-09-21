import type HarnessInstallBundle from "@/lib/agentWitch/harness/types/HarnessInstallBundle.type";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { createHarnessInstallArtifact } from "@/lib/harness/createHarnessInstallArtifact";
import { estimateHarnessInstallBundleUtf8Bytes } from "@/lib/harness/estimateHarnessInstallBundleUtf8Bytes";
import { HARNESS_INSTALL_INLINE_BUNDLE_MAX_BYTES } from "@/lib/harness/harnessInstallInlineBundleMaxBytes.constant";
import type HarnessDeterministicInstallPayload from "@/lib/harness/types/HarnessDeterministicInstallPayload.type";

export type HarnessInstallSetInput = HarnessInstallBundle;

const buildDeterministicHarnessPayload = async (input: {
  readonly harness: HarnessInstallSetInput;
  readonly userId: string;
  readonly deviceId: string;
}): Promise<HarnessDeterministicInstallPayload> => {
  const bundle: HarnessInstallBundle = {
    name: input.harness.name,
    slug: input.harness.slug,
    items: input.harness.items,
  };

  if (
    estimateHarnessInstallBundleUtf8Bytes(bundle) <=
    HARNESS_INSTALL_INLINE_BUNDLE_MAX_BYTES
  ) {
    return {
      installMethod: "deterministic-bundle",
      bundle,
    };
  }

  const artifact = await createHarnessInstallArtifact({
    userId: input.userId,
    deviceId: input.deviceId,
    bundle,
  });

  return {
    installMethod: "deterministic-bundle",
    bundleFetch: {
      artifactId: artifact.artifactId,
      contentSha256: artifact.contentSha256,
    },
  };
};

export const buildHarnessInstallDispatchMessage = async (input: {
  readonly harness: HarnessInstallSetInput;
  readonly userId: string;
  readonly deviceId: string;
}): Promise<AgentWitchMessage> => {
  const installPayload = await buildDeterministicHarnessPayload(input);

  return {
    type: AGENT_WITCH_MESSAGE_TYPES.HARNESS_REQUEST,
    payload: { ...installPayload },
  };
};

/** @deprecated Prefer buildHarnessInstallDispatchMessage — returns one deterministic install message. */
export const buildHarnessInstallDispatchMessages = async (input: {
  readonly harness: HarnessInstallSetInput;
  readonly userId: string;
  readonly deviceId: string;
}): Promise<readonly AgentWitchMessage[]> => [
  await buildHarnessInstallDispatchMessage(input),
];

export const sendHarnessInstallToAgentClient = async (
  agentClient: AgentWitchHubClient,
  harness: HarnessInstallSetInput,
  context: { readonly userId: string; readonly deviceId: string },
): Promise<void> => {
  const message = await buildHarnessInstallDispatchMessage({
    harness,
    userId: context.userId,
    deviceId: context.deviceId,
  });
  agentClient.send(message);
};

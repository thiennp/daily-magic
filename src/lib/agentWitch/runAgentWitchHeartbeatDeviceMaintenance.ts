import type { KnowledgeHeartbeatReport } from "@/lib/knowledge/knowledgeHeartbeat.type";
import { saveKnowledgeHeartbeat } from "@/lib/knowledge/saveKnowledgeHeartbeat";
import { consolidateActiveAgentWitchDeviceByLabel } from "@/lib/agentWitch/consolidateActiveAgentWitchDeviceByLabel";
import { deliverAgentWitchDeviceRestartIfRequested } from "@/lib/agentWitch/deliverAgentWitchDeviceRestart";
import {
  reconcileInterruptedAgentRunsForDevice,
  shouldReconcileInterruptedRunsNow,
} from "@/lib/dispatch/reconcileInterruptedAgentRunsForDevice";
import { maybeReconcileStaleAgentRuns } from "@/lib/dispatch/reconcileStaleAgentRuns";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import { updateAgentWitchDeviceInstallBundleVersion } from "@/lib/agentWitch/updateAgentWitchDeviceInstallBundleVersion";
import type { AgentWitchDeviceWriter } from "@/lib/agentWitch/deviceWriters";
import { updateAgentWitchDeviceWriters } from "@/lib/agentWitch/updateAgentWitchDeviceWriters";
import { updateAgentWitchDeviceInstallId } from "@/lib/agentWitch/updateAgentWitchDeviceInstallId";
import { updateAgentWitchDeviceWakePort } from "@/lib/agentWitch/updateAgentWitchDeviceWakePort";
import { updateAgentWitchDeviceWakeError } from "@/lib/agentWitch/updateAgentWitchDeviceAuthFields";
import { upgradeAgentWitchDeviceLabelFromLegacyHostname } from "@/lib/agentWitch/upgradeAgentWitchDeviceLabelFromLegacyHostname";

export const runAgentWitchHeartbeatDeviceMaintenance = async (input: {
  readonly runtime: AgentWitchHubRuntime;
  readonly userId: string;
  readonly deviceId: string;
  readonly hostname: string | null;
  readonly installDeviceLabel: string | null;
  readonly installId?: string | null;
  readonly installBundleVersion: string | null;
  readonly wakePort: number | null;
  readonly wakeError: string | null;
  readonly knowledge?: KnowledgeHeartbeatReport | null;
  readonly writers?: readonly AgentWitchDeviceWriter[] | null;
}): Promise<void> => {
  await updateAgentWitchDeviceWakeError({
    deviceId: input.deviceId,
    wakeError: input.wakeError,
  });

  if (input.installBundleVersion !== null) {
    await updateAgentWitchDeviceInstallBundleVersion({
      deviceId: input.deviceId,
      installBundleVersion: input.installBundleVersion,
    });
  }

  if (input.wakePort !== null) {
    await updateAgentWitchDeviceWakePort({
      deviceId: input.deviceId,
      wakePort: input.wakePort,
    });
  }

  if (input.writers !== undefined && input.writers !== null) {
    await updateAgentWitchDeviceWriters({
      deviceId: input.deviceId,
      writers: input.writers,
    });
  }

  if (input.knowledge !== undefined && input.knowledge !== null) {
    await saveKnowledgeHeartbeat({
      userId: input.userId,
      deviceId: input.deviceId,
      report: input.knowledge,
    }).catch((error: unknown) => {
      console.error("[agent-witch/knowledge] heartbeat save failed", error);
    });
  }

  await deliverAgentWitchDeviceRestartIfRequested(input.runtime, {
    userId: input.userId,
    deviceId: input.deviceId,
  });

  if (shouldReconcileInterruptedRunsNow(input.deviceId, Date.now())) {
    await reconcileInterruptedAgentRunsForDevice(input.runtime, {
      userId: input.userId,
      deviceId: input.deviceId,
    }).catch((error: unknown) => {
      console.error("[agent-witch] interrupted run reconcile failed", error);
    });
  }
  // 6253aa7e: the global stale sweep also runs on device heartbeats, so a
  // silent run is closed even when no other run is heartbeating.
  await maybeReconcileStaleAgentRuns(input.runtime).catch((error: unknown) => {
    console.error("[agent-witch] stale run reconcile failed", error);
  });

  if (input.installId !== undefined && input.installId !== null) {
    await updateAgentWitchDeviceInstallId({
      deviceId: input.deviceId,
      installId: input.installId,
    });
  }

  if (input.installDeviceLabel !== null) {
    await upgradeAgentWitchDeviceLabelFromLegacyHostname({
      deviceId: input.deviceId,
      userId: input.userId,
      installDeviceLabel: input.installDeviceLabel,
    });
    await consolidateActiveAgentWitchDeviceByLabel({
      userId: input.userId,
      keepDeviceId: input.deviceId,
      deviceLabel: input.installDeviceLabel,
    });
  }
};

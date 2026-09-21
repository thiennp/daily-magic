import { MAC_RECONNECTING_QUEUED_ERROR } from "@/lib/agentWitch/agentWitchDispatchErrorCode.constant";
import { resolveDispatchTargetAgentClient } from "@/lib/agentWitch/resolveDispatchTargetAgentClient";
import type { BorrowedHarnessExportSet } from "@/lib/harness/types/HarnessExportResult.type";
import type HarnessItemWriteSpec from "@/lib/agentWitch/harness/types/HarnessItemWriteSpec.type";
import type { HarnessItemKind } from "@/lib/agentWitch/harness/types/HarnessItemKind.constant";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import { sendHarnessInstallToAgentClient } from "@/lib/harness/sendHarnessInstallToAgentClient";

const mapExportSetItems = (
  set: BorrowedHarnessExportSet,
): readonly HarnessItemWriteSpec[] =>
  set.items.map((item) => ({
    id: item.id,
    kind: item.kind as HarnessItemKind,
    title: item.title,
    content: item.content,
    setSlugs: [set.slug],
  }));

export const applyHarnessExportSetsToDevice = async (
  runtime: AgentWitchHubRuntime,
  borrowerUserId: string,
  targetDeviceId: string,
  sets: readonly BorrowedHarnessExportSet[],
): Promise<{
  readonly installed: boolean;
  readonly errorMessage: string | null;
}> => {
  const resolved = await resolveDispatchTargetAgentClient({
    runtime,
    userId: borrowerUserId,
    deviceId: targetDeviceId,
  });

  if (resolved === undefined) {
    return {
      installed: false,
      errorMessage: MAC_RECONNECTING_QUEUED_ERROR,
    };
  }

  const agentClient = resolved.agentClient;
  const deviceId = agentClient.deviceId ?? targetDeviceId;

  for (const set of sets) {
    await sendHarnessInstallToAgentClient(
      agentClient,
      {
        name: set.name,
        slug: set.slug,
        items: mapExportSetItems(set),
      },
      { userId: borrowerUserId, deviceId },
    );
  }

  return {
    installed: true,
    errorMessage: null,
  };
};

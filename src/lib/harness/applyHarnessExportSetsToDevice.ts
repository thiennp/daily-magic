import type { BorrowedHarnessExportSet } from "@/lib/harness/types/HarnessExportResult.type";
import type HarnessItemWriteSpec from "@/lib/agentWitch/harness/types/HarnessItemWriteSpec.type";
import type { HarnessItemKind } from "@/lib/agentWitch/harness/types/HarnessItemKind.constant";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import {
  sendHarnessInstallToAgentClient,
  sendHarnessWriteItemsToAgentClient,
} from "@/lib/harness/sendHarnessInstallToAgentClient";

const mergeExportSetItems = (
  sets: readonly BorrowedHarnessExportSet[],
): readonly HarnessItemWriteSpec[] => {
  const merged = new Map<string, HarnessItemWriteSpec>();

  for (const set of sets) {
    for (const item of set.items) {
      const existing = merged.get(item.id);
      const nextSetSlugs = existing
        ? [...new Set([...existing.setSlugs, set.slug])]
        : [set.slug];

      merged.set(item.id, {
        id: item.id,
        kind: item.kind as HarnessItemKind,
        title: item.title,
        content: item.content,
        setSlugs: nextSetSlugs,
      });
    }
  }

  return [...merged.values()];
};

export const applyHarnessExportSetsToDevice = (
  runtime: AgentWitchHubRuntime,
  borrowerUserId: string,
  targetDeviceId: string,
  sets: readonly BorrowedHarnessExportSet[],
): { readonly installed: boolean; readonly errorMessage: string | null } => {
  const agentClient = runtime.findAgentClientForUser(
    borrowerUserId,
    targetDeviceId,
  );

  if (agentClient === undefined) {
    return {
      installed: false,
      errorMessage: "The selected Mac is not online right now.",
    };
  }

  for (const set of sets) {
    sendHarnessInstallToAgentClient(agentClient, {
      name: set.name,
      slug: set.slug,
      items: [],
    });
  }

  const items = mergeExportSetItems(sets);
  if (items.length > 0) {
    sendHarnessWriteItemsToAgentClient(agentClient, items);
  }

  return {
    installed: true,
    errorMessage: null,
  };
};

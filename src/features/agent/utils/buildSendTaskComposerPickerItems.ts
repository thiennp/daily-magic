import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

export type SendTaskComposerPickerItem =
  | {
      readonly kind: "library";
      readonly id: string;
      readonly label: string;
      readonly itemType: "workflow" | "agent";
    }
  | {
      readonly kind: "writer-agent";
      readonly id: HarnessWriterAgent;
      readonly label: string;
      readonly itemType: "writer-agent";
    }
  | {
      readonly kind: "custom";
      readonly id: "custom";
      readonly label: string;
      readonly itemType: "custom";
    };

const sortLibraryCapabilities = (
  capabilities: readonly PublishedCapabilityRecord[],
): readonly PublishedCapabilityRecord[] =>
  [...capabilities].sort((left, right) => {
    if (left.type !== right.type) {
      return left.type === CapabilityType.WORKFLOW ? -1 : 1;
    }

    return left.name.localeCompare(right.name);
  });

export const buildSendTaskComposerPickerItems = (
  capabilities: readonly PublishedCapabilityRecord[],
): readonly SendTaskComposerPickerItem[] => {
  const libraryItems = sortLibraryCapabilities(capabilities).map(
    (capability): SendTaskComposerPickerItem => ({
      kind: "library",
      id: capability.id,
      label: capability.name,
      itemType:
        capability.type === CapabilityType.WORKFLOW ? "workflow" : "agent",
    }),
  );

  return [
    ...libraryItems,
    {
      kind: "custom",
      id: "custom",
      label: "Custom task",
      itemType: "custom",
    },
  ];
};

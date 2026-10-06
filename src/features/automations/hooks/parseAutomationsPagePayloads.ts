import type AgentAutomationRecord from "@/lib/automations/types/AgentAutomationRecord.type";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";

export const parseAutomationsPayload = (
  data: unknown,
): readonly AgentAutomationRecord[] | null => {
  if (
    typeof data === "object" &&
    data !== null &&
    Array.isArray((data as { automations?: unknown }).automations)
  ) {
    return (data as { automations: AgentAutomationRecord[] }).automations;
  }
  return null;
};

export const parseWorkflowCapabilitiesPayload = (
  data: unknown,
): readonly PublishedCapabilityRecord[] | null => {
  if (
    typeof data === "object" &&
    data !== null &&
    Array.isArray((data as { capabilities?: unknown }).capabilities)
  ) {
    const allCapabilities = (
      data as { capabilities: PublishedCapabilityRecord[] }
    ).capabilities;
    return allCapabilities.filter(
      (item) => item.type === CapabilityType.WORKFLOW,
    );
  }
  return null;
};

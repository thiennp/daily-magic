import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";
import type CapabilityTemplateUsageGuide from "@/lib/capabilities/templates/types/CapabilityTemplateUsageGuide.type";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";

const DEFAULT_WRITERS: CapabilityTemplateUsageGuide["supportedWriters"] = [
  "anthropic",
  "openai",
  "cursor",
  "google",
];

const buildUsageGuideForPublishedCapability = (
  capability: PublishedCapabilityRecord,
): CapabilityTemplateUsageGuide => {
  const isWorkflow = capability.type === CapabilityType.WORKFLOW;
  const typeLabel = isWorkflow ? "workflow" : "agent";

  return {
    summary: `Install this ${typeLabel} to a project on your computer. ${capability.description}`,
    prerequisites: [
      "Paired computer and a project with a repo folder.",
      "Permission to view this team listing.",
    ],
    steps: [
      {
        title: "Install to your project",
        body: "Choose a project and Mac on install. Playbook files apply when you pull into the repo on the computer.",
      },
      {
        title: "Run",
        body: isWorkflow
          ? "Open the workflow runner, complete the form, and follow browser checkpoints."
          : "Send a task with this agent from your library.",
      },
    ],
    whenToUse: capability.description,
    estimatedMinutes: isWorkflow ? 15 : 5,
    supportedWriters: DEFAULT_WRITERS,
  };
};

export default buildUsageGuideForPublishedCapability;

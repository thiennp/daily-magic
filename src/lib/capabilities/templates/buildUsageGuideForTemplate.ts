import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import type { CapabilityTemplate } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";
import type CapabilityTemplateUsageGuide from "@/lib/capabilities/templates/types/CapabilityTemplateUsageGuide.type";

const DEFAULT_WRITERS: CapabilityTemplateUsageGuide["supportedWriters"] = [
  "anthropic",
  "openai",
  "cursor",
  "google",
];

const buildUsageGuideForTemplate = (
  template: CapabilityTemplate,
): CapabilityTemplateUsageGuide => {
  const isWorkflow = template.type === CapabilityType.WORKFLOW;
  const typeLabel = isWorkflow ? "workflow" : "agent";

  return {
    summary: `Use this ${typeLabel} inside a project so playbook rules stay in the repo. ${template.description}`,
    prerequisites: [
      "A paired Mac with Agent Witch running (or Cursor Cloud API key for cloud-only runs).",
      "A project linked to that Mac with a folder path set before you pull playbook files into the repo.",
      "Sign in to Agent Witch Console — marketplace install saves to your library and links the listing to the project you pick.",
    ],
    steps: isWorkflow
      ? [
          {
            title: "Install to a project",
            body: "On Marketplace, choose **Install**, pick a **project** and your **Mac**, then confirm. The workflow is added to your library and bound to that project (not to a global harness folder).",
          },
          {
            title: "Pull playbook into the repo (Mac)",
            body: "On the Mac, open Agent Witch Live → the same project → **Pull into repo** so rules/skills copy into the project’s `.cursor/` tree and `project.json` updates.",
          },
          {
            title: "Run the workflow",
            body: "From Home or the workflow runner, select this workflow, fill the form, and choose a writer (Anthropic, OpenAI, Cursor, or Google). Human checkpoints pause in the browser; agent steps run on the Mac.",
          },
          {
            title: "Review and reuse",
            body: "Finish checkpoints, read the run in **Runs**, and save or tweak inputs for the next time.",
          },
        ]
      : [
          {
            title: "Install to a project",
            body: "Install from Marketplace with a **project** and **Mac** selected. The agent profile is saved to your library and linked to the project.",
          },
          {
            title: "Pull playbook when needed",
            body: "If this agent ships specialist rules, pull the project playbook on the Mac before the first run.",
          },
          {
            title: "Send a task",
            body: "Open **New task**, pick this agent from your library, set the project folder, choose your writer, and send.",
          },
        ],
    whenToUse: template.outcomes[0] ?? template.detail,
    whenNotToUse:
      "Skip when you have no project folder on the Mac yet — create or link a project first.",
    estimatedMinutes: isWorkflow ? 15 : 5,
    supportedWriters: DEFAULT_WRITERS,
  };
};

export default buildUsageGuideForTemplate;

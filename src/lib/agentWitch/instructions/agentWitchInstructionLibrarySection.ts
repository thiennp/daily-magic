import type { AgentWitchInstructionSection } from "@/lib/agentWitch/instructions/agentWitchInstructionDocument.type";

export const AGENT_WITCH_INSTRUCTION_LIBRARY_SECTION: AgentWitchInstructionSection =
  {
    id: "library",
    title: "Library",
    summary:
      "Library holds your workflows and agents — publish them, run them on your Mac, or share them with your company.",
    topics: [
      {
        id: "capability-types",
        title: "Workflows vs agents",
        body: "Workflows collect structured inputs (form fields) and build a prompt for the writer. Agents are playbook-style instructions for a recurring assistant behavior.",
        bullets: [
          "workflow — form-driven tasks with typed fields",
          "agent — playbook / assistant definition",
        ],
      },
      {
        id: "run-on-mac",
        title: "Run on Mac",
        body: "From Library, open a capability and choose Run on Mac. This opens the Home task composer with the capability pre-selected.",
      },
      {
        id: "publish",
        title: "Publishing",
        body: "Publish a capability to make it visible in your company directory and optionally Marketplace. Published items can include harness bundles teammates can install.",
      },
      {
        id: "copy-prompt",
        title: "Copy for other AI",
        body: "Some items expose a copyable prompt so you can reuse the recipe outside Agent Witch when needed.",
      },
      {
        id: "my-offerings",
        title: "Your offerings on Home",
        body: "Home shows what you have published so teammates can discover your playbooks without hunting through admin screens.",
      },
    ],
  };

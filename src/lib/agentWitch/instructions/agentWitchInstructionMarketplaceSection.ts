import type { AgentWitchInstructionSection } from "@/lib/agentWitch/instructions/agentWitchInstructionDocument.type";

export const AGENT_WITCH_INSTRUCTION_MARKETPLACE_SECTION: AgentWitchInstructionSection =
  {
    id: "marketplace",
    title: "Marketplace",
    summary:
      "Marketplace is where teammates discover published workflows and agents, preview them, save copies, and install linked rules bundles.",
    topics: [
      {
        id: "what-is-listed",
        title: "What appears in Marketplace",
        body: "Listings are capabilities teammates published for your company: workflow playbooks with form fields or custom agent playbooks. Many listings include a linked harness bundle (rules, skills, commands, instructions, subagents).",
      },
      {
        id: "browse-and-preview",
        title: "Browse and preview",
        body: "Open Marketplace from navigation, read the description and example request, and inspect workflow fields before committing to a run or save.",
      },
      {
        id: "save-to-library",
        title: "Save a copy to Library",
        body: "Fork or save a marketplace item into your personal Library so you can edit fields, run on your Mac, or publish your own variant later.",
      },
      {
        id: "install-bundle",
        title: "Install the rules bundle",
        body: "When a listing has a harness bundle and your Mac agent is online, install imports the bundle to your local writer environment so tasks follow the same standards as the publisher.",
      },
      {
        id: "presets",
        title: "Starter presets",
        body: "Official starter templates may appear with ready-made harness content. Use them to learn patterns before publishing company-specific playbooks.",
      },
    ],
  };

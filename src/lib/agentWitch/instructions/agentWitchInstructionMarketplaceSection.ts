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
        body: "Listings are workflows and agents teammates published for your company. Many include a rules bundle (skills, shortcuts, instructions, and specialist assistants).",
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
        body: "When a listing includes rules and your Mac is online, install copies them so tasks follow the same standards as the publisher.",
      },
      {
        id: "presets",
        title: "Starter presets",
        body: "Official starter templates may include ready-made rules. Use them to learn patterns before publishing company-specific playbooks.",
      },
    ],
  };

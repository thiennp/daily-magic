import type { AgentWitchInstructionSection } from "@/lib/agentWitch/instructions/agentWitchInstructionDocument.type";

export const AGENT_WITCH_INSTRUCTION_HARNESS_SECTION: AgentWitchInstructionSection =
  {
    id: "harness",
    title: "Rules bundles",
    summary:
      "Portable sets of rules, skills, shortcuts, and instructions that keep AI behavior consistent across people and Macs.",
    topics: [
      {
        id: "bundle-contents",
        title: "What a bundle contains",
        body: "A bundle groups rules, skills, shortcuts, instructions, and specialist assistants. Items can belong to one or more bundles.",
      },
      {
        id: "local-manifest",
        title: "What your Mac reports",
        body: "When connected, your Mac sends its installed rules to the app. Your setup shows what is installed and which AI tool wrote it.",
      },
      {
        id: "install-sources",
        title: "How bundles arrive on a Mac",
        body: "Install from Marketplace or Library when your Mac is online, borrow from teammates, or add items from Your setup in the browser.",
      },
      {
        id: "catalog-publish",
        title: "Sharing your setup",
        body: "From Your setup, publish while your Mac is online so teammates can borrow the bundles you choose to share.",
      },
      {
        id: "sharing-visibility",
        title: "Who can borrow",
        body: "Each bundle can stay private, visible to company members only, or visible to any signed-in user.",
        bullets: [
          "private — only you",
          "group — company members only",
          "public — any signed-in user can borrow",
        ],
      },
      {
        id: "writer-sync",
        title: "Saving rules from the browser",
        body: "Your setup can compose items in the browser and save them to your Mac. The Mac stores them for the AI tool you selected.",
      },
    ],
  };

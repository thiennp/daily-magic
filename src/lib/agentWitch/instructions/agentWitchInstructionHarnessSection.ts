import type { AgentWitchInstructionSection } from "@/lib/agentWitch/instructions/agentWitchInstructionDocument.type";

export const AGENT_WITCH_INSTRUCTION_HARNESS_SECTION: AgentWitchInstructionSection =
  {
    id: "harness",
    title: "Rules bundles (harness)",
    summary:
      "Harness bundles are portable sets of rules, skills, commands, instructions, and subagents that keep writer behavior consistent across people and machines.",
    topics: [
      {
        id: "bundle-contents",
        title: "What a bundle contains",
        body: "A bundle (harness set) groups writer items: rules, skills, commands, instructions, and specialist subagents. Items can belong to one or more bundles.",
      },
      {
        id: "local-manifest",
        title: "Local manifest on the Mac",
        body: "The Mac agent reports its local harness manifest to the server when connected. Your setup shows what is installed and which writer agent wrote it.",
      },
      {
        id: "install-sources",
        title: "How bundles arrive on a Mac",
        body: "Install bundles from Marketplace or Library when the Mac is online, import borrowed bundles from teammates, or receive harness write requests from the browser composer.",
      },
      {
        id: "catalog-publish",
        title: "Publishing a catalog snapshot",
        body: "From Your setup, publish a catalog snapshot while the Mac agent is online so sharing controls and marketplace borrow flows know which bundles you expose.",
      },
      {
        id: "sharing-visibility",
        title: "Bundle sharing visibility",
        body: "Each published bundle can stay private, visible to company members only, or visible to any signed-in user.",
        bullets: [
          "private — only you",
          "group — company members only",
          "public — any signed-in user can borrow",
        ],
      },
      {
        id: "writer-sync",
        title: "Sending items to the local writer",
        body: "Your setup can compose harness items in the browser and send them to the paired Mac. The Mac agent forwards them to the selected writer CLI for local persistence.",
      },
    ],
  };

import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";
import { AGENT_WITCH_INSTRUCTION_COMPANIES_SECTION } from "@/lib/agentWitch/instructions/agentWitchInstructionCompaniesSection";
import { AGENT_WITCH_INSTRUCTION_HARNESS_SECTION } from "@/lib/agentWitch/instructions/agentWitchInstructionHarnessSection";
import { AGENT_WITCH_INSTRUCTION_LIBRARY_SECTION } from "@/lib/agentWitch/instructions/agentWitchInstructionLibrarySection";
import { AGENT_WITCH_INSTRUCTION_MARKETPLACE_SECTION } from "@/lib/agentWitch/instructions/agentWitchInstructionMarketplaceSection";
import { AGENT_WITCH_INSTRUCTION_OVERVIEW_SECTION } from "@/lib/agentWitch/instructions/agentWitchInstructionOverviewSection";
import { AGENT_WITCH_INSTRUCTION_SETUP_SECTION } from "@/lib/agentWitch/instructions/agentWitchInstructionSetupSection";
import { AGENT_WITCH_INSTRUCTION_TASKS_SECTION } from "@/lib/agentWitch/instructions/agentWitchInstructionTasksSection";
import {
  AGENT_WITCH_INSTRUCTION_SCHEMA_VERSION,
  type AgentWitchInstructionDocument,
} from "@/lib/agentWitch/instructions/agentWitchInstructionDocument.type";
import { buildAgentWitchInstructionCommunicationGuide } from "@/lib/agentWitch/instructions/buildAgentWitchInstructionCommunicationGuide";
import { resolveAgentWitchWsUrl } from "@/lib/agentWitch/resolveAgentWitchWsUrl";

const INSTRUCTIONS_PATH = "/api/agent-witch/instructions";
const STATUS_PATH = "/api/agent-witch/status";
const INSTALL_SCRIPT_PATH = "/install/agent-witch.sh";
const INSTALL_VERSION_PATH = "/install/agent-witch/version";
const DEFAULT_WS_PATH = "/api/agent-witch/ws";

export const AGENT_WITCH_INSTRUCTION_SECTIONS = [
  AGENT_WITCH_INSTRUCTION_OVERVIEW_SECTION,
  AGENT_WITCH_INSTRUCTION_SETUP_SECTION,
  AGENT_WITCH_INSTRUCTION_TASKS_SECTION,
  AGENT_WITCH_INSTRUCTION_LIBRARY_SECTION,
  AGENT_WITCH_INSTRUCTION_MARKETPLACE_SECTION,
  AGENT_WITCH_INSTRUCTION_COMPANIES_SECTION,
  AGENT_WITCH_INSTRUCTION_HARNESS_SECTION,
] as const;

interface BuildAgentWitchInstructionDocumentInput {
  readonly appOrigin: string;
  readonly websocketPath?: string;
}

export const buildAgentWitchInstructionDocument = (
  input: BuildAgentWitchInstructionDocumentInput,
): AgentWitchInstructionDocument => {
  const websocketPath =
    input.websocketPath?.trim() ||
    process.env.AGENT_WITCH_WS_PATH ||
    DEFAULT_WS_PATH;

  return {
    schemaVersion: AGENT_WITCH_INSTRUCTION_SCHEMA_VERSION,
    productName: AGENT_WITCH_PRODUCT_NAME,
    generatedAt: new Date().toISOString(),
    audience: "local_mac_agent_and_end_user_assistant",
    privacyNote:
      "This document describes product behavior only. It intentionally excludes source-code metadata, implementation secrets, credentials, and personal account data.",
    purpose:
      "Help a local Mac agent or assistant answer end-user questions about how Agent Witch works.",
    sections: AGENT_WITCH_INSTRUCTION_SECTIONS,
    communication: buildAgentWitchInstructionCommunicationGuide(websocketPath),
    api: {
      instructionsPath: INSTRUCTIONS_PATH,
      statusPath: STATUS_PATH,
      installScriptPath: INSTALL_SCRIPT_PATH,
      installVersionPath: INSTALL_VERSION_PATH,
      websocketPath,
      websocketUrl: resolveAgentWitchWsUrl(input.appOrigin),
    },
  };
};

export const findAgentWitchInstructionSection = (
  sectionId: string,
): (typeof AGENT_WITCH_INSTRUCTION_SECTIONS)[number] | undefined =>
  AGENT_WITCH_INSTRUCTION_SECTIONS.find((section) => section.id === sectionId);

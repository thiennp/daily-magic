import type { AgentWitchInstructionDocument } from "@/lib/agentWitch/instructions/agentWitchInstructionDocument.type";

const formatBullets = (bullets: readonly string[] | undefined): string => {
  if (bullets === undefined || bullets.length === 0) {
    return "";
  }

  return `\n${bullets.map((bullet) => `- ${bullet}`).join("\n")}`;
};

export const formatAgentWitchInstructionsAsText = (
  document: AgentWitchInstructionDocument,
): string => {
  const sectionText = document.sections
    .map((section) => {
      const topics = section.topics
        .map(
          (topic) =>
            `### ${topic.title}\n${topic.body}${formatBullets(topic.bullets)}`,
        )
        .join("\n\n");

      return `## ${section.title}\n${section.summary}\n\n${topics}`;
    })
    .join("\n\n");

  const messageTypes = document.communication.messageTypes
    .map((entry) => `- ${entry.type} (${entry.direction}): ${entry.purpose}`)
    .join("\n");

  return [
    `# ${document.productName} — product instructions`,
    document.purpose,
    document.privacyNote,
    "",
    sectionText,
    "",
    "## WebSocket communication",
    document.communication.summary,
    "",
    "Pairing steps:",
    ...document.communication.pairing.map((step) => `- ${step}`),
    "",
    "Message types:",
    messageTypes,
    "",
    "## API references (relative to app origin)",
    `- Instructions: ${document.api.instructionsPath}`,
    `- WebSocket: ${document.api.websocketUrl}`,
    `- Status (signed in): ${document.api.statusPath}`,
    `- Install script: ${document.api.installScriptPath}`,
  ].join("\n");
};

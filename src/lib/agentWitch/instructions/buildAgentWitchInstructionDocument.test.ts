import { describe, expect, it } from "vitest";

import {
  AGENT_WITCH_INSTRUCTION_SECTIONS,
  buildAgentWitchInstructionDocument,
  findAgentWitchInstructionSection,
} from "@/lib/agentWitch/instructions/buildAgentWitchInstructionDocument";
import { formatAgentWitchInstructionsAsText } from "@/lib/agentWitch/instructions/formatAgentWitchInstructionsAsText";

describe("buildAgentWitchInstructionDocument", () => {
  it("includes every major product area", () => {
    const document = buildAgentWitchInstructionDocument({
      appOrigin: "https://app.example.com",
    });

    expect(document.sections).toHaveLength(
      AGENT_WITCH_INSTRUCTION_SECTIONS.length,
    );
    expect(findAgentWitchInstructionSection("marketplace")?.title).toBe(
      "Marketplace",
    );
    expect(document.api.instructionsPath).toBe("/api/agent-witch/instructions");
    expect(document.api.websocketUrl).toContain("/api/agent-witch/ws");
  });

  it("avoids repository or owner metadata in generated text", () => {
    const text = formatAgentWitchInstructionsAsText(
      buildAgentWitchInstructionDocument({
        appOrigin: "https://app.example.com",
      }),
    );

    expect(text.toLowerCase()).not.toContain("github.com");
    expect(text.toLowerCase()).not.toContain("bitbucket");
    expect(text).toContain("Agent Witch");
    expect(text).toContain("Marketplace");
    expect(text).toContain("command.claude.run");
  });
});

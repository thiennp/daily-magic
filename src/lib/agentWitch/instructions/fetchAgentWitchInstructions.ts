import type { AgentWitchInstructionDocument } from "@/lib/agentWitch/instructions/agentWitchInstructionDocument.type";
import { deriveInstructionsUrlFromWsUrl } from "@/lib/agentWitch/instructions/deriveInstructionsUrlFromWsUrl";

export const fetchAgentWitchInstructions = async (input: {
  readonly wsUrl: string;
  readonly section?: string;
  readonly format?: "json" | "text";
}): Promise<AgentWitchInstructionDocument | string> => {
  const params = new URLSearchParams();

  if (input.section !== undefined && input.section.length > 0) {
    params.set("section", input.section);
  }

  if (input.format === "text") {
    params.set("format", "text");
  }

  const query = params.toString();
  const instructionsUrl = `${deriveInstructionsUrlFromWsUrl(input.wsUrl)}${query.length > 0 ? `?${query}` : ""}`;
  const response = await fetch(instructionsUrl, {
    headers: {
      Accept: input.format === "text" ? "text/markdown" : "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Agent Witch instructions request failed (${response.status}).`,
    );
  }

  if (input.format === "text") {
    return response.text();
  }

  const payload: unknown = await response.json();

  if (
    typeof payload !== "object" ||
    payload === null ||
    !("ok" in payload) ||
    (payload as { ok: boolean }).ok !== true
  ) {
    throw new Error("Agent Witch instructions response was invalid.");
  }

  return payload as unknown as AgentWitchInstructionDocument;
};

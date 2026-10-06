import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

export const ensureWriterOnMac = async (
  writerAgent: HarnessWriterAgent,
): Promise<string> => {
  const response = await fetch("/api/agent-witch/writer/ensure", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ writerAgent }),
  });
  const body: unknown = await response.json();
  if (!response.ok) {
    if (
      typeof body === "object" &&
      body !== null &&
      "error" in body &&
      typeof (body as { error: unknown }).error === "string"
    ) {
      return (body as { error: string }).error;
    }
    return "Could not reach your computer.";
  }
  return "Ensure command sent to your computer over WebSocket.";
};

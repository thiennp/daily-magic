import type { CreatedCursorCloudAgent } from "@/lib/cursorCloud/createCursorCloudAgentRun";

export const buildCursorCloudRunResultOutput = (
  created: CreatedCursorCloudAgent,
): string =>
  [
    `Cursor Cloud agent: ${created.agentId}`,
    created.agentUrl !== null ? `Open: ${created.agentUrl}` : null,
    `Run: ${created.runId} (${created.runStatus})`,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");

export const resolveCursorCloudAuthSecret = (): string | null => {
  const authSecret = process.env.AUTH_SECRET;
  return typeof authSecret === "string" && authSecret.length > 0
    ? authSecret
    : null;
};

import { isAgentWitchWebSocketAvailableForOrigin } from "@/lib/agentWitch/isAgentWitchWebSocketAvailable";

export const buildAgentWitchWebSocketSupportWarning = (
  origin: string,
  wsUrl: string,
): string => {
  if (isAgentWitchWebSocketAvailableForOrigin(origin)) {
    return "";
  }

  return `
echo "WARNING: ${origin} cannot host AgentWitch WebSockets on Vercel/serverless." >&2
echo "Deploy with npm run start on a Node host (Railway, Render, Fly.io, VPS), not Vercel serverless." >&2
echo "Target WebSocket ${wsUrl} will stay disconnected on this host." >&2
`;
};

import { isAgentWitchWebSocketSupportedOrigin } from "@/lib/agentWitch/isAgentWitchWebSocketSupportedHost";

export const buildAgentWitchWebSocketSupportWarning = (
  origin: string,
  wsUrl: string,
): string => {
  if (isAgentWitchWebSocketSupportedOrigin(origin)) {
    return "";
  }

  return `
echo "WARNING: ${origin} cannot host Agent Witch WebSockets on Vercel/serverless." >&2
echo "Use a Node deployment with npm run start, or install from http://localhost:3000." >&2
echo "Target WebSocket ${wsUrl} will stay disconnected on this host." >&2
`;
};

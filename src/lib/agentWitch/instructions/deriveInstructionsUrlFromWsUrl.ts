export const deriveInstructionsUrlFromWsUrl = (wsUrl: string): string => {
  const httpOrigin = wsUrl
    .replace(/^wss:/, "https:")
    .replace(/^ws:/, "http:")
    .replace(/\/api\/agent-witch\/ws\/?$/, "");

  return `${httpOrigin}/api/agent-witch/instructions`;
};

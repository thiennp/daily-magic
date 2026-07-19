/** Show revive only when the local bridge WebSocket is down. */
export const shouldShowAgentWitchLocalReviveButton = (
  wsConnected: boolean,
): boolean => !wsConnected;

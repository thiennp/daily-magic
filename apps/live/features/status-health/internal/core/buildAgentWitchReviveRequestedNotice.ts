import { resolveAgentWitchRevivePlatform } from "@agent-witch/install-layout/presentation";

/**
 * Notice after `POST /api/revive`. Only macOS restarts through launchd; elsewhere the
 * revive reconnects the WebSocket.
 */
export const buildAgentWitchReviveRequestedNotice = (
  platform: string,
): string =>
  resolveAgentWitchRevivePlatform(platform) === "mac"
    ? "Revive requested. The bridge will reconnect if this Mac can reach launchd."
    : "Revive requested. The bridge will reconnect when this computer can reach Agent Witch Cloud.";

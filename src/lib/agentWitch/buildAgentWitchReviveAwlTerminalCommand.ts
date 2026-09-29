import { AGENT_WITCH_LIVE_APP_PORT } from "@agent-witch/shared/network";
import { resolveAgentWitchAppHome } from "@/lib/agentWitch/resolveAgentWitchAppHome";

const resolveHostnameForReviveCommand = (): string => {
  if (typeof window !== "undefined") {
    return window.location.hostname;
  }
  return "www.agentwitch.com";
};

/**
 * Terminal steps to restart Agent Witch Live (`:43347`) on the Mac in front of the browser.
 * Uses the production vs localhost LaunchAgent prefix from the current AWC hostname.
 */
export const buildAgentWitchReviveAwlTerminalCommand = (
  hostname: string = resolveHostnameForReviveCommand(),
): string => {
  const { launchAgentPrefix, installDirName } =
    resolveAgentWitchAppHome(hostname);
  const livePort = AGENT_WITCH_LIVE_APP_PORT;
  return `AW_HOME="$HOME/${installDirName}"
launchctl kickstart -k "gui/$(id -u)/${launchAgentPrefix}"
sleep 2
curl -sS -m 5 "http://127.0.0.1:${livePort}/health" || echo "AWL still not responding — see logs:"
tail -20 "$AW_HOME/agent-witch.error.log" 2>/dev/null || true`;
};

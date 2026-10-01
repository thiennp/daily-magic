import path from "node:path";

import { resolveAgentWitchLaunchAgentPrefix } from "@agent-witch/install-layout";
import { AGENT_WITCH_LIVE_APP_PORT } from "@agent-witch/shared/network";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export const buildAgentWitchReviveAwlStatusSection = (input: {
  readonly installDir: string;
}): string => {
  const prefix = resolveAgentWitchLaunchAgentPrefix(input.installDir);
  const installDirName = path.basename(input.installDir);
  const command = `AW_HOME="$HOME/${installDirName}"
launchctl kickstart -k "gui/$(id -u)/${prefix}"
sleep 2
curl -sS -m 5 http://127.0.0.1:${AGENT_WITCH_LIVE_APP_PORT}/health`;

  return `<section class="card">
    <p class="eyebrow">Agent Witch Local</p>
    <h2>Revive local app (:${AGENT_WITCH_LIVE_APP_PORT})</h2>
    <p class="lede muted">If this page loaded but the prompt optimizer or other Live pages fail, or if Agent Witch Cloud cannot open Status, restart the Mac client below. <code>com.agent-witch-live</code> only exists when Live runs as a separate LaunchAgent; most installs use one <code>${escapeHtml(prefix)}</code> process that includes Live.</p>
    <p class="muted">On this Mac, open Terminal, paste, and press Return:</p>
    <pre class="sdlc-pre mono">${escapeHtml(command)}</pre>
    <p class="muted">Then check logs: <code>tail -40 "$AW_HOME/agent-witch.error.log"</code></p>
  </section>`;
};

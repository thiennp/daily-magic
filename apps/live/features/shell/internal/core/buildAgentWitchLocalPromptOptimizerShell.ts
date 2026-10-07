import { AGENT_WITCH_LOCAL_APP_STYLES } from "./agentWitchLocalAppStyles";
import { AGENT_WITCH_LOCAL_PROMPT_OPTIMIZER_SHELL_STYLES } from "./agentWitchLocalPromptOptimizerShellStyles";
import { AGENT_WITCH_LOCAL_HEARTBEAT_ELAPSED_LIVE_SCRIPT } from "../../../status-health/internal/core/buildAgentWitchLocalHeartbeatElapsedMarkup";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

/**
 * DF-034: Prompt optimizer page chrome for the Mac app WKWebView.
 * Only Prompt optimizer + Guide links (both allowed for the Mac UA); the Mac
 * window sidebar owns Computer · History · Settings. Sand palette + Pine.
 */
export const buildAgentWitchLocalPromptOptimizerShell = (input: {
  readonly title: string;
  readonly body: string;
  readonly installBundleVersionLabel?: string;
}): string => {
  const version = escapeHtml(
    input.installBundleVersionLabel?.trim() ?? "unknown",
  );
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <title>${escapeHtml(input.title)} · AgentWitch Local</title>
  <style>${AGENT_WITCH_LOCAL_APP_STYLES}${AGENT_WITCH_LOCAL_PROMPT_OPTIMIZER_SHELL_STYLES}</style>
</head>
<body class="awl-po">
  <header class="awl-po-header">
    <span class="awl-po-glyph" aria-hidden="true">AW</span>
    <span class="awl-po-title">Prompt optimizer</span>
    <nav class="awl-po-nav" aria-label="Prompt optimizer">
      <a class="awl-po-link" href="/prompt-optimizer">Optimizer</a>
      <a class="awl-po-link" href="/prompt-optimizer/guide">Guide</a>
    </nav>
    <span class="awl-po-version" title="Install bundle">Local ${version}</span>
  </header>
  <main class="site-main awl-po-main">${input.body}</main>
  <script>${AGENT_WITCH_LOCAL_HEARTBEAT_ELAPSED_LIVE_SCRIPT}</script>
</body>
</html>`;
};

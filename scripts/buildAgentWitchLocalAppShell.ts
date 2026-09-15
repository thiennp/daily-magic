import { AGENT_WITCH_LOCAL_APP_STYLES } from "./agentWitchLocalAppStyles";
import { AGENT_WITCH_LOCAL_HEARTBEAT_ELAPSED_LIVE_SCRIPT } from "./buildAgentWitchLocalHeartbeatElapsedMarkup";

export type AgentWitchLocalAppNavPath =
  "/" | "/status" | "/errors" | "/traffic" | "/knowledge" | "/harness";

const LOGO_MARK_SVG = `<svg class="brand-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path class="brand-mark-outline" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-fill" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-cross" d="M12 6v12m-6-6h12" stroke-linecap="round" />
  <path class="brand-mark-slash" d="M15.5 8.5l-7 7" stroke-linecap="round" />
</svg>`;

const NAV_ITEMS: ReadonlyArray<{
  readonly href: AgentWitchLocalAppNavPath;
  readonly label: string;
}> = [
  { href: "/", label: "Home" },
  { href: "/status", label: "Status" },
  { href: "/errors", label: "Errors" },
  { href: "/traffic", label: "Traffic" },
  { href: "/knowledge", label: "Knowledge" },
  { href: "/harness", label: "Harness" },
];

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export const buildAgentWitchLocalAppShell = (input: {
  readonly title: string;
  readonly activePath: AgentWitchLocalAppNavPath;
  readonly body: string;
  readonly cloudAppOrigin: string;
  readonly prependBody?: string;
  readonly headerUpdateButtonHtml?: string;
}): string => {
  const nav = NAV_ITEMS.map((item) => {
    const isActive = item.href === input.activePath;
    return `<a class="nav-link${isActive ? " is-active" : ""}" href="${item.href}"${isActive ? ' aria-current="page"' : ""}>${item.label}</a>`;
  }).join("");

  const cloudOrigin = escapeHtml(input.cloudAppOrigin);
  const headerUpdateButtonHtml = input.headerUpdateButtonHtml ?? "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(input.title)} · Agent Witch Local</title>
  <style>${AGENT_WITCH_LOCAL_APP_STYLES}</style>
</head>
<body>
  <header class="site-header">
    <div class="site-header-inner">
      <a class="brand" href="/" aria-label="Agent Witch Local home">
        ${LOGO_MARK_SVG}
        <span class="brand-text">Agent Witch<span class="brand-sub">Local</span></span>
      </a>
      <div class="site-header-actions">
        <nav class="site-nav" aria-label="Local bridge">${nav}</nav>
        ${headerUpdateButtonHtml}
        <a class="btn btn-secondary cloud-open-link" href="${cloudOrigin}" target="_blank" rel="noopener noreferrer" aria-label="Open Agent Witch cloud at ${cloudOrigin}">Open cloud ↗</a>
      </div>
    </div>
  </header>
  <main class="site-main">${input.prependBody ?? ""}${input.body}</main>
  <script>${AGENT_WITCH_LOCAL_HEARTBEAT_ELAPSED_LIVE_SCRIPT}</script>
</body>
</html>`;
};

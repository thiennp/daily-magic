import { buildAgentWitchLocalHeartbeatElapsedMarkup } from "../../../status-health/internal/core/buildAgentWitchLocalHeartbeatElapsedMarkup";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export const buildAgentWitchLocalHomePageBody = (input: {
  readonly wsConnected: boolean;
  readonly lastHeartbeatAt: string | null;
  readonly installBundleVersion: string;
  readonly harnessSetCount: number;
  readonly knowledgeChunkCount: number;
  readonly trafficEntryCount: number;
  readonly wakeError: string | null;
  readonly errorLogExists: boolean;
  readonly errorLogByteSize: number;
}): string => {
  const connectionBadge = input.wsConnected
    ? `<span class="badge badge-online">Connected to cloud</span>`
    : `<span class="badge badge-offline">Not connected</span>`;

  const harnessMeta =
    input.harnessSetCount > 0
      ? `${input.harnessSetCount} set(s) installed — apply to a project or import more`
      : "Scan local .cursor folders and install rules on this Mac";

  const knowledgeMeta =
    input.knowledgeChunkCount > 0
      ? `${input.knowledgeChunkCount} embedded chunk(s) from past runs`
      : "Search what your agents remembered on this Mac";

  const trafficMeta =
    input.trafficEntryCount > 0
      ? `${input.trafficEntryCount} recent frame(s) logged`
      : "Inspect WebSocket frames when debugging";

  const errorLogMeta = input.errorLogExists
    ? input.errorLogByteSize > 0
      ? `${input.errorLogByteSize.toLocaleString("en-US")} bytes in agent-witch.error.log`
      : "Error log file is empty"
    : "No error log file yet";

  const wakeError = input.wakeError
    ? `<div class="alert-error">${escapeHtml(input.wakeError)}</div>`
    : "";

  const heartbeatElapsed = buildAgentWitchLocalHeartbeatElapsedMarkup(
    input.lastHeartbeatAt,
  );

  return `${wakeError}<section class="card home-hero">
      <p class="eyebrow">This Mac</p>
      <h1>Agent Witch local</h1>
      <p class="lede">Your on-machine control panel: bridge health, harness, run memory, and traffic — only on this Mac.</p>
      <div class="home-hero-badges">
        ${connectionBadge}
        <span class="muted">Install bundle <code>${escapeHtml(input.installBundleVersion)}</code></span>
        <span class="muted">Last heartbeat · ${heartbeatElapsed}</span>
      </div>
    </section>
    <div class="home-grid">
      <a class="home-card" href="/task">
        <p class="home-card-eyebrow">Delegate</p>
        <h2 class="home-card-title">Task</h2>
        <p class="home-card-lede">Run a writer on this Mac and report status to cloud when done.</p>
        <p class="home-card-meta">${input.wsConnected ? "Bridge connected — ready to delegate" : "Connect bridge on Status first"}</p>
      </a>
      <a class="home-card" href="/status">
        <p class="home-card-eyebrow">Health</p>
        <h2 class="home-card-title">Bridge status</h2>
        <p class="home-card-lede">WebSocket, link code, install bundle, and revive actions.</p>
        <p class="home-card-meta">${input.wsConnected ? "Bridge is up" : "Check connection details"}</p>
      </a>
      <a class="home-card" href="/harness">
        <p class="home-card-eyebrow">Setup</p>
        <h2 class="home-card-title">Harness</h2>
        <p class="home-card-lede">View installed sets, apply them to a project <code>.cursor</code>, or import from repos.</p>
        <p class="home-card-meta">${escapeHtml(harnessMeta)}</p>
      </a>
      <a class="home-card" href="/knowledge">
        <p class="home-card-eyebrow">Memory</p>
        <h2 class="home-card-title">Knowledge</h2>
        <p class="home-card-lede">Browse and search local RAG chunks written after agent runs on this Mac.</p>
        <p class="home-card-meta">${escapeHtml(knowledgeMeta)}</p>
      </a>
      <a class="home-card" href="/writer-sessions">
        <p class="home-card-eyebrow">Memory</p>
        <h2 class="home-card-title">Writer transcripts</h2>
        <p class="home-card-lede">Full local writer conversation logs and cold-continue context bundles.</p>
        <p class="home-card-meta">Canonical turns stored under ~/.agent-witch</p>
      </a>
      <a class="home-card" href="/errors">
        <p class="home-card-eyebrow">Diagnostics</p>
        <h2 class="home-card-title">Error log</h2>
        <p class="home-card-lede">Tail of client stderr — crashes, module errors, and bridge failures on this Mac.</p>
        <p class="home-card-meta">${escapeHtml(errorLogMeta)}</p>
      </a>
      <a class="home-card" href="/traffic">
        <p class="home-card-eyebrow">Debug</p>
        <h2 class="home-card-title">Traffic</h2>
        <p class="home-card-lede">See frames sent and received between this Mac and the cloud bridge.</p>
        <p class="home-card-meta">${escapeHtml(trafficMeta)}</p>
      </a>
    </div>`;
};

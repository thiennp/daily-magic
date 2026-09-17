import type { AgentWitchLocalWsTraceEntry } from "../../../diagnostics/internal/core/agentWitchLocalWsTraceLog";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const formatBodyPreview = (body: unknown): string => {
  try {
    return JSON.stringify(body, null, 2);
  } catch {
    return String(body);
  }
};

export const buildAgentWitchLocalStatusTraceSection = (input: {
  readonly entries: readonly AgentWitchLocalWsTraceEntry[];
}): string => {
  if (input.entries.length === 0) {
    return `<section class="card">
      <p class="eyebrow">WebSocket trace</p>
      <h2>Message trace</h2>
      <p class="lede muted">Redacted WS frames and local errors (kept 24h). Nothing recorded yet.</p>
    </section>`;
  }

  const rows = input.entries
    .map((entry, index) => {
      const formatBadge = entry.formatOk
        ? `<span class="badge badge-online">OK</span>`
        : `<span class="badge badge-warn">${escapeHtml(entry.formatError ?? "bad")}</span>`;
      const kindLabel =
        entry.kind === "ws_message"
          ? escapeHtml(entry.direction)
          : escapeHtml(entry.kind);
      const bodyId = `trace-body-${index}`;
      const bodyJson = escapeHtml(formatBodyPreview(entry.body));

      return `<tr>
        <td title="${escapeHtml(entry.at)}">${escapeHtml(entry.at.slice(11, 19))}</td>
        <td>${kindLabel}</td>
        <td><code>${escapeHtml(entry.command)}</code></td>
        <td>${formatBadge}</td>
        <td>
          <button type="button" class="btn btn-secondary btn-compact" onclick="const el=document.getElementById('${bodyId}'); if(el){el.hidden=!el.hidden;}">body</button>
          <pre id="${bodyId}" class="trace-body-pre" hidden>${bodyJson}</pre>
        </td>
      </tr>`;
    })
    .join("");

  return `<section class="card">
      <p class="eyebrow">WebSocket trace</p>
      <h2>Message trace</h2>
      <p class="lede">Latest frames (tokens masked as <code>h***t</code>). Auto-pruned after 24 hours.</p>
      <form method="POST" action="/api/trace/clear" class="actions" style="margin-bottom:12px">
        <button class="btn btn-ghost" type="submit">Clear trace</button>
      </form>
      <div class="table-wrap trace-table-wrap">
        <table>
          <thead>
            <tr><th>Time (UTC)</th><th>Dir</th><th>Command</th><th>Format</th><th>Body</th></tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </section>`;
};

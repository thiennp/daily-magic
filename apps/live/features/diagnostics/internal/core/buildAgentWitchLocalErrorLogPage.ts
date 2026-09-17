const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export const buildAgentWitchLocalErrorLogPageBody = (input: {
  readonly errorLogPath: string;
  readonly content: string;
  readonly exists: boolean;
  readonly truncated: boolean;
  readonly byteSize: number;
}): string => {
  const truncatedNote = input.truncated
    ? `<p class="alert-warn">Showing the last portion of a large log file.</p>`
    : "";

  const body =
    input.exists && input.content.length > 0
      ? `<pre class="error-log-view">${escapeHtml(input.content)}</pre>`
      : input.exists
        ? `<p class="empty">Error log exists but is empty.</p>`
        : `<p class="empty">No error log yet. When the Mac client crashes or writes stderr, entries appear in <code>${escapeHtml(input.errorLogPath)}</code>.</p>`;

  return `<section class="card">
      <p class="eyebrow">Diagnostics</p>
      <h1>Error log</h1>
      <p class="lede">Tail of the Agent Witch client stderr log on this Mac (newest lines at the bottom). New entries are prefixed with a UTC timestamp (<code>YYYY-MM-DDTHH:MM:SSZ</code>).</p>
      <p class="muted mono">${escapeHtml(input.errorLogPath)} · ${input.byteSize.toLocaleString("en-US")} bytes</p>
      ${truncatedNote}
      ${body}
      <form method="POST" action="/api/errors/clear" class="actions" style="margin-bottom:12px">
        <button class="btn btn-ghost" type="submit">Clear error log</button>
      </form>
      <div class="actions">
        <a class="btn btn-secondary" href="/">← Home</a>
        <a class="btn btn-secondary" href="/errors">Refresh</a>
      </div>
    </section>`;
};

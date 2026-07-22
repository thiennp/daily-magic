const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const formatLogEntry = (entry: {
  readonly timestamp?: string;
  readonly message?: string;
}): string => {
  const timestamp =
    typeof entry.timestamp === "string" && entry.timestamp.length > 0
      ? escapeHtml(entry.timestamp)
      : "";
  const message =
    typeof entry.message === "string" && entry.message.length > 0
      ? escapeHtml(entry.message)
      : "";

  return `<li><time>${timestamp}</time><pre>${message}</pre></li>`;
};

export const buildAgentWitchWakeLocalLogHtml = (input: {
  readonly port: number;
  readonly watchdogLogs: readonly {
    readonly timestamp?: string;
    readonly message?: string;
  }[];
  readonly updateLogs: readonly {
    readonly timestamp?: string;
    readonly message?: string;
  }[];
}): string => {
  const watchdogItems = input.watchdogLogs.map(formatLogEntry).join("");
  const updateItems = input.updateLogs.map(formatLogEntry).join("");

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Agent Witch local logs</title>
  <style>
    :root { color-scheme: light dark; font-family: ui-sans-serif, system-ui, sans-serif; }
    body { margin: 0; padding: 16px; background: #0b1020; color: #e8edf8; }
    h1 { font-size: 18px; margin: 0 0 8px; }
    .meta { color: #9aa7c7; margin-bottom: 16px; font-size: 13px; }
    section { margin-bottom: 20px; }
    h2 { font-size: 14px; margin: 0 0 8px; color: #c7d2f0; }
    ul { list-style: none; padding: 0; margin: 0; }
    li { border: 1px solid #24304f; border-radius: 8px; padding: 10px; margin-bottom: 8px; background: #121a31; }
    time { display: block; font-size: 11px; color: #8ea0cc; margin-bottom: 6px; }
    pre { margin: 0; white-space: pre-wrap; word-break: break-word; font-size: 12px; line-height: 1.45; }
    .empty { color: #8ea0cc; font-size: 13px; }
  </style>
</head>
<body>
  <h1>Agent Witch local logs</h1>
  <p class="meta">Wake server on 127.0.0.1:${input.port}</p>
  <section>
    <h2>Watchdog</h2>
    <ul>${watchdogItems || '<li class="empty">No watchdog log entries yet.</li>'}</ul>
  </section>
  <section>
    <h2>Self-update</h2>
    <ul>${updateItems || '<li class="empty">No self-update log entries yet.</li>'}</ul>
  </section>
</body>
</html>`;
};

export const buildAgentWitchWakeLocalPageHeaders = (): Record<
  string,
  string
> => ({
  "Content-Type": "text/html; charset=utf-8",
  "Content-Security-Policy":
    "frame-ancestors 'self' https://agentwitch.com https://www.agentwitch.com http://localhost:* http://127.0.0.1:*",
});

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const WRITER_OPTIONS: ReadonlyArray<{
  readonly value: string;
  readonly label: string;
}> = [
  { value: "claude-cli", label: "Claude CLI" },
  { value: "codex", label: "Codex" },
  { value: "cursor", label: "Cursor" },
  { value: "antigravity", label: "Antigravity" },
];

export const buildAgentWitchLocalTaskPageBody = (input: {
  readonly defaultWorkspace: string;
  readonly wsConnected: boolean;
  readonly flashMessage?: string | null;
  readonly flashError?: string | null;
  readonly lastRunId?: string | null;
}): string => {
  const writerOptions = WRITER_OPTIONS.map(
    (option) =>
      `<option value="${escapeHtml(option.value)}">${escapeHtml(option.label)}</option>`,
  ).join("");

  const connectionNote = input.wsConnected
    ? `<p class="muted">Bridge is connected — cloud job history will show run status when the task finishes.</p>`
    : `<div class="alert-error">Not connected to cloud. Link this Mac on the cloud dashboard before delegating.</div>`;

  const flashMessage =
    input.flashMessage !== undefined &&
    input.flashMessage !== null &&
    input.flashMessage.length > 0
      ? `<div class="alert-success">${escapeHtml(input.flashMessage)}</div>`
      : "";

  const flashError =
    input.flashError !== undefined &&
    input.flashError !== null &&
    input.flashError.length > 0
      ? `<div class="alert-error">${escapeHtml(input.flashError)}</div>`
      : "";

  const lastRun =
    input.lastRunId !== undefined &&
    input.lastRunId !== null &&
    input.lastRunId.length > 0
      ? `<p class="muted mono">Last run id: ${escapeHtml(input.lastRunId)}</p>`
      : "";

  return `${flashMessage}${flashError}<section class="card">
      <p class="eyebrow">Delegate</p>
      <h1>Run a task on this Mac</h1>
      <p class="lede">Dispatch work locally and report status to cloud when finished — no live terminal stream required.</p>
      ${connectionNote}
      <form class="task-form" method="POST" action="/task/dispatch">
        <label class="field">
          <span class="field-label">Writer</span>
          <select class="input" name="writerAgent" required>${writerOptions}</select>
        </label>
        <label class="field">
          <span class="field-label">Project folder (optional)</span>
          <input class="input mono" type="text" name="projectFolder" value="${escapeHtml(input.defaultWorkspace)}" placeholder="/path/to/repo" />
        </label>
        <label class="field">
          <span class="field-label">Task</span>
          <textarea class="input textarea" name="prompt" rows="8" required placeholder="What should the writer do on this Mac?"></textarea>
        </label>
        <div class="actions">
          <button class="btn btn-primary" type="submit" ${input.wsConnected ? "" : "disabled"}>Delegate task</button>
        </div>
      </form>
      ${lastRun}
    </section>`;
};

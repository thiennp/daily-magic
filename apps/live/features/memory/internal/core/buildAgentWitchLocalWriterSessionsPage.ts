import type { WriterSessionCanonicalRecord } from "./writerSessionTranscript.types";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const formatTurnBlock = (
  turnIndex: number,
  userPrompt: string,
  assistantOutput: string,
): string => {
  const user = escapeHtml(userPrompt);
  const assistant = escapeHtml(assistantOutput);
  return `<article class="transcript-turn">
  <p class="eyebrow">Turn ${turnIndex + 1}</p>
  <h3 class="transcript-role">User</h3>
  <pre class="transcript-body">${user}</pre>
  <h3 class="transcript-role">Assistant</h3>
  <pre class="transcript-body">${assistant}</pre>
</article>`;
};

const formatSessionBlock = (session: WriterSessionCanonicalRecord): string => {
  const project =
    session.projectFolderPath !== null
      ? `<p class="muted mono">${escapeHtml(session.projectFolderPath)}</p>`
      : `<p class="muted">No project folder</p>`;

  const turns =
    session.turns.length > 0
      ? session.turns
          .map((turn, index) =>
            formatTurnBlock(index, turn.userPrompt, turn.assistantOutput),
          )
          .join("")
      : `<p class="muted">No turns recorded yet.</p>`;

  return `<section class="card transcript-session">
    <p class="eyebrow">${escapeHtml(session.writerAgent)}</p>
    <h2 class="transcript-session-title">Session ${escapeHtml(session.sessionId.slice(0, 8))}…</h2>
    <p class="muted">Updated ${escapeHtml(session.updatedAt)}</p>
    ${project}
    ${turns}
  </section>`;
};

export const buildAgentWitchLocalWriterSessionsPageBody = (input: {
  readonly sessions: readonly WriterSessionCanonicalRecord[];
}): string => {
  const body =
    input.sessions.length > 0
      ? input.sessions.map(formatSessionBlock).join("")
      : `<section class="card"><p class="muted">No writer sessions stored on this Mac yet. Delegate tasks from the cloud or run a task locally — full transcripts appear here after each finished turn.</p></section>`;

  return `<section class="card">
      <p class="eyebrow">Memory</p>
      <h1>Writer session transcripts</h1>
      <p class="lede">Canonical prompts and outputs from local writer runs. A separate compressed bundle on disk is used when the CLI thread is cold but you continue the conversation.</p>
    </section>
    ${body}`;
};

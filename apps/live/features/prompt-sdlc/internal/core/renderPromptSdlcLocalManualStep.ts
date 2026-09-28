const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const verdictLine = (score: number | null, reasons: string | null): string => {
  const reason = reasons?.trim() ?? "";
  if (score === null || reason.length === 0) {
    return "";
  }
  return `<p class="sdlc-manual-verdict">Score ${score} / 100. ${escapeHtml(reason)}</p>`;
};

export const renderPromptSdlcLocalManualStep = (input: {
  readonly role: "judge" | "improve";
  readonly cycleId: string;
  readonly promptText: string;
  readonly score: number | null;
  readonly reasons: string | null;
  readonly history?: string | null;
}): string => {
  const hidden = `<input type="hidden" name="cycleId" value="${escapeHtml(input.cycleId)}">`;
  if (input.role === "judge") {
    return `<form class="sdlc-manual" method="POST" action="/prompt-sdlc"><input type="hidden" name="intent" value="manual-judge">${hidden}<label class="field"><span class="field-label">Score</span><input class="input sdlc-manual-score" type="number" name="score" min="0" max="100" step="1" required></label><label class="field"><span class="field-label">Reason</span><textarea class="input textarea" name="reasons" rows="4" required></textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save score</button></div></form>`;
  }

  const history = input.history?.trim() ?? "";
  const historyBlock =
    history.length === 0
      ? ""
      : `<pre class="mono">${escapeHtml(history)}</pre>`;

  return `<form class="sdlc-manual" method="POST" action="/prompt-sdlc"><input type="hidden" name="intent" value="manual-improve">${hidden}${verdictLine(input.score, input.reasons)}${historyBlock}<label class="field"><span class="field-label">Rewritten prompt</span><textarea class="input textarea" name="prompt" rows="8" required>${escapeHtml(input.promptText)}</textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save revision</button></div></form>`;
};

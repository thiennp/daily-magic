const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export const renderPromptSdlcLocalStopForm = (cycleId: string): string =>
  `<form method="POST" action="/prompt-sdlc"><input type="hidden" name="intent" value="stop"><input type="hidden" name="cycleId" value="${escapeHtml(cycleId)}"><button class="btn btn-secondary" type="submit">Finish</button><span class="muted">Stops the writers and keeps the best prompt. This run counts as complete.</span></form>`;

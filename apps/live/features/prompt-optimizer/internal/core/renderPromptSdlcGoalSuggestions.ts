const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export const renderPromptSdlcGoalSuggestions = (input: {
  readonly suggestKey: string;
  readonly options: readonly string[];
  readonly promptFingerprint: string;
  readonly folderFingerprint: string;
  readonly judgeFingerprint: string;
}): string => {
  const goalsJson = escapeHtml(JSON.stringify(input.options));
  const radios = input.options
    .map(
      (goal, index) =>
        `<label class="sdlc-goal-suggestion"><input type="radio" name="goalSuggestion" value="${String(index)}"> ${escapeHtml(goal)}</label>`,
    )
    .join("");
  return `<fieldset class="sdlc-goal-suggestions" data-suggest-key="${escapeHtml(input.suggestKey)}" data-suggest-goals="${goalsJson}" data-suggest-prompt="${escapeHtml(input.promptFingerprint)}" data-suggest-folder="${escapeHtml(input.folderFingerprint)}" data-suggest-judge="${escapeHtml(input.judgeFingerprint)}">
      <p class="sdlc-block-title">Suggested goals</p>
      <p class="muted">Pick one to fill the goal field, or choose None of these and type your own.</p>
      <div class="sdlc-goal-suggestion-list">${radios}
        <label class="sdlc-goal-suggestion"><input type="radio" name="goalSuggestion" value="none"> None of these — type my own</label>
      </div>
    </fieldset>`;
};

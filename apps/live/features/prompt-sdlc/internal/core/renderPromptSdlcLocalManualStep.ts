import { formatPromptSdlcRunDelay } from "../../../../adapters/promptSdlcAwcCore";
import type { PromptSdlcLocalRun } from "./promptSdlcLocalCycle.type";

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
  readonly avoid?: string | null;
  readonly instructions?: string | null;
  readonly run?: PromptSdlcLocalRun | null;
}): string => {
  const hidden = `<input type="hidden" name="cycleId" value="${escapeHtml(input.cycleId)}">`;
  const instructions = input.instructions?.trim() ?? "";
  const instructionNote =
    instructions.length === 0
      ? ""
      : `<p class="muted">Instructions</p><p>${escapeHtml(instructions)}</p>`;
  const run = input.run ?? null;
  const runBody = (run?.evidence ?? run?.output ?? "").trim();
  const lookedAt = run?.lookedAt?.trim() ?? "";
  const tokenReview = run?.tokenReview?.trim() ?? "";
  const runNote =
    run === null
      ? ""
      : `${lookedAt.length === 0 ? "" : `<p class="muted">Looked at ${escapeHtml(lookedAt)}.</p>`}<pre class="mono">${escapeHtml(runBody.length === 0 ? run.output : runBody)}</pre><p class="muted">Tokens used: ${run.tokens === null ? "not reported" : String(run.tokens)}. Delay: ${formatPromptSdlcRunDelay(run.delayMs)}.</p>${tokenReview.length === 0 ? "" : `<p class="muted">Token review: ${escapeHtml(tokenReview)}</p>`}`;
  if (input.role === "judge") {
    return `<form class="sdlc-manual" method="POST" action="/prompt-sdlc"><input type="hidden" name="intent" value="manual-judge">${hidden}${instructionNote}${runNote}<label class="field"><span class="field-label">Score</span><input class="input sdlc-manual-score" type="number" name="score" min="0" max="100" step="1" required></label><label class="field"><span class="field-label">Reason</span><textarea class="input textarea" name="reasons" rows="4" required></textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save score</button></div></form>`;
  }

  const avoid = input.avoid?.trim() ?? "";
  const avoidBlock =
    avoid.length === 0
      ? ""
      : `<p class="muted">Avoid</p><pre class="mono">${escapeHtml(avoid)}</pre>`;

  return `<form class="sdlc-manual" method="POST" action="/prompt-sdlc"><input type="hidden" name="intent" value="manual-improve">${hidden}${instructionNote}${verdictLine(input.score, input.reasons)}${avoidBlock}<label class="field"><span class="field-label">Rewritten prompt</span><textarea class="input textarea" name="prompt" rows="8" required>${escapeHtml(input.promptText)}</textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save revision</button></div></form>`;
};

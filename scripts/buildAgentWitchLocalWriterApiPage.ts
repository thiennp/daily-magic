import type { WriterExecutionBackend } from "./writerApi/resolveWriterExecutionBackend";
import type { WriterApiSecretsFile } from "./writerApi/WriterApiSecrets.type";
import { DEFAULT_WRITER_API_MODELS } from "./writerApi/WriterApiProvider.constant";
import { maskWriterApiKeyForDisplay } from "./writerApi/maskWriterApiKeyForDisplay";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const keyStatus = (
  secrets: WriterApiSecretsFile,
  provider: keyof WriterApiSecretsFile,
): string => {
  const apiKey = secrets[provider]?.apiKey;
  return apiKey !== undefined && apiKey.length > 0 ? "Saved" : "Not set";
};

const apiKeyInputAttributes = (
  secrets: WriterApiSecretsFile,
  provider: keyof WriterApiSecretsFile,
  emptyPlaceholder: string,
): string => {
  const apiKey = secrets[provider]?.apiKey;
  if (apiKey !== undefined && apiKey.length > 0) {
    const masked = maskWriterApiKeyForDisplay(apiKey);
    return `value="${escapeHtml(masked)}" placeholder="Paste a new key to replace"`;
  }
  return `placeholder="${escapeHtml(emptyPlaceholder)}"`;
};

export const buildAgentWitchLocalWriterApiPageBody = (input: {
  readonly writerExecutionBackend: WriterExecutionBackend;
  readonly secrets: WriterApiSecretsFile;
  readonly flashMessage?: string | null;
}): string => {
  const flash =
    input.flashMessage !== undefined &&
    input.flashMessage !== null &&
    input.flashMessage.length > 0
      ? `<div class="alert-success">${escapeHtml(input.flashMessage)}</div>`
      : "";

  const cliChecked = input.writerExecutionBackend === "cli" ? " checked" : "";
  const apiChecked = input.writerExecutionBackend === "api" ? " checked" : "";

  return `${flash}<section class="card">
      <p class="eyebrow">Writer</p>
      <h1>API keys (optional)</h1>
      <p class="lede">Run Claude, Codex, or Antigravity tasks with provider HTTP APIs instead of installing their CLIs on this Mac. Keys stay in <span class="mono">writer-api-secrets.json</span> on this machine only.</p>
      <form class="task-form" method="POST" action="/writer-api">
        <fieldset class="field">
          <span class="field-label">Execution</span>
          <label><input type="radio" name="writerExecutionBackend" value="cli"${cliChecked} /> Local CLI (default)</label>
          <label><input type="radio" name="writerExecutionBackend" value="api"${apiChecked} /> API key + Agent Witch script</label>
        </fieldset>
        <p class="muted">Maps: Claude → Anthropic, Codex → OpenAI, Antigravity → Google Gemini. Cursor still requires CLI or Cursor Cloud on the website.</p>
        <label class="field">
          <span class="field-label">Anthropic API key — ${escapeHtml(keyStatus(input.secrets, "anthropic"))}</span>
          <input class="input mono" type="password" name="anthropicApiKey" autocomplete="off" ${apiKeyInputAttributes(input.secrets, "anthropic", "sk-ant-…")} />
        </label>
        <label class="field">
          <span class="field-label">Anthropic model (optional)</span>
          <input class="input mono" type="text" name="anthropicModel" placeholder="${escapeHtml(DEFAULT_WRITER_API_MODELS.anthropic)}" value="${escapeHtml(input.secrets.anthropic?.model ?? "")}" />
        </label>
        <label class="field">
          <span class="field-label">OpenAI API key — ${escapeHtml(keyStatus(input.secrets, "openai"))}</span>
          <input class="input mono" type="password" name="openaiApiKey" autocomplete="off" ${apiKeyInputAttributes(input.secrets, "openai", "sk-…")} />
        </label>
        <label class="field">
          <span class="field-label">OpenAI model (optional)</span>
          <input class="input mono" type="text" name="openaiModel" placeholder="${escapeHtml(DEFAULT_WRITER_API_MODELS.openai)}" value="${escapeHtml(input.secrets.openai?.model ?? "")}" />
        </label>
        <label class="field">
          <span class="field-label">Google API key — ${escapeHtml(keyStatus(input.secrets, "google"))}</span>
          <input class="input mono" type="password" name="googleApiKey" autocomplete="off" ${apiKeyInputAttributes(input.secrets, "google", "AI…")} />
        </label>
        <label class="field">
          <span class="field-label">Gemini model (optional)</span>
          <input class="input mono" type="text" name="googleModel" placeholder="${escapeHtml(DEFAULT_WRITER_API_MODELS.google)}" value="${escapeHtml(input.secrets.google?.model ?? "")}" />
        </label>
        <div class="actions">
          <button class="btn btn-primary" type="submit">Save</button>
        </div>
      </form>
    </section>`;
};

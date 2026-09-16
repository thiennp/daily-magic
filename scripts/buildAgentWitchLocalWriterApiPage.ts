import type { WriterApiProvider } from "./writerApi/WriterApiProvider.constant";
import type { WriterExecutionBackend } from "./writerApi/resolveWriterExecutionBackend";
import type { WriterApiSecretsFile } from "./writerApi/WriterApiSecrets.type";
import { maskWriterApiKeyForDisplay } from "./writerApi/maskWriterApiKeyForDisplay";
import { resolveWriterApiModelSelectValue } from "./writerApi/resolveWriterApiModel";
import { WRITER_API_KEY_CONSOLE_LINKS } from "./writerApi/writerApiKeyConsoleUrls.constant";
import {
  WRITER_API_MODEL_AUTO,
  WRITER_API_MODEL_SELECT_OPTIONS,
} from "./writerApi/writerApiModelOptions.constant";

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

const buildApiKeyField = (
  secrets: WriterApiSecretsFile,
  provider: WriterApiProvider,
  fieldName: string,
  title: string,
  emptyPlaceholder: string,
): string => {
  const consoleLink = WRITER_API_KEY_CONSOLE_LINKS[provider];
  return `<label class="field">
          <span class="field-label">${escapeHtml(title)} API key — ${escapeHtml(keyStatus(secrets, provider))} · <a class="field-link" href="${escapeHtml(consoleLink.href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(consoleLink.label)}</a></span>
          <input class="input mono" type="password" name="${escapeHtml(fieldName)}" autocomplete="off" ${apiKeyInputAttributes(secrets, provider, emptyPlaceholder)} />
        </label>`;
};

const buildModelSelectField = (
  secrets: WriterApiSecretsFile,
  provider: WriterApiProvider,
  fieldName: string,
  label: string,
): string => {
  const selected = resolveWriterApiModelSelectValue(secrets[provider]?.model);
  const knownValues = new Set(
    WRITER_API_MODEL_SELECT_OPTIONS[provider].map((option) => option.value),
  );
  const optionsHtml = WRITER_API_MODEL_SELECT_OPTIONS[provider]
    .map((option) => {
      const isSelected = option.value === selected ? " selected" : "";
      return `<option value="${escapeHtml(option.value)}"${isSelected}>${escapeHtml(option.label)}</option>`;
    })
    .join("");
  const legacyOption =
    selected !== WRITER_API_MODEL_AUTO && !knownValues.has(selected)
      ? `<option value="${escapeHtml(selected)}" selected>${escapeHtml(selected)} (saved)</option>`
      : "";

  return `<label class="field">
          <span class="field-label">${escapeHtml(label)}</span>
          <select class="input mono" name="${escapeHtml(fieldName)}">${optionsHtml}${legacyOption}</select>
        </label>`;
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
        ${buildApiKeyField(input.secrets, "anthropic", "anthropicApiKey", "Anthropic", "sk-ant-…")}
        ${buildModelSelectField(input.secrets, "anthropic", "anthropicModel", "Anthropic model")}
        ${buildApiKeyField(input.secrets, "openai", "openaiApiKey", "OpenAI", "sk-…")}
        ${buildModelSelectField(input.secrets, "openai", "openaiModel", "OpenAI model")}
        ${buildApiKeyField(input.secrets, "google", "googleApiKey", "Google", "AI…")}
        ${buildModelSelectField(input.secrets, "google", "googleModel", "Gemini model")}
        <div class="actions">
          <button class="btn btn-primary" type="submit">Save</button>
        </div>
      </form>
    </section>`;
};

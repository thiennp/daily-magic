import { AWC_PROJECT_INVITE_ADD_ASSISTANT_COPY as C } from "@/features/projects/access/invites/awcProjectInviteAddAssistantCopy.constant";
import { AWC_PROJECT_INVITE_TYPE_OPTIONS } from "@/features/projects/access/invites/awcProjectInviteAddAssistantTypes";

export type AwcSupportedAssistant = {
  readonly id: string;
  readonly label: string;
  readonly hint: string;
};

const HINTS: Readonly<Record<string, string>> = {
  "grok-bot": "Grok routine with a wake link",
  muse: "Muse assistant",
  claude: "Claude Code or Claude chat",
  chatgpt: "ChatGPT chat or custom GPT",
  cursor: "Cursor agent or CLI",
  codex: "OpenAI Codex CLI",
  gemini: "Gemini CLI or chat",
  copilot: "GitHub or Microsoft Copilot",
  mistral: "Mistral Le Chat or API",
  openclaw: "OpenClaw agent",
  "n8n-zapier": "Automation workflows",
  messengers: "Slack, Telegram and similar",
  "custom-https": "Any service that can call a webhook",
  other: "Anything else; general steps",
};

/** "Any supported assistant" (id "") first, then every types[] entry. */
export const AWC_SUPPORTED_ASSISTANTS: readonly AwcSupportedAssistant[] = [
  { id: "", label: C.typeAny, hint: C.typeAnyHint },
  ...AWC_PROJECT_INVITE_TYPE_OPTIONS.map((o) => ({
    ...o,
    hint: HINTS[o.id] ?? "",
  })),
];

export const filterSupportedAssistants = (
  query: string,
): readonly AwcSupportedAssistant[] => {
  const q = query.trim().toLowerCase();
  return q === ""
    ? AWC_SUPPORTED_ASSISTANTS
    : AWC_SUPPORTED_ASSISTANTS.filter((a) =>
        `${a.label} ${a.hint}`.toLowerCase().includes(q),
      );
};

export const findSupportedAssistant = (id: string): AwcSupportedAssistant =>
  AWC_SUPPORTED_ASSISTANTS.find((a) => a.id === id) ??
  AWC_SUPPORTED_ASSISTANTS[0];

export const assistantInitials = (label: string): string =>
  label
    .replace(/[^A-Za-z0-9 ]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("") || "AI";

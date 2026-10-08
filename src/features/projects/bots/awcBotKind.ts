export type AwcBotKind =
  | "claude"
  | "openai"
  | "codex"
  | "cursor"
  | "antigravity"
  | "gemini"
  | "copilot"
  | "mistral"
  | "grok"
  | "openclaw"
  | "zapier"
  | "muse"
  | "messengers"
  | "webhook"
  | "generic";

/** First match wins, so "cursor-cloud" and "claude-cli" resolve by their prefix word. */
const KIND_MATCHERS: readonly (readonly [AwcBotKind, RegExp])[] = [
  ["claude", /claude/],
  ["codex", /codex/],
  ["openai", /chatgpt|openai|gpt/],
  ["cursor", /cursor/],
  ["antigravity", /antigravity/],
  ["gemini", /gemini/],
  ["copilot", /copilot/],
  ["mistral", /mistral/],
  ["grok", /grok/],
  ["openclaw", /openclaw/],
  ["zapier", /n8n|zapier/],
  ["muse", /muse/],
  ["messengers", /messenger|slack|telegram/],
  ["webhook", /https|webhook/],
];

/** Which brand mark fits a bot or coding tool, from its type id, writer agent id or display name. */
export const resolveAwcBotKind = (hint: string): AwcBotKind => {
  const text = hint.toLowerCase();
  return (
    KIND_MATCHERS.find(([, pattern]) => pattern.test(text))?.[0] ?? "generic"
  );
};

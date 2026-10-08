import { describe, expect, it } from "vitest";

import { resolveAwcBotKind } from "@/features/projects/bots/awcBotKind";

describe("resolveAwcBotKind", () => {
  it.each([
    ["claude-cli", "claude"],
    ["chatgpt", "openai"],
    ["codex", "codex"],
    ["cursor-cloud", "cursor"],
    ["antigravity", "antigravity"],
    ["grok-bot", "grok"],
    ["n8n-zapier", "zapier"],
    ["custom-https", "webhook"],
    ["Slack, Telegram", "messengers"],
    ["My Gemini helper", "gemini"],
    ["other", "generic"],
    ["", "generic"],
  ])("%s -> %s", (hint, kind) => {
    expect(resolveAwcBotKind(hint)).toBe(kind);
  });
});

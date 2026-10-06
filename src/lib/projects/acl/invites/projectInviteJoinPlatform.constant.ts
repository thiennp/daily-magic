/**
 * Server allowlist for the joining assistant's own type at redeem
 * (redeem_project_invite `joinType`, ids from GET /join types[]). Stored on
 * project_access_requests.join_platform as the platform the Wake S5 resolver
 * reads. Grok Bot maps to "grok" (wake by default); every other type is a
 * named non-wake platform, so a linkless seat starts in poll. Unknown → null
 * (the invite's own platform applies). Keep in sync with joinTypes/ ids.
 */
const JOIN_TYPE_TO_PLATFORM: ReadonlyMap<string, string> = new Map(
  Object.entries({
    "grok-bot": "grok",
    grok: "grok",
    muse: "muse",
    claude: "claude",
    chatgpt: "chatgpt",
    cursor: "cursor",
    codex: "codex",
    gemini: "gemini",
    copilot: "copilot",
    copilot_studio: "copilot_studio",
    "copilot-studio": "copilot_studio",
    mistral: "mistral",
    openclaw: "openclaw",
    "n8n-zapier": "n8n_zapier",
    messengers: "messengers",
    "custom-https": "custom_https",
    other: "other",
  }),
);

export const PROJECT_INVITE_JOIN_TYPE_IDS: readonly string[] = [
  ...JOIN_TYPE_TO_PLATFORM.keys(),
];

export const parseProjectInviteJoinPlatform = (
  value: unknown,
): string | null => {
  const key = typeof value === "string" ? value.trim().toLowerCase() : "";
  return JOIN_TYPE_TO_PLATFORM.get(key) ?? null;
};

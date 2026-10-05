/** tested = verified end to end; hmac = supported via HMAC webhook only. */
export type AwcBotToBotSupportLevel = "tested" | "hmac";

export type AwcBotToBotSupportRow = {
  readonly level: AwcBotToBotSupportLevel;
  readonly label: string;
};

export const AWC_BOT_TO_BOT_SUPPORT_HEADING = "Bot-to-bot works with";

/** Product-reusable list. Exact wording; no other product names. */
export const AWC_BOT_TO_BOT_SUPPORT_ROWS: readonly AwcBotToBotSupportRow[] = [
  {
    level: "tested",
    label: "Grok Bot — tested end to end via routine webhook",
  },
  {
    level: "hmac",
    label:
      "Any agent that can call the agent-access API and receive an HMAC-signed webhook (for example Muse) — supported via HMAC webhook, not yet tested end to end",
  },
];

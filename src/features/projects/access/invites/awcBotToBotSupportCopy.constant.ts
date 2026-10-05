/** routine = Grok routine webhook (automated tests); hmac = HMAC webhook, not yet tested end to end. */
export type AwcBotToBotSupportLevel = "routine" | "hmac";

export type AwcBotToBotSupportRow = {
  readonly level: AwcBotToBotSupportLevel;
  readonly label: string;
};

export const AWC_BOT_TO_BOT_SUPPORT_HEADING = "Bot-to-bot works with";

/** Product-reusable list. Exact wording; no other product names. */
export const AWC_BOT_TO_BOT_SUPPORT_ROWS: readonly AwcBotToBotSupportRow[] = [
  {
    level: "routine",
    label:
      "Grok Bot — supported via routine webhook; covered by automated tests",
  },
  {
    level: "hmac",
    label:
      "Any agent that can call the agent-access API and receive an HMAC-signed webhook (for example Muse) — supported via HMAC webhook, not yet tested end to end",
  },
];

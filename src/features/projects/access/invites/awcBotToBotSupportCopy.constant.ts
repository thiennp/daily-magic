/** routine = Grok Bot wake link (works out of the box). */
export type AwcBotToBotSupportLevel = "routine";

export type AwcBotToBotSupportRow = {
  readonly level: AwcBotToBotSupportLevel;
  readonly label: string;
};

export const AWC_BOT_TO_BOT_SUPPORT_HEADING = "Bot-to-bot works with";

/** Product-reusable list. Exact wording; no other product names. */
export const AWC_BOT_TO_BOT_SUPPORT_ROWS: readonly AwcBotToBotSupportRow[] = [
  {
    level: "routine",
    label: "Grok Bot: works out of the box",
  },
];

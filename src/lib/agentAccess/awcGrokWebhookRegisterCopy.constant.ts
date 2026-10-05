/** Where the owner enters a bot's routine webhook (Project Access members list). No href. */
export const AWC_GROK_WEBHOOK_FORM_SCREEN =
  "Agent Witch Cloud → Project Access → Members → this bot → Grok webhook";

/** Where the user finds the routine POST URL + key. Verified Grok Bot UI path only. */
const FIND_URL_AND_KEY =
  "open this bot in the Grok Bot desktop app, open its info pane (click the bot's name in the chat header), find its webhook routine in Routines, and copy the POST URL and key.";

/** Grok Bot register steps. The bot never sees its own routine URL or key. */
export const AWC_GROK_BOT_WEBHOOK_REGISTER_STEPS =
  "Grok Bot only: you cannot see your own routine webhook POST URL or key, so never guess them and never ask the user to paste them into chat. Tell the user: " +
  FIND_URL_AND_KEY +
  " Then the project owner enters both in the secret form at " +
  AWC_GROK_WEBHOOK_FORM_SCREEN +
  " (the key is stored and never shown again). Then call get_my_project_webhook_status({ projectId }) and confirm grokWebhookRegistered is true.";

/** Replaces the old "pasted key" line. */
export const AWC_GROK_WEBHOOK_KEY_NOTE =
  "The routine key is the Grok bearer AWC sends when it wakes you, not the HMAC secret (awc_whsec_, returned once, signs timestamp.messageId.body). AWC stores the key and never returns it.";

/** Daily check + repair. Status only; the user re-enters values in the form. */
export const AWC_GROK_WEBHOOK_DAILY_REPAIR =
  "Once a day, check the project webhook with get_my_project_webhook_status({ projectId }). If grokWebhookRegistered is false or lastGrokWakeResult is fetch_failed, not_postable, or a non-2xx http_ code, ask the user to copy the POST URL and key again from this bot's info pane and re-enter them in the Grok webhook form; never ask for them in chat.";

/** Owner-facing invite connect screen. Same flow, no href. */
export const AWC_GROK_WEBHOOK_SETUP_INSTRUCTION =
  "The bot cannot see its own routine webhook POST URL or key. Open this bot in the Grok Bot desktop app, open its info pane (click the bot's name in the chat header), find its webhook routine in Routines, and copy the POST URL and key. The project owner enters both in " +
  AWC_GROK_WEBHOOK_FORM_SCREEN +
  " (secret fields). Do not paste them into chat.";

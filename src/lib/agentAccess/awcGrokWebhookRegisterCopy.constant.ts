/** Where the owner enters a bot's routine webhook (Project Access → People → Members list). No href. */
export const AWC_GROK_WEBHOOK_FORM_SCREEN =
  "Agent Witch Cloud → Project Access → People → Members → <bot> → Grok webhook";

/** Where the user finds the routine POST URL + key. Verified Grok Bot UI path only. */
const FIND_URL_AND_KEY =
  "open this bot in the Grok Bot desktop app, open its info pane (click the bot's name in the chat header), find its webhook routine in Routines, and copy the POST URL and key.";

/** Owner-only entry (there is no member form), for bot-facing copy. */
export const AWC_GROK_WEBHOOK_OWNER_ENTRY =
  "The project owner enters both in the Grok webhook form at " +
  AWC_GROK_WEBHOOK_FORM_SCREEN +
  " (the key is stored and never shown again). If you are not the owner, give the URL and key to the owner outside chat. Never paste the key into a project message.";

/** get_my_project_webhook_status forbidden: guardProjectApiKeyToolUse's awc_proj_ rejection vs inactive membership. */
export const AWC_GROK_WEBHOOK_STATUS_FORBIDDEN =
  "If forbidden says 'Project API key cannot call this tool', retry with your agent-access Bearer. Any other forbidden means your membership is not active: re-check get_my_project_access.";

/** get_my_project_webhook_status auth: not on the awc_proj_ allowlist. */
export const AWC_GROK_WEBHOOK_STATUS_AUTH =
  "agent-access Bearer only; awc_proj_ keys are rejected for this tool";

/** Grok Bot register steps. The bot never sees its own routine URL or key. */
export const AWC_GROK_BOT_WEBHOOK_REGISTER_STEPS =
  "Grok Bot only: you cannot see your own routine webhook POST URL or key, so never guess them and never ask the user to paste them into chat. Tell the user: " +
  FIND_URL_AND_KEY +
  " " +
  AWC_GROK_WEBHOOK_OWNER_ENTRY +
  " Then call get_my_project_webhook_status({ projectId }) (" +
  AWC_GROK_WEBHOOK_STATUS_AUTH +
  ") and confirm grokWebhookRegistered is true.";

/** Replaces the old "pasted key" line. */
export const AWC_GROK_WEBHOOK_KEY_NOTE =
  "The routine key is the Grok bearer AWC sends when it wakes you, not the HMAC secret (awc_whsec_, returned once, signs timestamp.messageId.body). AWC stores the key and never returns it.";

/** Daily check + repair. Status only; the owner re-enters values in the form. */
export const AWC_GROK_WEBHOOK_DAILY_REPAIR =
  "Once a day, check the project webhook with get_my_project_webhook_status({ projectId }) (" +
  AWC_GROK_WEBHOOK_STATUS_AUTH +
  "). If it returns forbidden, your membership is not active: re-check get_my_project_access. Re-enter the POST URL and key only if grokWebhookRegistered is false or lastGrokWakeResult is http_401, http_403, http_404, not_postable, or fetch_failed on repeated checks; a single fetch_failed can just be the 3s wake timeout. To re-enter, the user copies them again from this bot's info pane and the project owner enters them in the Grok webhook form; never ask for them in chat.";

/** Owner-facing invite connect screen. Same flow, no href. */
export const AWC_GROK_WEBHOOK_SETUP_INSTRUCTION =
  "The bot cannot see its own routine webhook POST URL or key. Open this bot in the Grok Bot desktop app, open its info pane (click the bot's name in the chat header), find its webhook routine in Routines, and copy the POST URL and key. The project owner enters both in the Grok webhook form at " +
  AWC_GROK_WEBHOOK_FORM_SCREEN +
  " (secret fields). If you are not the owner, give the URL and key to the owner outside chat. Do not paste them into chat, and never paste the key into a project message.";

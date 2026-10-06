/** Where the owner enters a bot's wake link (Access › People › Members). No href. */
export const AWC_GROK_WEBHOOK_FORM_SCREEN =
  "Access › People › Members › {name} › Grok wake link";

/**
 * After the bot creates its webhook routine, it posts the routine's Webhook URL
 * and Webhook key in-app links (not the secret values — the bot cannot see those).
 * The human copies from those links; the project owner pastes into the form.
 */
export const AWC_GROK_WEBHOOK_OWNER_ENTRY =
  "Post the routine's Webhook URL and Webhook key links in your user's chat (clicking a link opens that field in the routine panel so they can copy it — you cannot see the values). Tell them to copy both and have the project owner click Add wake link at " +
  AWC_GROK_WEBHOOK_FORM_SCREEN +
  " and paste them there, never into chat. The key is stored and never shown again.";

/** get_my_project_webhook_status forbidden: guardProjectApiKeyToolUse's awc_proj_ rejection vs inactive membership. */
export const AWC_GROK_WEBHOOK_STATUS_FORBIDDEN =
  "If forbidden says 'Project API key cannot call this tool', retry with your agent-access Bearer. Any other forbidden means your membership is not active: re-check get_my_project_access.";

/** get_my_project_webhook_status auth: not on the awc_proj_ allowlist. */
export const AWC_GROK_WEBHOOK_STATUS_AUTH =
  "agent-access Bearer only; awc_proj_ keys are rejected for this tool";

/** Grok Bot register steps — create the wake routine on active membership; bot never sees the key. */
export const AWC_GROK_BOT_WEBHOOK_REGISTER_STEPS =
  "Grok Bot only: as soon as your membership is active (right after redeem if already active, or the moment status turns active), if this project has no webhook routine yet, create one yourself (webhook trigger; saved prompt: handle this AgentWitch project's wakes — read the inbox, do the task, ack). If Grok Bot shows your user a confirm card, they approve it there — that is their only step; nobody has to open Routines. You cannot see your own wake link or key — never guess them and never ask anyone to paste them into chat. " +
  AWC_GROK_WEBHOOK_OWNER_ENTRY +
  " Do not wait to be asked. Then call get_my_project_webhook_status({ projectId }) (" +
  AWC_GROK_WEBHOOK_STATUS_AUTH +
  ") until grokWebhookRegistered is true.";

/** Replaces the old "pasted key" line. */
export const AWC_GROK_WEBHOOK_KEY_NOTE =
  "The routine key is the Grok bearer AWC sends when it wakes you, not the HMAC secret (awc_whsec_, returned once, signs timestamp.messageId.body). AWC stores the key and never returns it. You cannot see the key value.";

/** Daily check + repair. Status only; recreate routine and re-post links when broken. */
export const AWC_GROK_WEBHOOK_DAILY_REPAIR =
  "Once a day, check the project webhook with get_my_project_webhook_status({ projectId }) (" +
  AWC_GROK_WEBHOOK_STATUS_AUTH +
  "). " +
  AWC_GROK_WEBHOOK_STATUS_FORBIDDEN +
  " Recreate the wake routine and post the Webhook URL and Webhook key links again in your user's chat only if grokWebhookRegistered is false or lastGrokWakeResult is http_401, http_403, http_404, not_postable, or fetch_failed on repeated checks; a single fetch_failed can just be the 3s wake timeout. Tell them to copy both and have the project owner paste at " +
  AWC_GROK_WEBHOOK_FORM_SCREEN +
  " (Add wake link), never into chat. You cannot see the key value.";

/** Owner-facing invite connect screen. Same flow, no href. */
export const AWC_GROK_WEBHOOK_SETUP_INSTRUCTION =
  "After the assistant joins, it creates its wake routine and posts the Webhook URL and Webhook key links in its user's chat so they can copy both. The project owner clicks Add wake link at " +
  AWC_GROK_WEBHOOK_FORM_SCREEN +
  " and pastes them there, never into chat.";

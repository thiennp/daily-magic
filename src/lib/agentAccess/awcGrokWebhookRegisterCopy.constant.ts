/** Grok Bot register steps. No panel href — use the link already in routine status. */
export const AWC_GROK_BOT_WEBHOOK_REGISTER_STEPS =
  "Grok Bot only: show the user two inputs, POST URL and key. Tell the user they must open this bot on desktop (the Grok Bot desktop app). Show the link to this bot's own Grok routine webhook panel — the link already in your routine status. The user opens that link, copies the POST URL and the key, and pastes them into those two inputs. Then call register_project_webhook({ projectId, grokWebhookUrl, grokWebhookBearer }) with both.";

/** Owner-facing invite connect screen. Same flow, no panel href. */
export const AWC_GROK_WEBHOOK_SETUP_INSTRUCTION =
  'Open this bot on desktop (the Grok Bot desktop app). The bot shows two inputs, POST URL and key, and the Grok routine webhook panel link already in its routine status. Copy the POST URL and the key from that panel into the two inputs. The bot registers them.';

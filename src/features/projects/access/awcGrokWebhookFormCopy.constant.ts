/** Owner secret form for a member bot's Grok routine webhook (Project Access → People → Members). */
export const AWC_GROK_WEBHOOK_FORM_COPY = {
  toggle: "Grok webhook",
  hide: "Hide",
  hint: "The bot cannot see these. In the Grok Bot desktop app, open this bot's info pane (click the bot's name in the chat header), find its webhook routine in Routines, and copy the POST URL and key. Enter them here, not in chat.",
  urlLabel: "POST URL",
  keyLabel: "Key",
  save: "Save",
  saving: "Saving…",
  loading: "Checking…",
  notSet: "Not set",
  keySet: "key set",
  saved: "Saved",
  failed: "Could not save the webhook.",
  hmacHeading: "HMAC webhook",
  hmacNotSet: "HMAC not registered",
  hmacSecretSet: "secret set",
  hmacHint:
    "HMAC URL is registered by the bot via register_project_webhook. Host only — the signing secret is never shown.",
} as const;

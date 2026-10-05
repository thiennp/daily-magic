/** Owner secret form for a member bot's Grok routine webhook (Project Access → People → Members). */
export const AWC_GROK_WEBHOOK_FORM_COPY = {
  toggle: "Grok webhook",
  hide: "Hide",
  hint: "The bot cannot see these. In the Grok Bot desktop app, open this bot's info pane (click the bot's name in the chat header), find its wake link in Routines, and copy the wake link and key. Enter them here, not in chat.",
  urlLabel: "Wake link",
  keyLabel: "Key",
  save: "Save",
  saving: "Saving…",
  loading: "Checking…",
  notSet: "Not set",
  keySet: "key set",
  saved: "Saved",
  failed: "Could not save the wake link.",
  hmacHeading: "Other wake link",
  hmacNotSet: "Not registered",
  hmacSecretSet: "secret set",
  hmacHint:
    "Other wake links are registered by the bot. Host only — the signing secret is never shown.",
} as const;

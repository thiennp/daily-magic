/** P1-S1b one-box wake connect (Members rail, `#wake-link-<id>`). `{name}` = nickname. */
export const AWC_WAKE_CONNECT_PASTE_COPY = {
  title: "Connect wake link",
  help: "In Grok Bot, open {name}'s routine, copy the wake link and its key, and paste both here. Only you can see them.",
  label: "Wake link and key",
  placeholder: "https://… and the key, on one line or two",
  save: "Connect",
  saving: "Connecting…",
  saved: "Connected. Checking {name} now.",
  badLink: "That link doesn't look right. Copy the wake link again from Grok Bot.",
  missingKey: "The key is missing. Paste the wake link and its key together.",
} as const;

/** P1-S1b one-box wake connect (Members rail, `#wake-link-<id>`). `{name}` = nickname. */
export const AWC_WAKE_CONNECT_PASTE_COPY = {
  title: "Connect wake link",
  help: "In Grok Bot, {name} posted two links: wake link and key. Copy each one and paste both here, one after the other.",
  label: "Wake link and key",
  placeholder: "Paste the wake link, then the key",
  save: "Connect",
  saving: "Connecting…",
  saved: "Connected. Checking {name} now.",
  badLink: "That link doesn't look right. Copy the wake link again from Grok Bot.",
  missingKey: "The key is missing. Paste the wake link and its key together.",
  /** DF-036 detection chips (EN PASS S5: a rejected address reads "check it"). */
  chipLinkOk: "Wake link ✓ {site}",
  chipLinkCheck: "Wake link — check it",
  chipLinkMissing: "Wake link — not pasted yet",
  chipKeyOk: "Key ✓ hidden",
  chipKeyMissing: "Key — not pasted yet",
} as const;

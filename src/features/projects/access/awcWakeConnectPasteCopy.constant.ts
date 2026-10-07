/** P1-S1b one-box wake connect (Members rail, `#wake-link-<id>`). `{name}` = nickname. */
export const AWC_WAKE_CONNECT_PASTE_COPY = {
  title: "Connect wake link",
  help: "In Grok Bot, {name} posted two links: wake link and key. Copy each one and paste both here, one after the other.",
  label: "Wake link and key",
  placeholder: "Paste the wake link, then the key",
  save: "Connect",
  saving: "Connecting…",
  /** DF-036 F9: success shows the status line. */
  saved: "Registered ✓ · No wakes yet",
  /** DF-036 F9: the brief's inline errors (bad = --bad text; need_* = muted guidance). */
  badLink: "That doesn't look like a wake link. Copy it again from Grok Bot.",
  needKey: "Now paste the key too. It's the second link {name} posted.",
  needLink: "Paste the wake link too. It starts with https://",
  httpsOnly: "The wake link must start with https://",
  twoLinks: "That's two web addresses. Paste one wake link and one key.",
  keyTooLong: "That key is too long. Copy it again from Grok Bot.",
  needNickname: "Give {name} a nickname first, then connect the wake link.",
  /** DF-036 detection chips (EN PASS S5: a rejected address reads "check it"). */
  chipLinkOk: "Wake link ✓ {site}",
  chipLinkCheck: "Wake link — check it",
  chipLinkMissing: "Wake link — not pasted yet",
  chipKeyOk: "Key ✓ hidden",
  chipKeyMissing: "Key — not pasted yet",
} as const;

/** P1-S1b wake connect (Members rail + pending join card): two fields. `{name}` = nickname. */
export const AWC_WAKE_CONNECT_PASTE_COPY = {
  title: "Connect wake link",
  help: "In Grok Bot, {name} posted two links: wake link and key. Copy each one into its own field.",
  urlLabel: "Wake link",
  urlPlaceholder: "https://…",
  urlTip:
    "The https address {name} posted in Grok Bot. It wakes {name} when there's work.",
  keyLabel: "Key",
  keyPlaceholder: "Paste the key",
  keyTip:
    "The second link {name} posted. It stays hidden and is never shown again.",
  showKey: "Show",
  hideKey: "Hide",
  save: "Connect",
  saving: "Connecting…",
  /** DF-036 F9: success shows the status line. */
  saved: "Registered ✓ · No wakes yet",
  /** Inline errors per field (bad = --bad text). */
  badLink: "That doesn't look like a wake link. Copy it again from Grok Bot.",
  httpsOnly: "The wake link must start with https://",
  twoLinks: "That's more than one address. Paste only the wake link here.",
  keyTooLong: "That key is too long. Copy it again from Grok Bot.",
  needNickname: "Give {name} a nickname first, then connect the wake link.",
  /** Status chips (site host shown once the link is valid). */
  chipLinkOk: "Wake link ✓ {site}",
  chipLinkCheck: "Wake link — check it",
  chipLinkMissing: "Wake link — not added yet",
  chipKeyOk: "Key ✓ hidden",
  chipKeyMissing: "Key — not added yet",
} as const;

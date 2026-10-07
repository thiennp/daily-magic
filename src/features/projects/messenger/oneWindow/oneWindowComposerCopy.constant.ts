/** One-window composer EN — COMPOSER-LOCK / HUMAN-UI-BUILD-PREP §2 (exact). */
export const ONE_WINDOW_COMPOSER_COPY = {
  pickerTitle: "Who should get this?",
  pickerEveryone: "Everyone in this project",
  pickerKeep: "Keep sending to this assistant",
  pickerKeepMany: "Keep sending to these assistants",
  pickerKeepEveryone: "Keep sending to everyone",
  chipEveryone: "To everyone",
  pickerSend: "Send",
  pickerCancel: "Cancel",
  chipLabel: "To {name}",
  chipLabelMany: "To {name} and {n} more",
  chipKeep: "Keep sending",
  keptRetry: "Not sent to {names} yet. Send again to retry.",
  keptGone:
    "{name} is no longer in this project. Pick who gets your next message.",
  placeholderEveryone:
    "Message this project. Type @ to pick who gets it.",
  /** Kept — Message {name}.… (everyone → name "everyone", COMPOSER-LOCK / EN-PASS soft). */
  placeholderKept: "Message {name}. Type @ to pick someone else.",
  placeholderSingle: "Message {name}.",
  /** P1-S4b @ composer (design hint row + mention picker). */
  hintKeys: "Enter to send · Shift+Enter for a new line",
  hintEachAt: "· Each @ assigns one task.",
  hintEachAtTip:
    "You can @ up to 5 assistants in one message. Each gets its own task.",
  atButton: "Pick who gets it (@)",
  mentionList: "Pick who gets it",
  mentionGroupAssistants: "Assistants",
  mentionNoMatch: "No match in this project",
  recipientSwitch: "Choose who sees this chat",
} as const;

export type OneWindowComposerCopy = typeof ONE_WINDOW_COMPOSER_COPY;

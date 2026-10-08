/** One-window composer EN — COMPOSER-LOCK / HUMAN-UI-BUILD-PREP §2 (exact). */
export const ONE_WINDOW_COMPOSER_COPY = {
  pickerTitle: "Who should get this?",
  pickerKeep: "Keep sending to this assistant",
  /** Recipient switch: the whole-project feed (view only; sends need one assistant). */
  feedWhole: "Whole project",
  chipEveryone: "Choose an assistant",
  pickerSend: "Send",
  pickerCancel: "Cancel",
  chipLabel: "To {name}",
  chipKeep: "Keep sending",
  keptRetry: "Not sent to {names} yet. Send again to retry.",
  keptGone:
    "{name} is no longer in this project. Pick who gets your next message.",
  placeholderEveryone: "Message this project. Type @ to pick who gets it.",
  /** Kept — Message {name}.… */
  placeholderKept: "Message {name}. Type @ to pick someone else.",
  placeholderSingle: "Message {name}.",
  /** P1-S4b @ composer (design hint row + mention picker). */
  hintKeys: "Enter to send · Shift+Enter for a new line",
  hintEachAt: "· One assistant per message.",
  hintEachAtTip: "One assistant per message — @ only one.",
  atButton: "Pick who gets it (@)",
  mentionList: "Pick who gets it",
  mentionGroupAssistants: "Assistants",
  mentionNoMatch: "No match in this project",
  recipientSwitch: "Choose who sees this chat",
} as const;

export type OneWindowComposerCopy = typeof ONE_WINDOW_COMPOSER_COPY;

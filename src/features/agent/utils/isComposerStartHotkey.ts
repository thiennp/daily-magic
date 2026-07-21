/**
 * Cmd+Enter (macOS) or Ctrl+Enter (Windows/Linux) to submit Send-a-task.
 */
export const isComposerStartHotkey = (
  event: Pick<
    KeyboardEvent,
    "key" | "metaKey" | "ctrlKey" | "altKey" | "shiftKey"
  >,
): boolean =>
  event.key === "Enter" &&
  (event.metaKey || event.ctrlKey) &&
  !event.altKey &&
  !event.shiftKey;

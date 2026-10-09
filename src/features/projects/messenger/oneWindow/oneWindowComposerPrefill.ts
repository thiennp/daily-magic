import { askAgainDraftText } from "@/features/projects/messenger/oneWindow/oneWindowAskAgain";

export const ONE_WINDOW_COMPOSER_PREFILL_EVENT = "awc:one-window-prefill";

/** Ask the mounted composer to fill its box (cards cannot reach the draft state). */
export const requestOneWindowComposerPrefill = (text: string): void => {
  window.dispatchEvent(
    new CustomEvent<string>(ONE_WINDOW_COMPOSER_PREFILL_EVENT, {
      detail: text,
    }),
  );
};

/** Card "Ask {name} again": fills the composer with an @mention to finish. */
export const askAssistantAgain = (name: string): void => {
  requestOneWindowComposerPrefill(askAgainDraftText(name));
};

/** Set a textarea value so React's onChange (and caret handling) run as for typing. */
export const writeTextareaValue = (
  textarea: HTMLTextAreaElement,
  value: string,
): void => {
  const setter = Object.getOwnPropertyDescriptor(
    HTMLTextAreaElement.prototype,
    "value",
  )?.set;
  setter?.call(textarea, value);
  textarea.dispatchEvent(new Event("input", { bubbles: true }));
  textarea.focus();
  textarea.setSelectionRange(value.length, value.length);
};

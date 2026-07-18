/** Enter sends; Shift+Enter inserts a newline. Ignores IME composition. */
export default function shouldSubmitContinueMessageOnKeyDown(input: {
  readonly key: string;
  readonly shiftKey: boolean;
  readonly isComposing?: boolean;
}): boolean {
  if (input.key !== "Enter" || input.shiftKey) {
    return false;
  }
  if (input.isComposing === true) {
    return false;
  }
  return true;
}

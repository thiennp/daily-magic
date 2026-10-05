/** Approximate tokens from UTF-16 length (chars/4). Shared tip/bot cap helper. */
export const estimateTokenCount = (text: string): number =>
  Math.ceil(text.length / 4);

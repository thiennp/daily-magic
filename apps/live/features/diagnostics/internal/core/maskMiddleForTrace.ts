export const DEFAULT_TRACE_MASK_HEAD = 4;
export const DEFAULT_TRACE_MASK_TAIL = 4;

export const maskMiddleForTrace = (
  value: string,
  headLen: number = DEFAULT_TRACE_MASK_HEAD,
  tailLen: number = DEFAULT_TRACE_MASK_TAIL,
): string => {
  const n = value.length;
  if (n === 0) {
    return "***";
  }

  if (n <= headLen + tailLen) {
    return `${value.slice(0, headLen)}***`;
  }

  return `${value.slice(0, headLen)}***${value.slice(n - tailLen)}`;
};

/** Newest first; null (missing / unparseable) sorts after any real time. */
export default function compareNullableTimesDesc(
  left: number | null,
  right: number | null,
): number {
  if (left === right) {
    return 0;
  }

  if (left === null) {
    return 1;
  }

  if (right === null) {
    return -1;
  }

  return right - left;
}

/** Auth.js sometimes appends `/signin` to the error query (broken default error page). */
export default function normalizeAuthErrorCode(
  errorCode: string | null | undefined,
): string | null {
  if (errorCode === null || errorCode === undefined) {
    return null;
  }
  const trimmed = errorCode.trim();
  if (trimmed.length === 0) {
    return null;
  }
  const base = trimmed.split("/")[0]?.trim() ?? "";
  return base.length > 0 ? base : null;
}

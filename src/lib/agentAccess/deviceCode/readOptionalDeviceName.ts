/** Read an optional short name from a JSON body field. */
export const readOptionalDeviceName = (
  value: unknown,
  max: number,
): string | null | "invalid" => {
  if (value === undefined || value === null) {
    return null;
  }
  if (typeof value !== "string") {
    return "invalid";
  }
  const trimmed = value.trim();
  if (trimmed.length === 0) {
    return null;
  }
  if (trimmed.length > max) {
    return "invalid";
  }
  return trimmed;
};

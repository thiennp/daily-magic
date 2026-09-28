export const readOptionalPositiveSeconds = (value: unknown): number | null => {
  if (typeof value !== "number" || !Number.isInteger(value) || value < 1) {
    return null;
  }

  return value;
};

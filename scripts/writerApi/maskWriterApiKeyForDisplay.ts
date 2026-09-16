const MASK_FILL_LENGTH = 12;
const MASK_BULLET = "•";

export const maskWriterApiKeyForDisplay = (apiKey: string): string => {
  const trimmed = apiKey.trim();
  if (trimmed.length === 0) {
    return "";
  }
  if (trimmed.length <= 8) {
    return MASK_BULLET.repeat(Math.min(trimmed.length, MASK_FILL_LENGTH));
  }
  const head = trimmed.slice(0, 4);
  const tail = trimmed.slice(-4);
  return `${head}${MASK_BULLET.repeat(MASK_FILL_LENGTH)}${tail}`;
};

export const isUnchangedMaskedWriterApiKeyInput = (
  submittedApiKey: string,
  existingApiKey: string | undefined,
): boolean => {
  const submitted = submittedApiKey.trim();
  if (submitted.length === 0 || existingApiKey === undefined) {
    return false;
  }
  return submitted === maskWriterApiKeyForDisplay(existingApiKey);
};

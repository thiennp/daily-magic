const CLI_ERROR_REPLY =
  /API Error:? \d{3}|\b429\b|too many requests|rate[_ ]limit|spend limit|usage limit|monthly limit|quota|insufficient credit|overloaded|unauthorized|authentication required|not logged in|please run .+login|invalid api key/i;

const MAX_REPLY_LENGTH = 600;

/**
 * DF-035 (a): when the judge "reply" is really a CLI/API error (429 spend
 * limit, auth, overload), show it verbatim instead of the score-parse error.
 * Null when the reply looks like ordinary (unparseable) judge prose.
 */
export const describePromptSdlcJudgeReplyFailure = (
  raw: string,
): string | null => {
  const trimmed = raw.trim();
  if (
    trimmed.length === 0 ||
    trimmed.length > MAX_REPLY_LENGTH ||
    !CLI_ERROR_REPLY.test(trimmed)
  ) {
    return null;
  }
  return `The judge CLI returned an error: ${trimmed}`;
};

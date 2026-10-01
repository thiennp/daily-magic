/** Plain-language cause when raw judge output is CLI noise, not a score JSON. */
export const describeUnusableJudgeReplyCause = (
  rawReply: string,
): string | null => {
  const trimmed = rawReply.trim();
  if (trimmed.length === 0) {
    return null;
  }

  if (trimmed.includes("Ignoring malformed agent role definition:")) {
    const messageMatch = trimmed.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);
    const message =
      messageMatch === null
        ? trimmed
        : messageMatch[1].replaceAll("\\n", "\n").replaceAll('\\"', '"');
    return `Codex did not run the judge prompt — it failed while loading project agent config (${message}). Fix or remove the broken entry under .codex/ in your working folder (or ~/.codex), then retry.`;
  }

  if (
    trimmed.includes('"type":"error"') ||
    trimmed.includes('"type": "error"')
  ) {
    const messageMatch = trimmed.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);
    if (messageMatch !== null) {
      const message = messageMatch[1]
        .replaceAll("\\n", "\n")
        .replaceAll('\\"', '"');
      if (
        message.includes(
          "not supported when using Codex with a ChatGPT account",
        )
      ) {
        return `Codex could not run the judge — your default model in ~/.codex/config.toml is not available on a ChatGPT login (for example gpt-6.1-sol). Set model = "gpt-5.5" in that file, or run codex with -m gpt-5.5, then retry Step 2. API error: ${message}`;
      }
      return `The judge CLI returned an error instead of a score: ${message}`;
    }
    return "The judge CLI returned an error event instead of a score JSON object.";
  }

  if (trimmed.startsWith("{") && !trimmed.includes('"score"')) {
    return "The judge reply was not score JSON (expected an object with score and reasons).";
  }

  return null;
};

/**
 * Keep the existing reply convention ("<messageId>: <result>"): the parent id
 * rides in the summary because refs cannot carry it. Not added twice.
 * The 200-char limit is enforced afterwards by project_dispatch parsing.
 */
export const composeProjectMessengerReplySummary = (input: {
  readonly summary: string;
  readonly inReplyTo: string | null;
}): string => {
  if (
    input.inReplyTo === null ||
    input.summary.toLowerCase().includes(input.inReplyTo)
  ) {
    return input.summary;
  }
  return `${input.inReplyTo}: ${input.summary}`;
};

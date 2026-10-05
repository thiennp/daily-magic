/** Mac writer prep failed before the CLI session produced real work. */
export const isAgentRunWriterPrepareFailureInOutput = (
  output: string,
): boolean => /failed to prepare\s+[\w-]+:/i.test(output);

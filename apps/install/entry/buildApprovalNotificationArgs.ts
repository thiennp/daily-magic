const clean = (value: string, max: number): string =>
  // eslint-disable-next-line no-control-regex
  value.replace(/[\u0000-\u001f\u007f]/g, " ").slice(0, max);

/**
 * osascript arguments for the "approval required" banner. The prompt and the requester come from
 * another person, so they travel as argv items and are never part of the AppleScript source.
 */
export const buildApprovalNotificationArgs = (input: {
  readonly promptPreview: string;
  readonly requesterEmail: string;
}): readonly string[] => [
  "-e",
  "on run argv",
  "-e",
  'display notification (item 1 of argv) with title "Agent dispatch approval" subtitle (item 2 of argv)',
  "-e",
  "end run",
  clean(input.promptPreview, 120),
  clean(input.requesterEmail, 200),
];

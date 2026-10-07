/**
 * P1-S1b assistant wake health (Product map, CLAUDE-BRIEF "Wake failure reason
 * copy", 00:05 CEST Oct 8). Raw `lastFailureReason` is never shown.
 */
export const ASSISTANT_WAKE_HEALTH_COPY = {
  failedLine: "Last wake failed {time}: {reason}",
  okLine: "Registered ✓ · Last wake {ago}",
  noWakes: "Registered ✓ · No wakes yet",
  pasteNew: "Paste a new wake link",
  busy: "Grok Bot was busy. Try again in a few minutes.",
  serverError: "Grok Bot had a problem on its side.",
  keyRejected: "Grok Bot didn't accept the key.",
  unreachable: "Couldn't reach Grok Bot.",
  notPostable: "This wake link doesn't work anymore.",
  other: "Something went wrong.",
  justNow: "just now",
  minutesAgo: "{n} min ago",
  hoursAgo: "{n} h ago",
  daysAgo: "{n} d ago",
} as const;

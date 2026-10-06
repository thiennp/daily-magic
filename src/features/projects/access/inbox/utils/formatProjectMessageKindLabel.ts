const PROJECT_MESSAGE_KIND_LABELS: Readonly<Record<string, string>> = {
  "task.assign": "Task assigned",
  "task.received": "Received",
  "task.processing": "Started",
  "task.status": "Status update",
  "task.done": "Done",
  "task.blocked": "Blocked",
  "task.ping": "Ping",
  "peer.joined": "Joined",
  "peer.left": "Left",
  "peer.renamed": "Renamed",
  "peer.silent": "Went quiet",
  "peer.silent_blocked": "Went quiet (blocked)",
  "composer.recipient_sticky_cleared": "Recipient sticky cleared",
};

/** Plain-English label for a project message kind; falls back to the raw kind. */
const formatProjectMessageKindLabel = (kind: string): string =>
  PROJECT_MESSAGE_KIND_LABELS[kind] ?? kind;

export default formatProjectMessageKindLabel;

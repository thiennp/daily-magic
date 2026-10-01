/** How multi-bot co-work shares work after AWC membership grant. */
export const PEER_SYNC_ON_OFF_MATRIX = [
  {
    situation: "Same machine, both on",
    how: "Shared local folder (via folder refs) or SendToAgent on the same host.",
  },
  {
    situation: "Two machines, both on",
    how: "No shared disk — use git/PR, bot channel (OOB, not AWC content), or owner-chosen rsync/SSH. Allow-claim is ACL only.",
  },
  {
    situation: "One on, one off",
    how: "No AWC temp inbox. Durable channel: git commit/push or bot chat; offline bot catches up on wake after ACL check.",
  },
  {
    situation: "Both off",
    how: "No realtime; work lives in git / prior messages; on wake → check ACL → read git/chat.",
  },
  {
    situation: ">2 bots, mixed on/off",
    how: "Async: whoever is on writes the durable source (usually git); others catch up; AWC only answers membership.",
  },
] as const;

export const PEER_SYNC_RULES = [
  "Same machine → prefer local folder from folder refs.",
  "Cross-machine or offline → git (or bot chat) is the queue; AWC is not a content bus.",
  "Revoke → next ACL / allow-claim validation denies; locals stop sync.",
  "Never share agent-access tokens across teams.",
] as const;

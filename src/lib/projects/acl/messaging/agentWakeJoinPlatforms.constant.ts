/**
 * Join platforms (project_access_requests.join_platform, migration 093) that
 * are local CLI coding agents. A poll-mode seat whose approved join request
 * carries one of these is an "agent": woken through its terminal, not a webhook.
 */
export const AGENT_WAKE_JOIN_PLATFORMS: readonly string[] = [
  "claude",
  "codex",
  "cursor",
  "gemini",
];

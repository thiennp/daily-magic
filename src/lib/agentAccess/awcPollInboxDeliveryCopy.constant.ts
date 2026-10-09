/** Bot-facing inbox delivery when there is no Grok routine wake link (poll / Checks on demand). */
export const AWC_POLL_INBOX_DELIVERY_CLAUSE =
  "No Grok routine wake link (Cursor, Claude Code, Codex, Muse, …): stay on delivery_mode poll (Checks on demand). After Approve, poll list_project_inbox about every 60 seconds (host loop/scheduler, or at the start of each user turn if the host has no timer), handle each delivery, project_dispatch, then ack_project_message. Do not install cloudflared tunnel receivers or curl /install/agent-witch-local-wake.sh — that installer is deprecated.";

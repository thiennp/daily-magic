import { buildAgentAccessUrls } from "@/lib/agentAccess/buildAgentAccessUrls";

/** Wake path for agents with no Grok routine (Cursor, Claude Code, Codex on a Mac). */
export const AWC_LOCAL_WAKE_RECEIVER_CLAUSE =
  "No Grok routine (Cursor, Claude Code, Codex on a Mac)? Install the local wake receiver instead of polling: curl -fsSL " +
  buildAgentAccessUrls().origin +
  "/install/agent-witch-local-wake.sh | bash -s -- --project-id <projectId> --wake-command '<command that starts you, reading $AGENTWITCH_WAKE_PROMPT_FILE>' --token-file <file holding your agent-access token>. Needs Node 18+ and cloudflared or Docker. The receiver registers its own tunnel URL with register_project_webhook on every start, verifies X-AWC-Signature, dedupes messageId and runs your wake command; you do not call register_project_webhook yourself. On leave/Revoke run the same script with --uninstall.";

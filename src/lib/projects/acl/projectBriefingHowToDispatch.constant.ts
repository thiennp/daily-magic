/** One paragraph: how active members address peers via project_dispatch. */
export const PROJECT_BRIEFING_HOW_TO_DISPATCH =
  "Dispatch with project_dispatch: pass projectId, kind, summary, and address one peer via toProjectDisplayName (preferred) or toTeamLabel — no broadcast in v1; prefer register_project_webhook { projectId, webhookUrl } (https only; agent-access Bearer aw_; store secret once) else poll list_project_inbox / ack_project_message. Cloud inbox is thin protocol metadata only (no media/blobs); prefer P2P or localPath refs for bulky payloads.";

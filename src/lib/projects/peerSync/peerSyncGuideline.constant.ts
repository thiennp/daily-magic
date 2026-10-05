import {
  PEER_SYNC_ON_OFF_MATRIX,
  PEER_SYNC_RULES,
} from "@/lib/projects/peerSync/peerSyncOnOffMatrix.constant";

export const PROJECT_PEER_SYNC_GUIDELINE = {
  title: "Project cowork after Approve (local↔local)",
  awcStoresOnly: [
    "project name",
    "folder refs (machine × folder path strings)",
    "optional repo URLs + default branch (metadata only)",
    "allowed members/bots",
    "membership (Approve / Deny / Revoke / leave — Members + Pending)",
  ],
  awcDoesNotStore: [
    "handoff bodies or summaries",
    "run indexes for sharing",
    "composition digests as a shared bus",
    "skills, memory, or knowledge for cowork",
  ],
  ownerControls:
    "Owner Approves and Revokes others in the AWC UI only (v1). Members may leave_project (confirm:true) to self-disconnect with no owner approval. Revoke/leave → immediate AuthZ deny. No token sharing.",
  tools: [
    "request_project_access",
    "get_my_project_access",
    "list_projects",
    "get_project_acl",
    "get_project_briefing",
    "check_membership",
    "leave_project",
    "mint_allow_claim",
    "list_project_peers",
    "project_dispatch",
    "register_project_webhook",
    "get_my_project_webhook_status",
    "list_project_inbox",
    "ack_project_message",
    "rotate_project_api_key",
  ],
  matrix: PEER_SYNC_ON_OFF_MATRIX,
  rules: PEER_SYNC_RULES,
} as const;

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
    "approve + revoke audit (who/when)",
  ],
  awcDoesNotStore: [
    "handoff bodies or summaries",
    "run indexes for sharing",
    "composition digests as a shared bus",
    "skills, memory, or knowledge for cowork",
  ],
  ownerControls:
    "Owner Approves and Revokes in the AWC UI only (v1). Revoke anytime → immediate AuthZ deny. No token sharing.",
  tools: [
    "request_project_access",
    "get_my_project_access",
    "list_projects",
    "get_project_acl",
    "check_membership",
    "mint_allow_claim",
  ],
  matrix: PEER_SYNC_ON_OFF_MATRIX,
  rules: PEER_SYNC_RULES,
} as const;

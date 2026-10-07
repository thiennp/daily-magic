/** Error messages returned with code "forbidden" (MCP body + HTTP errorMessage). */
export const PROJECT_SKILL_ACL_MESSAGES = {
  ownerOnlyPublish:
    "Only the project owner can publish. To save a draft instead, pass asDraft: true with a body.",
  ownerOnlyRevoke: "Only the project owner can revoke.",
  viewerWrite: "Viewers can read published skills but cannot save or publish.",
} as const;

/** Error messages returned with code "forbidden" (MCP body + HTTP errorMessage). */
export const PROJECT_SKILL_ACL_MESSAGES = {
  ownerOnlyPublish:
    "Only the project owner or the skill's publisher can publish it. To save a draft instead, pass asDraft: true with a body.",
  ownerOnlyRevoke:
    "Only the project owner or the skill's publisher can revoke it. Members can delete drafts.",
  viewerWrite: "Viewers can read published skills but cannot save or publish.",
} as const;

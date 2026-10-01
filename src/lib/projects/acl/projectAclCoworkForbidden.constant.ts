/** Paths / table names that must never be used as multi-team cowork content bus. */
export const PROJECT_ACL_COWORK_FORBIDDEN_WRITE_KINDS = [
  "handoff",
  "handoff_envelope",
  "handoff_summary",
  "run_index_share",
  "composition_digest_share",
  "shared_skill_body",
  "shared_memory",
  "shared_knowledge_bus",
  "encrypted_cowork_blob",
] as const;

export type ProjectAclCoworkForbiddenWriteKind =
  (typeof PROJECT_ACL_COWORK_FORBIDDEN_WRITE_KINDS)[number];

export const isProjectAclCoworkForbiddenWriteKind = (
  value: string,
): value is ProjectAclCoworkForbiddenWriteKind =>
  (PROJECT_ACL_COWORK_FORBIDDEN_WRITE_KINDS as readonly string[]).includes(
    value,
  );

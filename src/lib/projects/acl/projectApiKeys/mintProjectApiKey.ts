import { randomUUID } from "node:crypto";

import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import {
  createProjectApiKeyPlaintext,
  hashProjectApiKey,
  projectApiKeyLast4,
} from "@/lib/projects/acl/projectApiKeys/hashProjectApiKey";
import { PROJECT_API_KEY_PREFIX } from "@/lib/projects/acl/projectApiKeys/projectApiKey.constants";
import type { ProjectAclScope } from "@/lib/projects/acl/projectAclScopes.constant";
import { writeProjectAccessAudit } from "@/lib/projects/acl/writeProjectAccessAudit";
import { asRowArray, getSql } from "@/lib/db";

export type MintProjectApiKeyResult = {
  readonly ok: true;
  readonly keyId: string;
  readonly plaintext: string;
  readonly prefix: string;
  readonly last4: string;
  readonly scopes: readonly ProjectAclScope[];
};

/** Hash at rest; plaintext returned once to caller (A2). */
export const mintProjectApiKey = async (input: {
  readonly projectId: string;
  readonly membershipId: string;
  readonly userId: string;
  readonly scopes: readonly ProjectAclScope[];
  readonly actorUserId: string;
  readonly auditAction?: "key.mint" | "key.rotate";
}): Promise<MintProjectApiKeyResult> => {
  await ensureProjectAclSchema();
  const sql = getSql();
  const plaintext = createProjectApiKeyPlaintext();
  const tokenHash = hashProjectApiKey(plaintext);
  const last4 = projectApiKeyLast4(plaintext);
  const keyId = randomUUID();
  const scopes = [...input.scopes];

  // Revoke prior live keys for this membership on mint/rotate.
  await sql`
    UPDATE project_api_keys
    SET revoked_at = NOW()
    WHERE membership_id = ${input.membershipId}
      AND revoked_at IS NULL
  `;

  const rows = asRowArray(
    await sql`
      INSERT INTO project_api_keys (
        id, project_id, membership_id, user_id, token_hash,
        token_prefix, token_last4, scopes
      )
      VALUES (
        ${keyId},
        ${input.projectId},
        ${input.membershipId},
        ${input.userId},
        ${tokenHash},
        ${PROJECT_API_KEY_PREFIX},
        ${last4},
        ${scopes}
      )
      RETURNING id
    `,
  );
  if (rows.length === 0) {
    throw new Error("Failed to mint project API key.");
  }
  await writeProjectAccessAudit({
    projectId: input.projectId,
    actorUserId: input.actorUserId,
    action: input.auditAction ?? "key.mint",
    targetUserId: input.userId,
    detail: {
      keyId,
      membershipId: input.membershipId,
      prefix: PROJECT_API_KEY_PREFIX,
      last4,
    },
  });
  return {
    ok: true,
    keyId,
    plaintext,
    prefix: PROJECT_API_KEY_PREFIX,
    last4,
    scopes: input.scopes,
  };
};

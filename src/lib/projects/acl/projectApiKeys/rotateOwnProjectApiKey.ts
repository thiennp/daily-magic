import { getActiveProjectMembership } from "@/lib/projects/acl/getActiveProjectMembership";
import { mintProjectApiKey } from "@/lib/projects/acl/projectApiKeys/mintProjectApiKey";

export type RotateOwnProjectApiKeyResult =
  | {
      readonly ok: true;
      readonly projectApiKey: string;
      readonly prefix: string;
      readonly last4: string;
      readonly scopes: readonly string[];
    }
  | { readonly ok: false; readonly code: "forbidden" | "naming_required" };

export const rotateOwnProjectApiKey = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
}): Promise<RotateOwnProjectApiKeyResult> => {
  const membership = await getActiveProjectMembership(
    input.projectId,
    input.actorUserId,
  );
  if (membership === null) {
    return { ok: false, code: "forbidden" };
  }
  if (!membership.projectDisplayName) {
    return { ok: false, code: "naming_required" };
  }
  const minted = await mintProjectApiKey({
    projectId: input.projectId,
    membershipId: membership.id,
    userId: membership.userId,
    scopes: membership.scopes,
    actorUserId: input.actorUserId,
    auditAction: "key.rotate",
  });
  return {
    ok: true,
    projectApiKey: minted.plaintext,
    prefix: minted.prefix,
    last4: minted.last4,
    scopes: [...minted.scopes],
  };
};

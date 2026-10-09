import { getSql } from "@/lib/db";
import { resolveBotManager } from "@/lib/projects/acl/resolveBotManager";

/** Block / unblock an assistant from other people's assistants, any time. */
export const setBotIsolation = async (input: {
  readonly projectId: string;
  readonly membershipId: string;
  readonly actorUserId: string;
  readonly isolated: boolean;
}): Promise<
  | { readonly ok: true; readonly isolated: boolean }
  | { readonly ok: false; readonly code: "not_found" | "forbidden" }
> => {
  const manager = await resolveBotManager(input);
  if (!manager.ok) return manager;
  await getSql()`
    UPDATE project_memberships
    SET isolated_from_other_bots = ${input.isolated}
    WHERE id = ${input.membershipId} AND project_id = ${input.projectId}
  `;
  return { ok: true, isolated: input.isolated };
};

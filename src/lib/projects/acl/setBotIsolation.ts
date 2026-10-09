import { getSql } from "@/lib/db";
import { resolveBotManager } from "@/lib/projects/acl/resolveBotManager";

export type BotRestrictions = {
  /** Blocked from other people's assistants. */
  readonly isolated?: boolean;
  /** Only its inviter (and their assistants, and the owner) may message it. */
  readonly closed?: boolean;
};

/** Change an assistant's restrictions any time; only the fields given change. */
export const setBotIsolation = async (
  input: {
    readonly projectId: string;
    readonly membershipId: string;
    readonly actorUserId: string;
  } & BotRestrictions,
): Promise<
  | { readonly ok: true }
  | { readonly ok: false; readonly code: "not_found" | "forbidden" }
> => {
  const manager = await resolveBotManager(input);
  if (!manager.ok) return manager;
  await getSql()`
    UPDATE project_memberships
    SET isolated_from_other_bots =
          COALESCE(${input.isolated ?? null}::boolean, isolated_from_other_bots),
        closed_to_others =
          COALESCE(${input.closed ?? null}::boolean, closed_to_others)
    WHERE id = ${input.membershipId} AND project_id = ${input.projectId}
  `;
  return { ok: true };
};

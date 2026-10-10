import { asRowArray, getSql } from "@/lib/db";

/** True when the seat that owns the task is an assistant (bot). */
export const loadProjectTaskOwnerIsBot = async (
  ownerMembershipId: string | null,
): Promise<boolean> => {
  if (ownerMembershipId === null) return false;
  const rows = asRowArray(
    await getSql()`
      SELECT member_kind FROM project_memberships WHERE id = ${ownerMembershipId}`,
  );
  return rows[0]?.member_kind === "bot";
};

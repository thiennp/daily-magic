import { getSql } from "@/lib/db";

/** Persist invite auto-approve label on the new membership (Access banner/badge). */
export const markMembershipAutoApprovedViaInvite = async (input: {
  readonly membershipId: string;
  readonly inviteLabel: string;
}): Promise<void> => {
  const sql = getSql();
  await sql`
    UPDATE project_memberships
    SET auto_approved_via_invite_label = ${input.inviteLabel}
    WHERE id = ${input.membershipId}
  `;
};

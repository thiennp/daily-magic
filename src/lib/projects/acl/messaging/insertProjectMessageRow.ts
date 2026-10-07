import { projectMessageChatKey } from "@/lib/projects/acl/messaging/projectMessageChatKey";
import { isProjectMessengerWholeAddress } from "@/lib/projects/acl/messaging/messenger/isProjectMessengerWholeAddress";
import { getSql } from "@/lib/db";

export const insertProjectMessageRow = async (input: {
  readonly messageId: string;
  readonly projectId: string;
  readonly senderMembershipId: string | null;
  readonly senderUserId: string;
  readonly toMembershipId: string | null;
  readonly toUserId: string | null;
  readonly toTeamLabel: string | null;
  readonly toProjectDisplayName: string | null;
  readonly kind: string;
  readonly summary: string;
  readonly refsJson: string;
}): Promise<{ readonly chatKey: string }> => {
  const chatKey = projectMessageChatKey({
    senderMembershipId: input.senderMembershipId,
    toMembershipId: input.toMembershipId,
    toUserId: input.toUserId,
    toTeamLabel: input.toTeamLabel,
    isWhole: isProjectMessengerWholeAddress({
      toMembershipId: input.toMembershipId,
      toUserId: input.toUserId,
      toTeamLabel: input.toTeamLabel,
    }),
  });
  const sql = getSql();
  await sql`
    INSERT INTO project_messages (
      id, project_id, sender_membership_id, sender_user_id,
      to_membership_id, to_user_id, to_team_label, to_project_display_name,
      kind, summary, refs, chat_key
    )
    VALUES (
      ${input.messageId},
      ${input.projectId},
      ${input.senderMembershipId},
      ${input.senderUserId},
      ${input.toMembershipId},
      ${input.toUserId},
      ${input.toTeamLabel},
      ${input.toProjectDisplayName},
      ${input.kind},
      ${input.summary},
      ${input.refsJson}::jsonb,
      ${chatKey}
    )
  `;
  return { chatKey };
};

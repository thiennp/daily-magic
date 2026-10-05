import { ensureClaimBotSchema } from "@/lib/agentAccess/claimBot/ensureClaimBotSchema";
import { asRowArray, getSql } from "@/lib/db";

export type OwnedBotMembershipView = {
  readonly membershipId: string;
  readonly projectId: string;
  readonly projectName: string;
  readonly projectDisplayName: string | null;
  readonly teamLabel: string | null;
  readonly grokWebhookRegistered: boolean;
};

export type OwnedBotView = {
  readonly tokenId: string;
  readonly botUserId: string;
  readonly displayName: string | null;
  readonly tokenPrefix: string;
  readonly claimedAt: string | null;
  readonly memberships: readonly OwnedBotMembershipView[];
};

/** Bots this human owns, plus their active project memberships (for webhook forms). */
export const listOwnedBots = async (input: {
  readonly ownerUserId: string;
}): Promise<readonly OwnedBotView[]> => {
  await ensureClaimBotSchema();
  const sql = getSql();
  const tokenRows = asRowArray(
    await sql`
      SELECT t.id AS token_id, t.user_id AS bot_user_id, t.token_prefix,
             t.created_at, u.name AS display_name
      FROM agent_access_tokens t
      INNER JOIN users u ON u.id = t.user_id
      WHERE t.owner_user_id = ${input.ownerUserId}
      ORDER BY t.created_at DESC
    `,
  );
  if (tokenRows.length === 0) {
    return [];
  }
  const botUserIds = tokenRows.map((row) => String(row.bot_user_id));
  const memberRows = asRowArray(
    await sql`
      SELECT m.id AS membership_id, m.project_id, m.user_id AS bot_user_id,
             m.project_display_name, m.team_label, p.name AS project_name,
             (w.membership_id IS NOT NULL) AS grok_webhook_registered
      FROM project_memberships m
      INNER JOIN user_projects p ON p.id = m.project_id
      LEFT JOIN project_membership_grok_routine_webhooks w
        ON w.membership_id = m.id
      WHERE m.user_id = ANY(${botUserIds})
        AND m.status = 'active'
        AND m.role = 'member'
      ORDER BY p.name ASC, m.created_at ASC
    `,
  );
  const byBot = new Map<string, OwnedBotMembershipView[]>();
  for (const row of memberRows) {
    const botUserId = String(row.bot_user_id);
    const list = byBot.get(botUserId) ?? [];
    list.push({
      membershipId: String(row.membership_id),
      projectId: String(row.project_id),
      projectName: String(row.project_name),
      projectDisplayName:
        typeof row.project_display_name === "string"
          ? row.project_display_name
          : null,
      teamLabel: typeof row.team_label === "string" ? row.team_label : null,
      grokWebhookRegistered: Boolean(row.grok_webhook_registered),
    });
    byBot.set(botUserId, list);
  }
  return tokenRows.map((row) => {
    const botUserId = String(row.bot_user_id);
    return {
      tokenId: String(row.token_id),
      botUserId,
      displayName: typeof row.display_name === "string" ? row.display_name : null,
      tokenPrefix: String(row.token_prefix),
      claimedAt:
        row.created_at instanceof Date
          ? row.created_at.toISOString()
          : typeof row.created_at === "string"
            ? row.created_at
            : null,
      memberships: byBot.get(botUserId) ?? [],
    };
  });
};

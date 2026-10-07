import { asRowArray, getSql } from "@/lib/db";
import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { checkProjectMessageSilence } from "@/lib/projects/acl/messaging/checkProjectMessageSilence";
import { buildProjectMessengerTimeline } from "@/lib/projects/acl/messaging/messenger/buildProjectMessengerTimeline";
import { groupProjectMessengerDeliveries } from "@/lib/projects/acl/messaging/messenger/groupProjectMessengerDeliveries";
import { keyProjectMessengerRows } from "@/lib/projects/acl/messaging/messenger/keyProjectMessengerRows";
import { loadProjectMessengerBots } from "@/lib/projects/acl/messaging/messenger/loadProjectMessengerBots";
import { loadProjectMessengerDeliveries } from "@/lib/projects/acl/messaging/messenger/loadProjectMessengerDeliveries";
import { mapProjectMessengerRow } from "@/lib/projects/acl/messaging/messenger/mapProjectMessengerRow";
import {
  PROJECT_MESSENGER_ROW_LIMIT,
} from "@/lib/projects/acl/messaging/messenger/projectMessenger.constant";
import type { ProjectMessengerCursor } from "@/lib/projects/acl/messaging/messenger/projectMessengerCursor";
import type { ProjectMessengerTimelineEntry } from "@/lib/projects/acl/messaging/messenger/projectMessenger.type";
import { purgeExpiredProjectMessages } from "@/lib/projects/acl/messaging/purgeExpiredProjectMessages";

export type LoadProjectMessengerNeonThreadPageResult = {
  readonly entries: readonly ProjectMessengerTimelineEntry[];
  readonly hasMore: boolean;
};

/**
 * Neon short-term window for one thread, newest-first.
 * Keyset: rows with (created_at, id) older than `before` (exclusive).
 * Over-fetches project-wide then filters to the thread (no chat_key column yet).
 */
export const loadProjectMessengerNeonThreadPage = async (input: {
  readonly projectId: string;
  readonly ownerUserId: string;
  readonly threadKey: string;
  readonly before: ProjectMessengerCursor | null;
  readonly limit: number;
}): Promise<LoadProjectMessengerNeonThreadPageResult> => {
  await ensureProjectAclSchema();
  await purgeExpiredProjectMessages();
  await checkProjectMessageSilence({ now: new Date() });

  const fetchLimit =
    input.before === null
      ? PROJECT_MESSENGER_ROW_LIMIT
      : Math.min(
          PROJECT_MESSENGER_ROW_LIMIT,
          Math.max(input.limit * 8, input.limit + 1),
        );
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT m.id, m.kind, m.summary, m.created_at,
        m.sender_membership_id, m.sender_user_id,
        m.to_membership_id, m.to_user_id, m.to_team_label,
        sender.project_display_name AS sender_display_name,
        sender.member_kind AS sender_member_kind,
        recipient.member_kind AS recipient_member_kind,
        to_char(m.created_at AT TIME ZONE 'UTC',
          'YYYY-MM-DD"T"HH24:MI:SS.US"Z"') AS cursor_at
      FROM project_messages m
      LEFT JOIN project_memberships sender ON sender.id = m.sender_membership_id
      LEFT JOIN project_memberships recipient ON recipient.id = m.to_membership_id
      WHERE m.project_id = ${input.projectId}
        AND (${input.before?.t ?? null}::timestamptz IS NULL
          OR (m.created_at, m.id) < (
            ${input.before?.t ?? null}::timestamptz,
            ${input.before?.id ?? null}::text
          ))
      ORDER BY m.created_at DESC, m.id DESC
      LIMIT ${fetchLimit}::int
    `,
  );

  const mapped = rows.map((row) => {
    const entry = mapProjectMessengerRow(row, input.ownerUserId);
    const cursorAt =
      typeof row.cursor_at === "string" ? row.cursor_at : entry.createdAt;
    return { ...entry, createdAt: cursorAt };
  });

  const bots = await loadProjectMessengerBots(input.projectId);
  const botsById = new Map(bots.map((bot) => [bot.membershipId, bot]));
  const deliveries = await loadProjectMessengerDeliveries(input.projectId);
  const grouped = groupProjectMessengerDeliveries(deliveries);
  const keyed = keyProjectMessengerRows({
    rows: mapped,
    botIds: new Set(bots.map((bot) => bot.membershipId)),
  });
  const timeline = buildProjectMessengerTimeline({
    threadKey: input.threadKey,
    keyed,
    deliveriesByMessage: grouped.byMessage,
    botsById,
  });

  const hasMore =
    timeline.length > input.limit || rows.length >= fetchLimit;
  return {
    entries: timeline.slice(0, input.limit),
    hasMore,
  };
};

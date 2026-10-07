import { AGENT_RUN_NEON_META_MAX_CHARS } from "@/lib/dispatch/toAgentRunNeonMetaText";
import { asRowArray, getSql } from "@/lib/db";
import { mapAgentRunToMessengerTimelineEntry } from "@/lib/projects/acl/messaging/messenger/mapAgentRunToMessengerTimelineEntry";
import type { ProjectMessengerCursor } from "@/lib/projects/acl/messaging/messenger/projectMessengerCursor";
import type { ProjectMessengerTimelineEntry } from "@/lib/projects/acl/messaging/messenger/projectMessenger.type";

export type LoadProjectMessengerNeonAgentRunsPageResult = {
  readonly entries: readonly ProjectMessengerTimelineEntry[];
  readonly hasMore: boolean;
};

/**
 * Neon agent_runs keyset page for History Load older (whole thread only).
 * Newest-first by (created_at, id); cursor t = createdAt ISO, id = raw run id.
 */
export const loadProjectMessengerNeonAgentRunsPage = async (input: {
  readonly projectId: string;
  readonly before: ProjectMessengerCursor | null;
  readonly limit: number;
}): Promise<LoadProjectMessengerNeonAgentRunsPageResult> => {
  const fetchLimit = Math.max(1, Math.floor(input.limit)) + 1;
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT r.id,
        LEFT(r.prompt, ${AGENT_RUN_NEON_META_MAX_CHARS}::int) AS prompt,
        r.status, r.writer_agent,
        to_char(r.created_at AT TIME ZONE 'UTC',
          'YYYY-MM-DD"T"HH24:MI:SS.US"Z"') AS cursor_at
      FROM agent_runs r
      WHERE r.project_id = ${input.projectId}
        AND (${input.before?.t ?? null}::timestamptz IS NULL
          OR (r.created_at, r.id) < (
            ${input.before?.t ?? null}::timestamptz,
            ${input.before?.id ?? null}::text
          ))
      ORDER BY r.created_at DESC, r.id DESC
      LIMIT ${fetchLimit}::int
    `,
  );

  const hasMore = rows.length > input.limit;
  const pageRows = hasMore ? rows.slice(0, input.limit) : rows;
  const entries = pageRows.map((row) => {
    const id = String(row.id);
    const cursorAt =
      typeof row.cursor_at === "string" ? row.cursor_at : String(row.created_at ?? "");
    return mapAgentRunToMessengerTimelineEntry({
      id,
      createdAt: cursorAt,
      status: String(row.status ?? "failed"),
      writerAgent:
        typeof row.writer_agent === "string" ? row.writer_agent : null,
      prompt: typeof row.prompt === "string" ? row.prompt : "",
    });
  });

  return { entries, hasMore };
};

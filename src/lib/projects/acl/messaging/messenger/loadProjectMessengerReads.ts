import { asRowArray, getSql } from "@/lib/db";

const toIso = (value: unknown): string =>
  value instanceof Date ? value.toISOString() : String(value);

/** Viewer's last-read time per thread key in this project. */
export const loadProjectMessengerReads = async (input: {
  readonly userId: string;
  readonly projectId: string;
}): Promise<ReadonlyMap<string, string>> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT thread_key, last_read_at
      FROM project_messenger_thread_reads
      WHERE user_id = ${input.userId}
        AND project_id = ${input.projectId}
    `,
  );
  return new Map(
    rows.map((row) => [String(row.thread_key), toIso(row.last_read_at)]),
  );
};

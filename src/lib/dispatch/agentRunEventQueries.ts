import mapAgentRunRow from "@/lib/dispatch/mapAgentRunRow";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";
import { asRowArray, getSql } from "@/lib/db";
import { isAgentWitchDevDashboardEnabled } from "@/lib/auth/resolveDevDashboardActor";

export const appendAgentRunEvent = async (input: {
  readonly agentRunId: string;
  readonly kind: string;
  readonly payload: Readonly<Record<string, unknown>>;
}): Promise<void> => {
  if (isAgentWitchDevDashboardEnabled()) {
    return;
  }

  const sql = getSql();
  await sql`
    WITH next_seq AS (
      SELECT COALESCE(MAX(seq), 0) + 1 AS seq
      FROM agent_run_events
      WHERE agent_run_id = ${input.agentRunId}
    )
    INSERT INTO agent_run_events (agent_run_id, seq, kind, payload)
    SELECT
      ${input.agentRunId},
      next_seq.seq,
      ${input.kind},
      ${JSON.stringify(input.payload)}::jsonb
    FROM next_seq
  `;
};

export const listAgentRunEvents = async (
  agentRunId: string,
  afterSeq: number = 0,
): Promise<
  readonly {
    readonly seq: number;
    readonly kind: string;
    readonly payload: Readonly<Record<string, unknown>>;
    readonly createdAt: string;
  }[]
> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT seq, kind, payload, created_at
      FROM agent_run_events
      WHERE agent_run_id = ${agentRunId}
        AND seq > ${afterSeq}
      ORDER BY seq ASC
      LIMIT 200
    `,
  );

  return rows.map((row) => ({
    seq: Number(row.seq),
    kind: String(row.kind),
    payload:
      typeof row.payload === "object" && row.payload !== null
        ? (row.payload as Record<string, unknown>)
        : {},
    createdAt: String(row.created_at),
  }));
};

export const getAgentRunRowById = async (
  runId: string,
): Promise<AgentRunRecord | null> => {
  const sql = getSql();
  const result = asRowArray(
    await sql`
      SELECT *
      FROM agent_runs
      WHERE id = ${runId}
      LIMIT 1
    `,
  );

  if (!result[0]) {
    return null;
  }

  return mapAgentRunRow(result[0]);
};

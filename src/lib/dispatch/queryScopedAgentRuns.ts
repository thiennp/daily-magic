import type { AgentRunStatusValue } from "@/lib/dispatch/AgentRunStatus.constant";
import {
  AgentRunScope,
  type AgentRunScopeValue,
} from "@/lib/dispatch/AgentRunScope.constant";
import mapAgentRunRow from "@/lib/dispatch/mapAgentRunRow";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";
import { asRowArray, getSql } from "@/lib/db";

interface QueryScopedAgentRunsInput {
  readonly userId: string;
  readonly limit: number;
  readonly scope: AgentRunScopeValue;
  readonly status?: AgentRunStatusValue;
  readonly groupId?: string;
}

export async function queryScopedAgentRuns(
  input: QueryScopedAgentRunsInput,
): Promise<readonly AgentRunRecord[]> {
  const sql = getSql();
  const { userId, limit, scope, status, groupId } = input;

  if (scope === AgentRunScope.MINE) {
    const result =
      status === undefined
        ? asRowArray(
            await sql`
              SELECT * FROM agent_runs
              WHERE requester_user_id = ${userId}
                AND executor_user_id = ${userId}
              ORDER BY created_at DESC LIMIT ${limit}
            `,
          )
        : asRowArray(
            await sql`
              SELECT * FROM agent_runs
              WHERE requester_user_id = ${userId}
                AND executor_user_id = ${userId}
                AND status = ${status}
              ORDER BY created_at DESC LIMIT ${limit}
            `,
          );
    return result.map((row) => mapAgentRunRow(row));
  }

  if (scope === AgentRunScope.TEAM) {
    const result =
      status === undefined
        ? asRowArray(
            await sql`
              SELECT * FROM agent_runs
              WHERE (requester_user_id = ${userId} OR executor_user_id = ${userId})
                AND requester_user_id <> executor_user_id
              ORDER BY created_at DESC LIMIT ${limit}
            `,
          )
        : asRowArray(
            await sql`
              SELECT * FROM agent_runs
              WHERE (requester_user_id = ${userId} OR executor_user_id = ${userId})
                AND requester_user_id <> executor_user_id
                AND status = ${status}
              ORDER BY created_at DESC LIMIT ${limit}
            `,
          );
    return result.map((row) => mapAgentRunRow(row));
  }

  if (scope === AgentRunScope.GROUP && groupId !== undefined) {
    const result =
      status === undefined
        ? asRowArray(
            await sql`
              SELECT * FROM agent_runs
              WHERE (requester_user_id = ${userId} OR executor_user_id = ${userId})
                AND group_id = ${groupId}
              ORDER BY created_at DESC LIMIT ${limit}
            `,
          )
        : asRowArray(
            await sql`
              SELECT * FROM agent_runs
              WHERE (requester_user_id = ${userId} OR executor_user_id = ${userId})
                AND group_id = ${groupId}
                AND status = ${status}
              ORDER BY created_at DESC LIMIT ${limit}
            `,
          );
    return result.map((row) => mapAgentRunRow(row));
  }

  const result =
    status === undefined
      ? asRowArray(
          await sql`
            SELECT * FROM agent_runs
            WHERE requester_user_id = ${userId} OR executor_user_id = ${userId}
            ORDER BY created_at DESC LIMIT ${limit}
          `,
        )
      : asRowArray(
          await sql`
            SELECT * FROM agent_runs
            WHERE (requester_user_id = ${userId} OR executor_user_id = ${userId})
              AND status = ${status}
            ORDER BY created_at DESC LIMIT ${limit}
          `,
        );

  return result.map((row) => mapAgentRunRow(row));
}

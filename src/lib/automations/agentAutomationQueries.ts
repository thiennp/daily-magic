import mapAgentAutomationRow from "@/lib/automations/mapAgentAutomationRow";
import type AgentAutomationRecord from "@/lib/automations/types/AgentAutomationRecord.type";
import { asRowArray, getSql } from "@/lib/db";

export const getAgentAutomationById = async (
  automationId: string,
): Promise<AgentAutomationRecord | null> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT *
      FROM agent_automations
      WHERE id = ${automationId}
      LIMIT 1
    `,
  );

  return rows.length > 0 ? mapAgentAutomationRow(rows[0]) : null;
};

export const listAgentAutomationsForOwner = async (
  ownerUserId: string,
): Promise<readonly AgentAutomationRecord[]> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT *
      FROM agent_automations
      WHERE owner_user_id = ${ownerUserId}
      ORDER BY created_at DESC
    `,
  );

  return rows.map((row) => mapAgentAutomationRow(row));
};

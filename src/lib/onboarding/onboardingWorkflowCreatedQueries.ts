import { CapabilityStatus } from "@/lib/capabilities/CapabilityStatus.constant";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import { DEFAULT_AGENT_CAPABILITY_NAME } from "@/lib/capabilities/defaultAgentCapability.constant";
import { SAMPLE_WORKFLOW_CAPABILITY_NAME } from "@/lib/capabilities/sampleWorkflowCapability.constant";
import { asRowArray, getSql } from "@/lib/db";

export async function userHasCreatedWorkflowInDatabase(
  userId: string,
): Promise<boolean> {
  const sql = getSql();
  const result = asRowArray(
    await sql`
      SELECT EXISTS (
        SELECT 1
        FROM published_capabilities
        WHERE owner_user_id = ${userId}
          AND status <> ${CapabilityStatus.ARCHIVED}
          AND NOT (
            type = ${CapabilityType.WORKFLOW}
            AND name = ${SAMPLE_WORKFLOW_CAPABILITY_NAME}
          )
          AND NOT (
            type = ${CapabilityType.AGENT}
            AND name = ${DEFAULT_AGENT_CAPABILITY_NAME}
          )
      ) AS workflow_created
    `,
  );

  return result[0]?.workflow_created === true;
}

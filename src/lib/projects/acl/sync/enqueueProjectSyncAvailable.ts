import { enqueueAgentWitchDispatchOutbox } from "@/lib/agentWitch/enqueueAgentWitchDispatchOutbox";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { asRowArray, getSql } from "@/lib/db";

/**
 * Thin wake to every other enabled device: sync.available {projectId, seq}.
 */
export const enqueueProjectSyncAvailable = async (input: {
  readonly projectId: string;
  readonly seq: number;
  readonly originDeviceId: string;
  readonly ownerUserId: string;
}): Promise<number> => {
  const sql = getSql();
  const devices = asRowArray(
    await sql`
      SELECT device_id FROM project_sync_devices
      WHERE project_id = ${input.projectId}
        AND enabled = true
        AND device_id <> ${input.originDeviceId}
    `,
  );
  const results = await Promise.all(
    devices.map(async (row) => {
      const deviceId = String(row.device_id);
      return enqueueAgentWitchDispatchOutbox({
        userId: input.ownerUserId,
        deviceId,
        idempotencyKey: `sync.available:${input.projectId}:${input.seq}:${deviceId}`,
        message: {
          type: AGENT_WITCH_MESSAGE_TYPES.SYNC_AVAILABLE,
          projectId: input.projectId,
          seq: input.seq,
        } as never,
      });
    }),
  );
  return results.filter((result) => result.queued).length;
};

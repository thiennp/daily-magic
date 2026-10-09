import { asRowArray, getSql } from "@/lib/db";

/** True iff `deviceId` is a non-revoked computer registered by `userId`. */
export const isActorOwnedLiveDevice = async (input: {
  readonly userId: string;
  readonly deviceId: string;
}): Promise<boolean> =>
  asRowArray(
    await getSql()`
      SELECT id FROM agent_witch_devices
      WHERE id = ${input.deviceId} AND user_id = ${input.userId}
        AND revoked_at IS NULL
      LIMIT 1
    `,
  ).length > 0;

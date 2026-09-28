import { asRowArray, getSql } from "@/lib/db";

/** Removes the device row. Identity lookup is by token hash across the whole table. */
export const deleteAgentWitchDevice = async (input: {
  readonly deviceId: string;
  readonly userId: string;
}): Promise<boolean> => {
  const sql = getSql();
  const result = asRowArray(
    await sql`
      DELETE FROM agent_witch_devices
      WHERE id = ${input.deviceId}
        AND user_id = ${input.userId}
      RETURNING id
    `,
  );

  return result.length > 0;
};

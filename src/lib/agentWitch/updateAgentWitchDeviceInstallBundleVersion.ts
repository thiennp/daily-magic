import { getSql } from "@/lib/db";

export const updateAgentWitchDeviceInstallBundleVersion = async (input: {
  readonly deviceId: string;
  readonly installBundleVersion: string;
}): Promise<void> => {
  const sql = getSql();
  await sql`
    UPDATE agent_witch_devices
    SET install_bundle_version = ${input.installBundleVersion}
    WHERE id = ${input.deviceId}
      AND revoked_at IS NULL
  `;
};

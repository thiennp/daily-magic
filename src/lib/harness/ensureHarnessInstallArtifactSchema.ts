import { getSql } from "@/lib/db";

const schemaState: { ensured: boolean; promise: Promise<void> | null } = {
  ensured: false,
  promise: null,
};

export const ensureHarnessInstallArtifactSchema = async (): Promise<void> => {
  if (schemaState.ensured) {
    return;
  }

  if (schemaState.promise !== null) {
    return schemaState.promise;
  }

  schemaState.promise = (async () => {
    const sql = getSql();
    await sql`
      CREATE TABLE IF NOT EXISTS agent_witch_harness_install_artifacts (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
        user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        device_id TEXT NOT NULL REFERENCES agent_witch_devices(id) ON DELETE CASCADE,
        bundle_gzip BYTEA NOT NULL,
        content_sha256 TEXT NOT NULL,
        expires_at TIMESTAMPTZ NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;
    await sql`
      CREATE INDEX IF NOT EXISTS agent_witch_harness_install_artifacts_device_idx
        ON agent_witch_harness_install_artifacts (device_id, expires_at)
    `;
    schemaState.ensured = true;
  })();

  return schemaState.promise;
};

import { ensureHarnessInstallArtifactSchema } from "@/lib/harness/ensureHarnessInstallArtifactSchema";
import { asRowArray, getSql } from "@/lib/db";

export const readHarnessInstallArtifactGzip = async (input: {
  readonly artifactId: string;
  readonly deviceId: string;
}): Promise<{
  readonly bundleGzip: Buffer;
  readonly contentSha256: string;
} | null> => {
  await ensureHarnessInstallArtifactSchema();
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT bundle_gzip, content_sha256
      FROM agent_witch_harness_install_artifacts
      WHERE id = ${input.artifactId}
        AND device_id = ${input.deviceId}
        AND expires_at > NOW()
      LIMIT 1
    `,
  );

  const row = rows[0];
  if (row === undefined) {
    return null;
  }

  const bundleGzipRaw = row.bundle_gzip;
  const contentSha256 =
    typeof row.content_sha256 === "string" ? row.content_sha256 : "";

  if (bundleGzipRaw === undefined || contentSha256.length === 0) {
    return null;
  }

  const bundleGzip = Buffer.isBuffer(bundleGzipRaw)
    ? bundleGzipRaw
    : Buffer.from(bundleGzipRaw as Uint8Array);

  return { bundleGzip, contentSha256 };
};

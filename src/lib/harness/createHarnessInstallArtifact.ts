import { createHash, randomUUID } from "node:crypto";
import { gzipSync } from "node:zlib";

import type HarnessInstallBundle from "@/lib/agentWitch/harness/types/HarnessInstallBundle.type";
import { ensureHarnessInstallArtifactSchema } from "@/lib/harness/ensureHarnessInstallArtifactSchema";
import { getSql } from "@/lib/db";

const ARTIFACT_TTL_MS = 24 * 60 * 60 * 1000;

export const createHarnessInstallArtifact = async (input: {
  readonly userId: string;
  readonly deviceId: string;
  readonly bundle: HarnessInstallBundle;
}): Promise<{
  readonly artifactId: string;
  readonly contentSha256: string;
}> => {
  await ensureHarnessInstallArtifactSchema();
  const sql = getSql();
  const json = JSON.stringify(input.bundle);
  const bundleGzip = gzipSync(Buffer.from(json, "utf8"));
  const contentSha256 = createHash("sha256").update(bundleGzip).digest("hex");
  const artifactId = randomUUID();
  const expiresAt = new Date(Date.now() + ARTIFACT_TTL_MS);

  await sql`
    INSERT INTO agent_witch_harness_install_artifacts (
      id,
      user_id,
      device_id,
      bundle_gzip,
      content_sha256,
      expires_at
    )
    VALUES (
      ${artifactId},
      ${input.userId},
      ${input.deviceId},
      ${bundleGzip},
      ${contentSha256},
      ${expiresAt.toISOString()}
    )
  `;

  return { artifactId, contentSha256 };
};

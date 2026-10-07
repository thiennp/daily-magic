import { conflictProjectSyncPath } from "@/lib/projects/acl/sync/conflictProjectSyncPath";
import { storeProjectSyncBlob } from "@/lib/projects/acl/sync/storeProjectSyncBlob";
import { upsertProjectSyncFileHead } from "@/lib/projects/acl/sync/upsertProjectSyncFileHead";
import { validateProjectSyncOffer } from "@/lib/projects/acl/sync/validateProjectSyncOffer";
import { asRowArray, getSql } from "@/lib/db";

export type CommitProjectSyncOfferResult =
  | {
      readonly ok: true;
      readonly seq: number;
      readonly outcome: "head" | "conflict_copy";
      readonly path: string;
    }
  | {
      readonly ok: false;
      readonly code:
        | "not_enabled"
        | "not_member"
        | "invalid"
        | "too_large"
        | "secret_suspect"
        | "invalid_path"
        | "kind_not_allowed";
    };

/**
 * Offer + commit when the full body is present (v1). Last-writer-wins by seq;
 * prior differing head kept as conflict_copy sibling.
 */
export const commitProjectSyncOffer = async (input: {
  readonly projectId: string;
  readonly deviceId: string;
  readonly path: string;
  readonly baseSeq: number;
  readonly contentSha256: string;
  readonly bodyUtf8: string;
}): Promise<CommitProjectSyncOfferResult> => {
  const validated = await validateProjectSyncOffer(input);
  if (!validated.ok) {
    return validated;
  }
  await storeProjectSyncBlob({
    projectId: input.projectId,
    contentSha256: input.contentSha256,
    size: validated.size,
    bodyUtf8: input.bodyUtf8,
  });
  const sql = getSql();
  const head = asRowArray(
    await sql`
      SELECT head_seq, content_sha256 FROM project_sync_files
      WHERE project_id = ${input.projectId}
        AND path = ${validated.path}
      LIMIT 1
    `,
  );
  const headSeq = Number(head[0]?.head_seq ?? 0);
  const headSha = head[0]?.content_sha256
    ? String(head[0].content_sha256)
    : "";
  const conflict =
    head.length > 0 &&
    input.baseSeq !== headSeq &&
    headSha.length > 0 &&
    headSha !== input.contentSha256;
  const outcome = conflict ? "conflict_copy" : "head";
  const commitPath = conflict
    ? conflictProjectSyncPath({
        path: validated.path,
        deviceId: input.deviceId,
      })
    : validated.path;
  const inserted = asRowArray(
    await sql`
      INSERT INTO project_sync_versions (
        project_id, path, base_seq, content_sha256, size_bytes,
        origin_device_id, outcome, kind
      ) VALUES (
        ${input.projectId},
        ${commitPath},
        ${input.baseSeq},
        ${input.contentSha256},
        ${validated.size},
        ${input.deviceId},
        ${outcome},
        ${validated.kind}
      )
      RETURNING seq
    `,
  );
  const seq = Number(inserted[0]?.seq ?? 0);
  if (outcome === "head") {
    await upsertProjectSyncFileHead({
      projectId: input.projectId,
      path: validated.path,
      kind: validated.kind,
      seq,
      contentSha256: input.contentSha256,
      size: validated.size,
      deviceId: input.deviceId,
    });
  }
  return { ok: true, seq, outcome, path: commitPath };
};

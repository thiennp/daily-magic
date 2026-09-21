import { asRowArray, getSql } from "@/lib/db";

export type WorkflowFieldUploadRow = {
  readonly id: string;
  readonly ownerUserId: string;
  readonly sha256: string;
  readonly mimeType: string;
  readonly fileName: string;
  readonly byteSize: number;
  readonly extractedText: string;
  readonly storagePath: string;
};

const mapWorkflowFieldUploadRow = (
  row: Record<string, unknown>,
): WorkflowFieldUploadRow => ({
  id: String(row.id),
  ownerUserId: String(row.owner_user_id),
  sha256: String(row.sha256),
  mimeType: String(row.mime_type),
  fileName: String(row.file_name),
  byteSize: Number(row.byte_size),
  extractedText: String(row.extracted_text),
  storagePath: String(row.storage_path),
});

export async function insertWorkflowFieldUpload(input: {
  readonly ownerUserId: string;
  readonly sha256: string;
  readonly mimeType: string;
  readonly fileName: string;
  readonly byteSize: number;
  readonly extractedText: string;
  readonly storagePath: string;
}): Promise<WorkflowFieldUploadRow> {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      INSERT INTO workflow_field_uploads (
        owner_user_id,
        sha256,
        mime_type,
        file_name,
        byte_size,
        extracted_text,
        storage_path
      )
      VALUES (
        ${input.ownerUserId},
        ${input.sha256},
        ${input.mimeType},
        ${input.fileName},
        ${input.byteSize},
        ${input.extractedText},
        ${input.storagePath}
      )
      RETURNING *
    `,
  );

  return mapWorkflowFieldUploadRow(rows[0] ?? {});
}

export async function getWorkflowFieldUploadForOwner(input: {
  readonly uploadId: string;
  readonly ownerUserId: string;
}): Promise<WorkflowFieldUploadRow | null> {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT *
      FROM workflow_field_uploads
      WHERE id = ${input.uploadId}
        AND owner_user_id = ${input.ownerUserId}
      LIMIT 1
    `,
  );

  const row = rows[0];
  return row ? mapWorkflowFieldUploadRow(row) : null;
}

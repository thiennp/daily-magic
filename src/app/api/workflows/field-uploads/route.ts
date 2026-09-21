import { readFile } from "node:fs/promises";
import path from "node:path";

import { requireAuth } from "@/lib/auth/requireAuth";
import {
  persistWorkflowUploadBytes,
  sha256Buffer,
} from "@/lib/workflows/persistWorkflowUploadBytes";
import { extractWorkflowUploadText } from "@/lib/workflows/extractWorkflowUploadText";
import {
  defaultWorkflowFileAccept,
  mimeMatchesWorkflowFileAccept,
} from "@/lib/workflows/mimeMatchesWorkflowFileAccept";
import { WORKFLOW_UPLOAD_MAX_BYTES } from "@/lib/workflows/types/WorkflowFieldFileAccept.constant";
import { resolveWorkflowUploadRootDir } from "@/lib/workflows/resolveWorkflowUploadRootDir";
import { parseWorkflowFieldAccept } from "@/lib/workflows/parseWorkflowFieldAccept";
import { insertWorkflowFieldUpload } from "@/lib/workflows/workflowFieldUploadQueries";
import { buildWorkflowFieldUploadRef } from "@/lib/workflows/workflowFieldUploadRef.constant";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) {
    return error;
  }

  const formData = await request.formData();
  const file = formData.get("file");
  if (!(file instanceof File)) {
    return Response.json({ error: "file is required." }, { status: 400 });
  }

  if (file.size > WORKFLOW_UPLOAD_MAX_BYTES) {
    return Response.json(
      { error: "File is too large (max 5 MB)." },
      { status: 400 },
    );
  }

  const accept = parseWorkflowFieldAccept(formData.get("accept"));
  const effectiveAccept =
    accept.length > 0 ? accept : defaultWorkflowFileAccept();

  const mimeType = file.type.trim().toLowerCase() || "application/octet-stream";
  if (!mimeMatchesWorkflowFileAccept(mimeType, effectiveAccept)) {
    return Response.json(
      { error: "File type is not allowed for this question." },
      { status: 400 },
    );
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const sha256 = sha256Buffer(bytes);
  const extractedText = await extractWorkflowUploadText({
    mimeType,
    fileName: file.name,
    bytes,
  });
  const storagePath = await persistWorkflowUploadBytes(sha256, bytes);
  const row = await insertWorkflowFieldUpload({
    ownerUserId: actor.id,
    sha256,
    mimeType,
    fileName: file.name,
    byteSize: bytes.length,
    extractedText,
    storagePath,
  });

  return Response.json({
    ok: true,
    uploadId: row.id,
    ref: buildWorkflowFieldUploadRef(row.id),
    fileName: row.fileName,
    mimeType: row.mimeType,
    byteSize: row.byteSize,
    excerpt: row.extractedText.slice(0, 2000),
  });
}

export async function GET(request: Request): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) {
    return error;
  }

  const uploadId = new URL(request.url).searchParams.get("uploadId")?.trim();
  if (uploadId === undefined || uploadId.length === 0) {
    return Response.json({ error: "uploadId is required." }, { status: 400 });
  }

  const { getWorkflowFieldUploadForOwner } =
    await import("@/lib/workflows/workflowFieldUploadQueries");
  const row = await getWorkflowFieldUploadForOwner({
    uploadId,
    ownerUserId: actor.id,
  });

  if (row === null) {
    return Response.json({ error: "Upload not found." }, { status: 404 });
  }

  const absolutePath = path.join(
    resolveWorkflowUploadRootDir(),
    row.storagePath,
  );
  const bytes = await readFile(absolutePath);

  return new Response(bytes, {
    headers: {
      "Content-Type": row.mimeType,
      "Content-Disposition": `inline; filename="${row.fileName.replace(/"/g, "")}"`,
      "Cache-Control": "private, max-age=3600",
    },
  });
}

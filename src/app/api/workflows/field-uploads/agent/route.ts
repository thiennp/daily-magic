import { readFile } from "node:fs/promises";
import path from "node:path";

import { verifyWorkflowFieldUploadAgentAccess } from "@/lib/workflows/signWorkflowFieldUploadAgentAccess";
import { resolveWorkflowUploadRootDir } from "@/lib/workflows/resolveWorkflowUploadRootDir";
import { getWorkflowFieldUploadById } from "@/lib/workflows/workflowFieldUploadQueries";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const uploadId = url.searchParams.get("uploadId")?.trim() ?? "";
  const expiresRaw = url.searchParams.get("expires")?.trim() ?? "";
  const signature = url.searchParams.get("sig")?.trim() ?? "";
  const expiresUnix = Number.parseInt(expiresRaw, 10);

  if (
    uploadId.length === 0 ||
    !Number.isFinite(expiresUnix) ||
    signature.length === 0
  ) {
    return Response.json({ error: "Invalid download link." }, { status: 400 });
  }

  const row = await getWorkflowFieldUploadById(uploadId);

  if (row === null) {
    return Response.json({ error: "Upload not found." }, { status: 404 });
  }

  const verified = verifyWorkflowFieldUploadAgentAccess({
    uploadId,
    ownerUserId: row.ownerUserId,
    expiresUnix,
    signature,
  });

  if (!verified) {
    return Response.json(
      { error: "Download link expired or invalid." },
      {
        status: 403,
      },
    );
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

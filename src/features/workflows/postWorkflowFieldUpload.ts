export type WorkflowFieldUploadResponse =
  | {
      readonly ok: true;
      readonly ref: string;
      readonly uploadId: string;
      readonly fileName: string;
      readonly excerpt: string;
    }
  | { readonly ok: false; readonly errorMessage: string };

export async function postWorkflowFieldUpload(input: {
  readonly file: File;
  readonly accept: readonly string[];
}): Promise<WorkflowFieldUploadResponse> {
  const formData = new FormData();
  formData.set("file", input.file);
  formData.set("accept", JSON.stringify(input.accept));

  const response = await fetch("/api/workflows/field-uploads", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const data: unknown = await response.json().catch(() => null);
    const message =
      typeof data === "object" &&
      data !== null &&
      "error" in data &&
      typeof (data as { error: unknown }).error === "string"
        ? (data as { error: string }).error
        : "Upload failed.";
    return { ok: false, errorMessage: message };
  }

  const data: unknown = await response.json();
  const record = data as Record<string, unknown>;
  const ref = typeof record.ref === "string" ? record.ref : "";
  const uploadId = typeof record.uploadId === "string" ? record.uploadId : "";
  const fileName = typeof record.fileName === "string" ? record.fileName : "";
  const excerpt = typeof record.excerpt === "string" ? record.excerpt : "";

  if (ref.length === 0 || uploadId.length === 0) {
    return { ok: false, errorMessage: "Upload response was invalid." };
  }

  return { ok: true, ref, uploadId, fileName, excerpt };
}

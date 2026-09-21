import {
  WORKFLOW_UPLOAD_IMAGE_MIMES,
  WORKFLOW_UPLOAD_PDF_MIME,
} from "@/lib/workflows/types/WorkflowFieldFileAccept.constant";

export async function extractWorkflowUploadText(input: {
  readonly mimeType: string;
  readonly fileName: string;
  readonly bytes: Buffer;
}): Promise<string> {
  const mime = input.mimeType.trim().toLowerCase();

  if (mime === WORKFLOW_UPLOAD_PDF_MIME) {
    const pdfParse = (await import("pdf-parse")).default as (
      data: Buffer,
    ) => Promise<{ text: string }>;
    const parsed = await pdfParse(input.bytes);
    const text = parsed.text.replace(/\s+/g, " ").trim();
    return text.length > 0
      ? text.slice(0, 120_000)
      : `[PDF "${input.fileName}" had no extractable text. Ask the operator to paste key points.]`;
  }

  if (WORKFLOW_UPLOAD_IMAGE_MIMES.some((entry) => entry === mime)) {
    return `[Image attached: ${input.fileName}. Vision models on the Mac cannot read this URL yet; use Design B or describe the image in another question.]`;
  }

  return `[File attached: ${input.fileName}]`;
}

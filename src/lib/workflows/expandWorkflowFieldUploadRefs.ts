import { buildWorkflowFieldUploadAgentUrl } from "@/lib/workflows/buildWorkflowFieldUploadAgentUrl";
import { getWorkflowFieldUploadForOwner } from "@/lib/workflows/workflowFieldUploadQueries";
import { parseWorkflowFieldUploadRef } from "@/lib/workflows/parseWorkflowFieldUploadRef";
import type WorkflowFieldDefinition from "@/lib/workflows/types/WorkflowFieldDefinition.type";

export async function expandWorkflowFieldUploadRefs(input: {
  readonly ownerUserId: string;
  readonly fields: readonly WorkflowFieldDefinition[];
  readonly values: Readonly<Record<string, string>>;
}): Promise<Record<string, string>> {
  const expanded: Record<string, string> = { ...input.values };

  await Promise.all(
    input.fields.map(async (field) => {
      const raw = input.values[field.key]?.trim() ?? "";
      const uploadId = parseWorkflowFieldUploadRef(raw);
      if (uploadId === null) {
        return;
      }

      const upload = await getWorkflowFieldUploadForOwner({
        uploadId,
        ownerUserId: input.ownerUserId,
      });

      if (upload === null) {
        expanded[field.key] = `(missing upload ${uploadId})`;
        return;
      }

      const agentUrl = buildWorkflowFieldUploadAgentUrl({
        uploadId,
        ownerUserId: input.ownerUserId,
      });
      const downloadLine =
        agentUrl !== null
          ? `Agent download URL (signed, 24h): ${agentUrl}\n\n`
          : "";

      expanded[field.key] =
        `[${upload.fileName}]\n${downloadLine}${upload.extractedText}`;
    }),
  );

  return expanded;
}

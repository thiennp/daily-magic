import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import type WorkflowFieldDefinition from "@/lib/workflows/types/WorkflowFieldDefinition.type";

export { buildWorkflowFieldsFromDrafts } from "@/features/workflows/buildWorkflowFieldsFromDrafts";

export interface CreateWorkflowPayload {
  readonly name: string;
  readonly description: string;
  readonly exampleRequest: string;
  readonly workflowFields: readonly WorkflowFieldDefinition[];
}

export async function submitCreateWorkflow(
  payload: CreateWorkflowPayload,
): Promise<
  | { readonly ok: true; readonly capabilityId: string }
  | { readonly ok: false; readonly errorMessage: string }
> {
  const response = await fetch("/api/capabilities/mine", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: CapabilityType.WORKFLOW,
      name: payload.name,
      description: payload.description,
      exampleRequest: payload.exampleRequest,
      workflowFields: payload.workflowFields,
    }),
  });

  if (!response.ok) {
    const data: unknown = await response.json().catch(() => null);
    const message =
      typeof data === "object" &&
      data !== null &&
      "error" in data &&
      typeof (data as { error: unknown }).error === "string"
        ? (data as { error: string }).error
        : "Could not create workflow.";
    return { ok: false, errorMessage: message };
  }

  const data: unknown = await response.json();
  const capabilityId =
    typeof data === "object" &&
    data !== null &&
    "capability" in data &&
    typeof (data as { capability: unknown }).capability === "object" &&
    (data as { capability: { id?: unknown } }).capability !== null &&
    typeof (data as { capability: { id: unknown } }).capability.id === "string"
      ? (data as { capability: { id: string } }).capability.id
      : null;

  if (!capabilityId) {
    return {
      ok: false,
      errorMessage: "Workflow created but response was invalid.",
    };
  }

  return { ok: true, capabilityId };
}

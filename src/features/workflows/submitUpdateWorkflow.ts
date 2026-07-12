import type WorkflowFieldDefinition from "@/lib/workflows/types/WorkflowFieldDefinition.type";

export interface UpdateWorkflowPayload {
  readonly capabilityId: string;
  readonly name: string;
  readonly description: string;
  readonly exampleRequest: string;
  readonly workflowFields: readonly WorkflowFieldDefinition[];
}

export async function submitUpdateWorkflow(
  payload: UpdateWorkflowPayload,
): Promise<
  { readonly ok: true } | { readonly ok: false; readonly errorMessage: string }
> {
  const response = await fetch(`/api/capabilities/${payload.capabilityId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
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
        : "Could not update workflow.";
    return { ok: false, errorMessage: message };
  }

  return { ok: true };
}

import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import type { HarnessItemKind } from "@/lib/agentWitch/harness/types/HarnessItemKind.constant";
import type WorkflowFieldDefinition from "@/lib/workflows/types/WorkflowFieldDefinition.type";

export interface CreatePlaybookHarnessItem {
  readonly id: string;
  readonly kind: HarnessItemKind;
  readonly title: string;
  readonly content: string;
}

export interface CreatePlaybookPayload {
  readonly type: typeof CapabilityType.AGENT | typeof CapabilityType.WORKFLOW;
  readonly name: string;
  readonly description: string;
  readonly exampleRequest: string;
  readonly workflowFields?: readonly WorkflowFieldDefinition[];
  readonly harnessItems: readonly CreatePlaybookHarnessItem[];
}

export type CreatePlaybookResult =
  | {
      readonly ok: true;
      readonly capabilityId: string;
      readonly harnessInstalled: boolean;
      readonly harnessInstallMessage: string | null;
    }
  | { readonly ok: false; readonly errorMessage: string };

export async function submitCreatePlaybook(
  payload: CreatePlaybookPayload,
): Promise<CreatePlaybookResult> {
  const response = await fetch("/api/capabilities/mine", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: payload.type,
      name: payload.name,
      description: payload.description,
      exampleRequest: payload.exampleRequest,
      workflowFields: payload.workflowFields ?? [],
      harnessItems: payload.harnessItems,
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
        : "Could not create playbook.";
    return { ok: false, errorMessage: message };
  }

  const data: unknown = await response.json();
  if (typeof data !== "object" || data === null) {
    return { ok: false, errorMessage: "Invalid response from server." };
  }

  const record = data as Record<string, unknown>;
  const capability =
    typeof record.capability === "object" && record.capability !== null
      ? (record.capability as { id?: unknown })
      : null;
  const capabilityId =
    capability !== null && typeof capability.id === "string"
      ? capability.id
      : null;

  if (!capabilityId) {
    return {
      ok: false,
      errorMessage: "Playbook created but response was invalid.",
    };
  }

  const harnessInstalled = record.harnessInstalled === true;
  const harnessInstallMessage =
    typeof record.harnessInstallMessage === "string"
      ? record.harnessInstallMessage
      : null;

  return {
    ok: true,
    capabilityId,
    harnessInstalled,
    harnessInstallMessage,
  };
}

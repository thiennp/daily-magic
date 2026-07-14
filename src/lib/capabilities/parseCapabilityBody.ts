import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import { isCapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import {
  isCapabilityVisibility,
  type CapabilityVisibilityValue,
} from "@/lib/capabilities/CapabilityVisibility.constant";
import { parseCapabilityHarnessItems } from "@/lib/capabilities/parseCapabilityHarnessItems";
import type { ParsedCapabilityHarnessItem } from "@/lib/capabilities/parseCapabilityHarnessItems";
import { parseWorkflowFieldDefinitions } from "@/lib/workflows/parseWorkflowFieldDefinitions";
import type WorkflowFieldDefinition from "@/lib/workflows/types/WorkflowFieldDefinition.type";

export interface ParsedCapabilityBody {
  readonly name: string;
  readonly description: string;
  readonly exampleRequest: string;
  readonly visibility?: CapabilityVisibilityValue;
  readonly groupId?: string | null;
  readonly type: typeof CapabilityType.AGENT | typeof CapabilityType.WORKFLOW;
  readonly workflowFields: readonly WorkflowFieldDefinition[];
  readonly harnessItems: readonly ParsedCapabilityHarnessItem[];
}

export function parseCreateCapabilityBody(
  body: unknown,
): ParsedCapabilityBody | undefined {
  if (typeof body !== "object" || body === null) {
    return undefined;
  }

  const record = body as Record<string, unknown>;
  const name =
    typeof record.name === "string" && record.name.trim().length > 0
      ? record.name.trim()
      : undefined;

  if (!name) {
    return undefined;
  }

  const type =
    typeof record.type === "string" && isCapabilityType(record.type)
      ? record.type
      : CapabilityType.AGENT;

  const workflowFields =
    type === CapabilityType.WORKFLOW
      ? parseWorkflowFieldDefinitions(record.workflowFields)
      : [];

  if (type === CapabilityType.WORKFLOW && workflowFields.length === 0) {
    return undefined;
  }

  const harnessItems = parseCapabilityHarnessItems(record.harnessItems);

  return {
    name,
    description:
      typeof record.description === "string" ? record.description : "",
    exampleRequest:
      typeof record.exampleRequest === "string" ? record.exampleRequest : "",
    visibility:
      typeof record.visibility === "string" &&
      isCapabilityVisibility(record.visibility)
        ? record.visibility
        : undefined,
    groupId:
      typeof record.groupId === "string" && record.groupId.length > 0
        ? record.groupId
        : null,
    type,
    workflowFields,
    harnessItems,
  };
}

import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import { isCapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import {
  isCapabilityVisibility,
  type CapabilityVisibilityValue,
} from "@/lib/capabilities/CapabilityVisibility.constant";
import { parseCapabilityHarnessItems } from "@/lib/capabilities/parseCapabilityHarnessItems";
import type { ParsedCapabilityHarnessItem } from "@/lib/capabilities/parseCapabilityHarnessItems";
import { parseWorkflowFieldDefinitions } from "@/lib/workflows/parseWorkflowFieldDefinitions";
import { parseWorkflowOutputFieldDefinitions } from "@/lib/workflows/parseWorkflowOutputFieldDefinitions";
import type WorkflowFieldDefinition from "@/lib/workflows/types/WorkflowFieldDefinition.type";
import type WorkflowOutputFieldDefinition from "@/lib/workflows/types/WorkflowOutputFieldDefinition.type";

export interface ParsedCapabilityBody {
  readonly name: string;
  readonly description: string;
  readonly exampleRequest: string;
  readonly visibility?: CapabilityVisibilityValue;
  readonly groupId?: string | null;
  readonly type: typeof CapabilityType.AGENT | typeof CapabilityType.WORKFLOW;
  readonly workflowFields: readonly WorkflowFieldDefinition[];
  readonly workflowOutputFields: readonly WorkflowOutputFieldDefinition[];
  readonly harnessItems: readonly ParsedCapabilityHarnessItem[];
}

export type ParseOptionalCapabilityVisibilityResult =
  | {
      readonly ok: true;
      readonly visibility: CapabilityVisibilityValue | undefined;
    }
  | {
      readonly ok: false;
      readonly code: "invalid_visibility";
      readonly error: string;
    };

/** Absent / null → default later. Present non-enum → invalid. */
export const parseOptionalCapabilityVisibility = (
  body: unknown,
): ParseOptionalCapabilityVisibilityResult => {
  if (typeof body !== "object" || body === null) {
    return { ok: true, visibility: undefined };
  }

  const record = body as Record<string, unknown>;
  if (!("visibility" in record)) {
    return { ok: true, visibility: undefined };
  }

  const value = record.visibility;
  if (value === undefined || value === null) {
    return { ok: true, visibility: undefined };
  }

  if (typeof value === "string" && isCapabilityVisibility(value)) {
    return { ok: true, visibility: value };
  }

  return {
    ok: false,
    code: "invalid_visibility",
    error: "visibility must be private, group, or public.",
  };
};

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

  const workflowOutputFields =
    type === CapabilityType.WORKFLOW
      ? parseWorkflowOutputFieldDefinitions(record.workflowOutputFields)
      : [];

  if (type === CapabilityType.WORKFLOW && workflowFields.length === 0) {
    return undefined;
  }

  const visibilityResult = parseOptionalCapabilityVisibility(body);
  if (!visibilityResult.ok) {
    return undefined;
  }

  const harnessItems = parseCapabilityHarnessItems(record.harnessItems);

  return {
    name,
    description:
      typeof record.description === "string" ? record.description : "",
    exampleRequest:
      typeof record.exampleRequest === "string" ? record.exampleRequest : "",
    visibility: visibilityResult.visibility,
    groupId:
      typeof record.groupId === "string" && record.groupId.length > 0
        ? record.groupId
        : null,
    type,
    workflowFields,
    workflowOutputFields,
    harnessItems,
  };
}

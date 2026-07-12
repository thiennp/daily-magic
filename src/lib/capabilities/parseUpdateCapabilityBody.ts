import { parseWorkflowFieldDefinitions } from "@/lib/workflows/parseWorkflowFieldDefinitions";
import type WorkflowFieldDefinition from "@/lib/workflows/types/WorkflowFieldDefinition.type";

export interface ParsedUpdateCapabilityBody {
  readonly name?: string;
  readonly description?: string;
  readonly exampleRequest?: string;
  readonly workflowFields?: readonly WorkflowFieldDefinition[];
}

export function parseUpdateCapabilityBody(
  body: unknown,
): ParsedUpdateCapabilityBody | undefined {
  if (typeof body !== "object" || body === null) {
    return undefined;
  }

  const record = body as Record<string, unknown>;
  const parsed: {
    name?: string;
    description?: string;
    exampleRequest?: string;
    workflowFields?: readonly WorkflowFieldDefinition[];
  } = {};

  if ("name" in record) {
    if (typeof record.name !== "string" || record.name.trim().length === 0) {
      return undefined;
    }

    parsed.name = record.name.trim();
  }

  if ("description" in record && typeof record.description === "string") {
    parsed.description = record.description;
  }

  if ("exampleRequest" in record && typeof record.exampleRequest === "string") {
    parsed.exampleRequest = record.exampleRequest;
  }

  if ("workflowFields" in record) {
    const workflowFields = parseWorkflowFieldDefinitions(record.workflowFields);
    if (workflowFields.length === 0) {
      return undefined;
    }

    parsed.workflowFields = workflowFields;
  }

  return Object.keys(parsed).length > 0 ? parsed : undefined;
}

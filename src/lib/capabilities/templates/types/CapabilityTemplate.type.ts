import type { HarnessItemKind } from "@/lib/agentWitch/harness/types/HarnessItemKind.constant";
import type { CapabilityTypeValue } from "@/lib/capabilities/CapabilityType.constant";
import type WorkflowFieldDefinition from "@/lib/workflows/types/WorkflowFieldDefinition.type";

export interface CapabilityTemplateHarnessItem {
  readonly id: string;
  readonly kind: HarnessItemKind;
  readonly title: string;
  readonly path: string;
  readonly content: string;
}

export interface CapabilityTemplateHarness {
  readonly slug: string;
  readonly name: string;
  readonly items: readonly CapabilityTemplateHarnessItem[];
}

interface CapabilityTemplateBase {
  readonly id: string;
  readonly category: string;
  readonly name: string;
  readonly description: string;
  readonly detail: string;
  readonly exampleRequest: string;
  readonly outcomes: readonly string[];
  readonly harness: CapabilityTemplateHarness;
}

export interface WorkflowCapabilityTemplate extends CapabilityTemplateBase {
  readonly type: Extract<CapabilityTypeValue, "workflow">;
  readonly workflowFields: readonly WorkflowFieldDefinition[];
}

export interface AgentCapabilityTemplate extends CapabilityTemplateBase {
  readonly type: Extract<CapabilityTypeValue, "agent">;
}

export type CapabilityTemplate =
  WorkflowCapabilityTemplate | AgentCapabilityTemplate;

export interface CapabilityTemplateHarnessItemSummary {
  readonly id: string;
  readonly kind: HarnessItemKind;
  readonly title: string;
}

export interface CapabilityTemplateSummary {
  readonly id: string;
  readonly type: CapabilityTypeValue;
  readonly category: string;
  readonly name: string;
  readonly description: string;
  readonly detail: string;
  readonly fieldCount: number;
  readonly harnessName: string;
  readonly harnessItemCount: number;
  readonly harnessItems: readonly CapabilityTemplateHarnessItemSummary[];
  readonly outcomes: readonly string[];
}

export interface CapabilityTemplateDetail extends CapabilityTemplateSummary {
  readonly exampleRequest: string;
  readonly workflowFields: readonly WorkflowFieldDefinition[];
  readonly harness: CapabilityTemplateHarness;
}

import type WorkflowFieldDefinition from "@/lib/workflows/types/WorkflowFieldDefinition.type";

export interface DispatchTargetCapability {
  readonly id: string;
  readonly ownerUserId: string;
  readonly type: string;
  readonly name: string;
  readonly description: string;
  readonly exampleRequest: string;
  readonly visibility: string;
  readonly workflowFields: readonly WorkflowFieldDefinition[];
}

export interface DispatchTargetMember {
  readonly userId: string;
  readonly email: string;
  readonly name: string | null;
  readonly isPaired: boolean;
  readonly isOnline: boolean;
  readonly capabilities: readonly DispatchTargetCapability[];
}

export interface DispatchTargetGroup {
  readonly groupId: string;
  readonly groupName: string;
  readonly dispatchPolicy: string;
  readonly members: readonly DispatchTargetMember[];
}

import {
  isArrayWithEachItem,
  isBoolean,
  isNonEmptyString,
  isNullOr,
  isOneOf,
  isString,
  isType,
} from "guardz";

import { HARNESS_ITEM_KINDS } from "@/lib/agentWitch/harness/types/HarnessItemKind.constant";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import { WorkflowFieldInputType } from "@/lib/workflows/types/WorkflowFieldInputType.constant";

import type GuestLibraryDraft from "@/lib/library/guest/types/GuestLibraryDraft.type";

const isGuestLibraryDraftHarnessItem = isType({
  id: isNonEmptyString,
  kind: isOneOf(...HARNESS_ITEM_KINDS),
  title: isString,
  content: isString,
});

const isWorkflowFieldDefinition = isType({
  key: isNonEmptyString,
  label: isNonEmptyString,
  type: isOneOf(
    WorkflowFieldInputType.TEXT,
    WorkflowFieldInputType.TEXTAREA,
    WorkflowFieldInputType.PROJECT,
  ),
  required: isBoolean,
});

const isGuestLibraryDraft = isType<GuestLibraryDraft>({
  localId: isNonEmptyString,
  remoteCapabilityId: isNullOr(isNonEmptyString),
  sourceTemplateId: isNullOr(isNonEmptyString),
  type: isOneOf(CapabilityType.AGENT, CapabilityType.WORKFLOW),
  name: isNonEmptyString,
  description: isString,
  exampleRequest: isString,
  workflowFields: isArrayWithEachItem(isWorkflowFieldDefinition),
  harnessItems: isArrayWithEachItem(isGuestLibraryDraftHarnessItem),
  harnessSetSlug: isNullOr(isNonEmptyString),
  createdAt: isNonEmptyString,
  updatedAt: isNonEmptyString,
});

export default isGuestLibraryDraft;

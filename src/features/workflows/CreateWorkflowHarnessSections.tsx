"use client";

import CapabilityHarnessItemsEditor from "@/features/capabilities/CapabilityHarnessItemsEditor";
import { PLAYBOOK_HARNESS_SECTION } from "@/features/capabilities/playbookBuilderCopy.constant";
import { filterHarnessItemsByKinds } from "@/features/workflows/filterHarnessItemsByKinds";
import { WORKFLOW_BUILDER_STEPS_SECTION } from "@/features/workflows/workflowBuilderCopy.constant";
import {
  WORKFLOW_EXTRA_RULE_HARNESS_KINDS,
  WORKFLOW_RUN_STEP_HARNESS_KINDS,
} from "@/features/workflows/workflowHarnessKindGroups.constant";
import type { HarnessItemDraft } from "@/features/harness/types/HarnessItemDraft.type";
import type { HarnessItemKind } from "@/lib/agentWitch/harness/types/HarnessItemKind.constant";

interface CreateWorkflowHarnessSectionsProps {
  readonly items: readonly HarnessItemDraft[];
  readonly onAdd: (kind: HarnessItemKind) => void;
  readonly onRemove: (itemId: string) => void;
  readonly onChange: (nextItem: HarnessItemDraft) => void;
}

export default function CreateWorkflowHarnessSections({
  items,
  onAdd,
  onRemove,
  onChange,
}: CreateWorkflowHarnessSectionsProps) {
  return (
    <>
      <CapabilityHarnessItemsEditor
        title={WORKFLOW_BUILDER_STEPS_SECTION.title}
        description={WORKFLOW_BUILDER_STEPS_SECTION.description}
        kinds={WORKFLOW_RUN_STEP_HARNESS_KINDS}
        items={filterHarnessItemsByKinds(
          items,
          WORKFLOW_RUN_STEP_HARNESS_KINDS,
        )}
        onAdd={onAdd}
        onRemove={onRemove}
        onChange={onChange}
      />
      <CapabilityHarnessItemsEditor
        title={PLAYBOOK_HARNESS_SECTION.title}
        description={PLAYBOOK_HARNESS_SECTION.description}
        kinds={WORKFLOW_EXTRA_RULE_HARNESS_KINDS}
        items={filterHarnessItemsByKinds(
          items,
          WORKFLOW_EXTRA_RULE_HARNESS_KINDS,
        )}
        onAdd={onAdd}
        onRemove={onRemove}
        onChange={onChange}
      />
    </>
  );
}

"use client";

import Button from "@/components/ui/button/Button";
import { WORKFLOW_BUILDER_FLOW_SECTION } from "@/features/workflows/workflowBuilderCopy.constant";
import type { HarnessItemKind } from "@/lib/agentWitch/harness/types/HarnessItemKind.constant";

interface WorkflowBuilderFlowTreeAddStepActionsProps {
  readonly onAddStep: (kind: HarnessItemKind) => void;
}

export default function WorkflowBuilderFlowTreeAddStepActions({
  onAddStep,
}: WorkflowBuilderFlowTreeAddStepActionsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 pt-1 pl-6">
      <span className="text-xs text-gray-400">+</span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          onAddStep("operator");
        }}
      >
        {WORKFLOW_BUILDER_FLOW_SECTION.addHumanStepButton}
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          onAddStep("agent");
        }}
      >
        {WORKFLOW_BUILDER_FLOW_SECTION.addSpecialistStepButton}
      </Button>
    </div>
  );
}

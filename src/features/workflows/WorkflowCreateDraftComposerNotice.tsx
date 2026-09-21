"use client";

import { APP_SURFACE_NESTED_CARD_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import { WORKFLOW_TRIAL_RUN_COMPOSER_NOTICE } from "@/features/workflows/workflowTrialRunCopy.constant";

interface WorkflowCreateDraftComposerNoticeProps {
  readonly visible: boolean;
}

export default function WorkflowCreateDraftComposerNotice({
  visible,
}: WorkflowCreateDraftComposerNoticeProps) {
  if (!visible) {
    return null;
  }

  return (
    <div
      className={`mb-4 border-amber-200 bg-amber-50/80 dark:border-amber-900/50 dark:bg-amber-950/30 ${APP_SURFACE_NESTED_CARD_CLASS}`}
      role="status"
    >
      <p className="text-sm text-amber-900 dark:text-amber-100">
        {WORKFLOW_TRIAL_RUN_COMPOSER_NOTICE}
      </p>
    </div>
  );
}

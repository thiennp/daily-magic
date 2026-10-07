import { APP_SURFACE_NESTED_CARD_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";
import { SAMPLE_WORKFLOW_PREVIEW_FIELD_VALUES } from "@/lib/capabilities/sampleWorkflowCapability.constant";
import { buildWorkflowPrompt } from "@/lib/workflows/buildWorkflowPrompt";

interface LibrarySampleWorkflowPromptPreviewProps {
  readonly capability: PublishedCapabilityRecord;
}

const LibrarySampleWorkflowPromptPreview = ({
  capability,
}: LibrarySampleWorkflowPromptPreviewProps) => {
  const prompt = buildWorkflowPrompt(
    capability.name,
    capability.workflowFields,
    SAMPLE_WORKFLOW_PREVIEW_FIELD_VALUES,
    capability.exampleRequest,
  );

  return (
    <div className={`mt-4 ${APP_SURFACE_NESTED_CARD_CLASS}`}>
      <p className="text-xs font-semibold uppercase tracking-wide text-awc-fg-muted dark:text-gray-400">
        How this prompt is built
      </p>
      <p className="mt-2 text-sm text-awc-fg-muted dark:text-gray-400">
        Each question below becomes a line under Inputs. Use Run on your
        computer to open Agent, or edit the questions here first.
      </p>
      <pre className="mt-3 overflow-x-auto whitespace-pre-wrap rounded-lg border border-awc-border bg-awc-surface-2 p-3 font-mono text-xs text-awc-fg dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100">
        {prompt}
      </pre>
    </div>
  );
};

export default LibrarySampleWorkflowPromptPreview;

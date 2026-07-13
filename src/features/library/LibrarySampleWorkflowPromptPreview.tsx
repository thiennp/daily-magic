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
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
        How this prompt is built
      </p>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Each question below becomes a line under Inputs. Edit them, then run the
        workflow in Agent — this text is what your Mac receives.
      </p>
      <pre className="mt-3 overflow-x-auto whitespace-pre-wrap rounded-lg border border-gray-200 bg-gray-50 p-3 font-mono text-xs text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100">
        {prompt}
      </pre>
    </div>
  );
};

export default LibrarySampleWorkflowPromptPreview;

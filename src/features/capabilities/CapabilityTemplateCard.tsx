import Button from "@/components/ui/button/Button";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import CapabilityTemplateHarnessPreview from "@/features/capabilities/CapabilityTemplateHarnessPreview";
import type { CapabilityTemplateSummary } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";

interface CapabilityTemplateCardProps {
  readonly template: CapabilityTemplateSummary;
  readonly isSelected: boolean;
  readonly isSaving: boolean;
  readonly savedTemplateId: string | null;
  readonly harnessMessage: string | null;
  readonly onSelect: (templateId: string) => void;
  readonly onSave: (templateId: string) => void;
}

export default function CapabilityTemplateCard({
  template,
  isSelected,
  isSaving,
  savedTemplateId,
  harnessMessage,
  onSelect,
  onSave,
}: CapabilityTemplateCardProps) {
  const isSaved = savedTemplateId === template.id;

  return (
    <article
      className={`rounded-xl border p-4 ${
        isSelected
          ? "border-brand-300 bg-brand-50/40 dark:border-brand-800 dark:bg-brand-950/20"
          : "border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900/40"
      }`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-gray-600 dark:bg-gray-800 dark:text-gray-300">
          {template.type === CapabilityType.WORKFLOW ? "Workflow" : "Agent"}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {template.category}
        </span>
      </div>
      <button
        type="button"
        className="mt-2 block w-full text-left"
        onClick={() => {
          onSelect(template.id);
        }}
      >
        <h3 className="text-sm font-medium text-gray-900 dark:text-white/90">
          {template.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
          {template.description}
        </p>
      </button>
      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        {template.type === CapabilityType.WORKFLOW
          ? `${template.fieldCount} inputs · `
          : ""}
        {template.harnessItemCount} harness files
      </p>
      {isSelected ? (
        <div className="mt-3 space-y-3">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {template.detail}
          </p>
          <CapabilityTemplateHarnessPreview
            harnessName={template.harnessName}
            harnessItems={template.harnessItems}
          />
          <ul className="list-disc space-y-1 pl-5 text-sm text-gray-600 dark:text-gray-400">
            {template.outcomes.map((outcome) => (
              <li key={outcome}>{outcome}</li>
            ))}
          </ul>
        </div>
      ) : null}
      {harnessMessage && isSaved ? (
        <p className="mt-3 text-xs text-brand-700 dark:text-brand-300">
          {harnessMessage}
        </p>
      ) : null}
      <Button
        size="sm"
        variant="primary"
        disabled={isSaving || isSaved}
        className="mt-4"
        onClick={() => {
          onSave(template.id);
        }}
      >
        {isSaved ? "Saved" : isSaving ? "Saving…" : "Save"}
      </Button>
    </article>
  );
}

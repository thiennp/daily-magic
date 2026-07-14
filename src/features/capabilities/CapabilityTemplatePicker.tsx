"use client";

import CapabilityTemplateCard from "@/features/capabilities/CapabilityTemplateCard";
import CapabilityTemplateShowAllButton from "@/features/capabilities/CapabilityTemplateShowAllButton";
import CapabilityTemplateTabBar from "@/features/capabilities/CapabilityTemplateTabBar";
import { useCapabilityTemplatePicker } from "@/features/capabilities/hooks/useCapabilityTemplatePicker";

interface CapabilityTemplatePickerProps {
  readonly onSaved?: () => void;
}

export default function CapabilityTemplatePicker({
  onSaved,
}: CapabilityTemplatePickerProps) {
  const picker = useCapabilityTemplatePicker({ onSaved });

  if (picker.isLoading) {
    return (
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Loading starter templates…
      </p>
    );
  }

  return (
    <div className="mt-6">
      <CapabilityTemplateTabBar
        activeTab={picker.activeTab}
        workflowCount={picker.workflowCount}
        agentCount={picker.agentCount}
        onChange={picker.handleTabChange}
      />
      {picker.errorMessage ? (
        <p className="mt-3 text-sm text-error-600 dark:text-error-400">
          {picker.errorMessage}
        </p>
      ) : null}
      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        {picker.displayedTemplates.map((template) => (
          <CapabilityTemplateCard
            key={template.id}
            template={template}
            isSelected={picker.selectedTemplateId === template.id}
            isSaving={picker.savingTemplateId === template.id}
            savedTemplateId={picker.savedTemplateId}
            harnessMessage={picker.harnessMessage}
            onSelect={picker.setSelectedTemplateId}
            onSave={(templateId) => {
              void picker.handleSave(templateId);
            }}
          />
        ))}
      </div>
      <div className="mt-4">
        <CapabilityTemplateShowAllButton
          totalCount={picker.visibleTemplates.length}
          showAll={picker.showAll}
          tabLabel={picker.tabLabel}
          onToggle={() => {
            picker.setShowAll((current) => !current);
          }}
        />
      </div>
    </div>
  );
}

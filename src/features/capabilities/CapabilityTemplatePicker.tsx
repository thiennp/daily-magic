"use client";

import { useMemo, useState } from "react";

import CapabilityTemplateCard from "@/features/capabilities/CapabilityTemplateCard";
import CapabilityTemplateTabBar, {
  type TemplateTab,
} from "@/features/capabilities/CapabilityTemplateTabBar";
import useCapabilityTemplates from "@/features/capabilities/hooks/useCapabilityTemplates";
import { saveCapabilityTemplateToLibrary } from "@/features/capabilities/utils/capabilityTemplatesApi";
import { useDemoPreview } from "@/features/demo/DemoPreviewContext";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";

interface CapabilityTemplatePickerProps {
  readonly onSaved?: () => void;
}

export default function CapabilityTemplatePicker({
  onSaved,
}: CapabilityTemplatePickerProps) {
  const demoPreview = useDemoPreview();
  const { templates, isLoading } = useCapabilityTemplates();
  const [activeTab, setActiveTab] = useState<TemplateTab>("workflow");
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(
    null,
  );
  const [savingTemplateId, setSavingTemplateId] = useState<string | null>(null);
  const [savedTemplateId, setSavedTemplateId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [harnessMessage, setHarnessMessage] = useState<string | null>(null);

  const visibleTemplates = useMemo(
    () =>
      templates.filter((template) =>
        activeTab === "workflow"
          ? template.type === CapabilityType.WORKFLOW
          : template.type === CapabilityType.AGENT,
      ),
    [activeTab, templates],
  );

  const handleSave = async (templateId: string): Promise<void> => {
    if (demoPreview) {
      setSavedTemplateId(templateId);
      setHarnessMessage("Demo preview — harness install is simulated.");
      onSaved?.();
      return;
    }

    setErrorMessage(null);
    setHarnessMessage(null);
    setSavingTemplateId(templateId);
    const result = await saveCapabilityTemplateToLibrary(templateId);
    setSavingTemplateId(null);

    if (!result.ok) {
      setErrorMessage(result.errorMessage);
      return;
    }

    setSavedTemplateId(templateId);
    setHarnessMessage(
      result.harnessInstalled
        ? "Harness install requested on your Mac."
        : (result.harnessInstallMessage ??
            "Saved to Library. Install the harness from Agent when your Mac is online."),
    );
    onSaved?.();
  };

  if (isLoading) {
    return (
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Loading starter templates…
      </p>
    );
  }

  return (
    <div className="mt-6">
      <CapabilityTemplateTabBar
        activeTab={activeTab}
        onChange={(tab) => {
          setActiveTab(tab);
          setSelectedTemplateId(null);
        }}
      />
      {errorMessage ? (
        <p className="mt-3 text-sm text-error-600 dark:text-error-400">
          {errorMessage}
        </p>
      ) : null}
      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        {visibleTemplates.map((template) => (
          <CapabilityTemplateCard
            key={template.id}
            template={template}
            isSelected={selectedTemplateId === template.id}
            isSaving={savingTemplateId === template.id}
            savedTemplateId={savedTemplateId}
            harnessMessage={harnessMessage}
            onSelect={setSelectedTemplateId}
            onSave={(templateId) => {
              void handleSave(templateId);
            }}
          />
        ))}
      </div>
    </div>
  );
}

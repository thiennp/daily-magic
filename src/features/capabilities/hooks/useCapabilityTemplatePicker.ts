"use client";

import { useMemo, useState } from "react";

import type { TemplateTab } from "@/features/capabilities/CapabilityTemplateTabBar";
import { CAPABILITY_TEMPLATE_PICKER_VISIBLE_COUNT } from "@/features/capabilities/constants/capabilityTemplatePicker.constant";
import useCapabilityTemplates from "@/features/capabilities/hooks/useCapabilityTemplates";
import { saveCapabilityTemplateToLibrary } from "@/features/capabilities/utils/capabilityTemplatesApi";
import { useDemoPreview } from "@/features/demo/DemoPreviewContext";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import type { CapabilityTemplateSummary } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";

interface UseCapabilityTemplatePickerOptions {
  readonly onSaved?: () => void;
}

export function useCapabilityTemplatePicker({
  onSaved,
}: UseCapabilityTemplatePickerOptions) {
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
  const [showAll, setShowAll] = useState(false);

  const workflowCount = useMemo(
    () =>
      templates.filter((template) => template.type === CapabilityType.WORKFLOW)
        .length,
    [templates],
  );
  const agentCount = useMemo(
    () =>
      templates.filter((template) => template.type === CapabilityType.AGENT)
        .length,
    [templates],
  );

  const visibleTemplates = useMemo(
    (): readonly CapabilityTemplateSummary[] =>
      templates.filter((template) =>
        activeTab === "workflow"
          ? template.type === CapabilityType.WORKFLOW
          : template.type === CapabilityType.AGENT,
      ),
    [activeTab, templates],
  );

  const displayedTemplates = useMemo(
    () =>
      showAll
        ? visibleTemplates
        : visibleTemplates.slice(0, CAPABILITY_TEMPLATE_PICKER_VISIBLE_COUNT),
    [showAll, visibleTemplates],
  );

  const tabLabel = activeTab === "workflow" ? "Workflows" : "Agents";

  const handleTabChange = (tab: TemplateTab): void => {
    setActiveTab(tab);
    setSelectedTemplateId(null);
    setShowAll(false);
  };

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

  return {
    isLoading,
    activeTab,
    workflowCount,
    agentCount,
    displayedTemplates,
    visibleTemplates,
    tabLabel,
    selectedTemplateId,
    savingTemplateId,
    savedTemplateId,
    harnessMessage,
    errorMessage,
    showAll,
    setSelectedTemplateId,
    setShowAll,
    handleTabChange,
    handleSave,
  };
}

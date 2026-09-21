"use client";

import { useMemo, useState } from "react";

import type { TemplateTab } from "@/features/capabilities/CapabilityTemplateTabBar";
import { CAPABILITY_TEMPLATE_PICKER_VISIBLE_COUNT } from "@/features/capabilities/constants/capabilityTemplatePicker.constant";
import useCapabilityTemplates from "@/features/capabilities/hooks/useCapabilityTemplates";
import {
  defaultSaveCapabilityTemplateOutcome,
  resolveCapabilityTemplateSaveHarnessMessage,
} from "@/features/capabilities/utils/defaultSaveCapabilityTemplateOutcome";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import type SaveCapabilityTemplateOutcome from "@/features/capabilities/types/SaveCapabilityTemplateOutcome.type";
import type { CapabilityTemplateSummary } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";

export type { SaveCapabilityTemplateOutcome };

interface UseCapabilityTemplatePickerOptions {
  readonly onSaved?: () => void;
  readonly saveTemplate?: (
    templateId: string,
  ) => Promise<SaveCapabilityTemplateOutcome>;
}

export function useCapabilityTemplatePicker({
  onSaved,
  saveTemplate = defaultSaveCapabilityTemplateOutcome,
}: UseCapabilityTemplatePickerOptions) {
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

  const { workflowCount, agentCount } = useMemo(() => {
    const workflowTemplates = templates.filter(
      (template) => template.type === CapabilityType.WORKFLOW,
    );
    return {
      workflowCount: workflowTemplates.length,
      agentCount: templates.length - workflowTemplates.length,
    };
  }, [templates]);

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
    setErrorMessage(null);
    setHarnessMessage(null);
    setSavingTemplateId(templateId);
    const result = await saveTemplate(templateId);
    setSavingTemplateId(null);

    if (!result.ok) {
      setErrorMessage(result.errorMessage);
      return;
    }

    setSavedTemplateId(templateId);
    setHarnessMessage(resolveCapabilityTemplateSaveHarnessMessage(result));
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

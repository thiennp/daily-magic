"use client";

import { useEffect, useState } from "react";

import { useDemoPreview } from "@/features/demo/DemoPreviewContext";
import { fetchCapabilityTemplates } from "@/features/capabilities/utils/capabilityTemplatesApi";
import { listCapabilityTemplateSummaries } from "@/lib/capabilities/templates/listCapabilityTemplates";
import type { CapabilityTemplateSummary } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";

const useCapabilityTemplates = (): {
  readonly templates: readonly CapabilityTemplateSummary[];
  readonly isLoading: boolean;
} => {
  const demoPreview = useDemoPreview();
  const [templates, setTemplates] = useState<
    readonly CapabilityTemplateSummary[]
  >(() => (demoPreview ? listCapabilityTemplateSummaries() : []));
  const [isLoading, setIsLoading] = useState(() => !demoPreview);

  useEffect(() => {
    if (demoPreview) {
      return;
    }

    void fetchCapabilityTemplates().then((loadedTemplates) => {
      setTemplates(loadedTemplates);
      setIsLoading(false);
    });
  }, [demoPreview]);

  return { templates, isLoading };
};

export default useCapabilityTemplates;

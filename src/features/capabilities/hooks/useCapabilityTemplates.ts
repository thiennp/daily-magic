"use client";

import { useEffect, useState } from "react";

import { fetchCapabilityTemplates } from "@/features/capabilities/utils/capabilityTemplatesApi";
import type { CapabilityTemplateSummary } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";

const useCapabilityTemplates = (): {
  readonly templates: readonly CapabilityTemplateSummary[];
  readonly isLoading: boolean;
} => {
  const [templates, setTemplates] = useState<
    readonly CapabilityTemplateSummary[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    void fetchCapabilityTemplates().then((loadedTemplates) => {
      setTemplates(loadedTemplates);
      setIsLoading(false);
    });
  }, []);

  return { templates, isLoading };
};

export default useCapabilityTemplates;

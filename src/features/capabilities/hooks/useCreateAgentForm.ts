"use client";

import { useState } from "react";

import { useCapabilityHarnessDraft } from "@/features/capabilities/hooks/useCapabilityHarnessDraft";
import { submitCreatePlaybook } from "@/features/capabilities/submitCreatePlaybook";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";

interface UseCreateAgentFormOptions {
  readonly onCreated: () => void;
  readonly onCancel: () => void;
}

export function useCreateAgentForm({
  onCreated,
  onCancel,
}: UseCreateAgentFormOptions) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [exampleRequest, setExampleRequest] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const harness = useCapabilityHarnessDraft();

  const handleSubmit = async (): Promise<void> => {
    setError(null);
    setNotice(null);
    const trimmedName = name.trim();
    if (trimmedName.length === 0) {
      setError("Agent name is required.");
      return;
    }

    if (exampleRequest.trim().length === 0) {
      setError("Standing instructions are required for an agent.");
      return;
    }

    setIsSubmitting(true);
    const result = await submitCreatePlaybook({
      type: CapabilityType.AGENT,
      name: trimmedName,
      description: description.trim(),
      exampleRequest: exampleRequest.trim(),
      harnessItems: harness.readyItems,
    });
    setIsSubmitting(false);

    if (!result.ok) {
      setError(result.errorMessage);
      return;
    }

    if (!result.harnessInstalled && result.harnessInstallMessage) {
      setNotice(result.harnessInstallMessage);
    }

    onCreated();
    if (result.harnessInstalled || !result.harnessInstallMessage) {
      onCancel();
    }
  };

  return {
    name,
    description,
    exampleRequest,
    isSubmitting,
    error,
    notice,
    harness,
    setName,
    setDescription,
    setExampleRequest,
    handleSubmit,
  };
}

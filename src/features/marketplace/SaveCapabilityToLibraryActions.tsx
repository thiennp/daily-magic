"use client";

import { useState } from "react";

import SaveToProjectSelect from "@/features/capabilities/SaveToProjectSelect";
import { useSaveToProjectPicker } from "@/features/capabilities/hooks/useSaveToProjectPicker";
import { runSaveCapabilityToLibrary } from "@/features/marketplace/utils/runSaveCapabilityToLibrary";
import Button from "@/components/ui/button/Button";
import { MAC_WORKER_BENEFIT_COPY } from "@/lib/copy/macWorkerBenefitCopy.constant";

type SaveStatus = "idle" | "saving" | "saved" | "error";

interface SaveCapabilityToLibraryActionsProps {
  readonly capabilityId: string;
  readonly sourceOwnerLabel: string;
  readonly isOfficialPreset?: boolean;
  /** Current project when opened inside a project. */
  readonly contextProjectId?: string;
}

export default function SaveCapabilityToLibraryActions({
  capabilityId,
  sourceOwnerLabel,
  isOfficialPreset = false,
  contextProjectId,
}: SaveCapabilityToLibraryActionsProps) {
  const projectPicker = useSaveToProjectPicker(contextProjectId);
  const [status, setStatus] = useState<SaveStatus>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [savedName, setSavedName] = useState<string | null>(null);

  const handleSave = async (): Promise<void> => {
    setStatus("saving");
    setMessage(null);

    const projectId = projectPicker.selectedProjectId;
    const result = await runSaveCapabilityToLibrary({
      capabilityId,
      isOfficialPreset,
      projectId,
    });

    if (result.status === "error") {
      setStatus("error");
      setMessage(result.message);
      return;
    }

    projectPicker.rememberProject(projectId);
    setStatus("saved");
    setSavedName(result.savedName);
    setMessage(result.message);
  };

  return (
    <div className="mt-4 space-y-2">
      <SaveToProjectSelect
        picker={projectPicker}
        disabled={status === "saving" || status === "saved"}
      />
      <Button
        disabled={status === "saving" || status === "saved"}
        onClick={() => {
          void handleSave();
        }}
      >
        {status === "saving"
          ? "Saving…"
          : status === "saved"
            ? "Saved to my library"
            : "Save to my library"}
      </Button>
      <p className="text-xs text-awc-fg-muted dark:text-gray-400">
        {isOfficialPreset
          ? MAC_WORKER_BENEFIT_COPY.officialPresetHelper
          : `Copies the prompt from ${sourceOwnerLabel}. Use Install for the rules bundle.`}
      </p>
      {savedName ? (
        <p className="text-xs font-medium text-brand-700 dark:text-brand-300">
          {savedName}
        </p>
      ) : null}
      {message ? (
        <p
          className={`text-xs ${
            status === "error"
              ? "text-amber-700 dark:text-amber-300"
              : "text-awc-fg-muted dark:text-gray-400"
          }`}
        >
          {message}
        </p>
      ) : null}
    </div>
  );
}

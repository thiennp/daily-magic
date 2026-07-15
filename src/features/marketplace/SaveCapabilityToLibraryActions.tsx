"use client";

import { useState } from "react";

import { saveCapabilityTemplateToLibrary } from "@/features/capabilities/utils/capabilityTemplatesApi";
import { useDemoPreview } from "@/features/demo/DemoPreviewContext";
import forkCapabilityToLibrary from "@/features/harness/hooks/forkCapabilityToLibrary";
import Button from "@/components/ui/button/Button";
import { parsePresetMarketplaceTemplateId } from "@/lib/marketplace/presetMarketplaceCapabilityId";

type SaveStatus = "idle" | "saving" | "saved" | "error";

interface SaveCapabilityToLibraryActionsProps {
  readonly capabilityId: string;
  readonly sourceOwnerLabel: string;
  readonly isOfficialPreset?: boolean;
}

export default function SaveCapabilityToLibraryActions({
  capabilityId,
  sourceOwnerLabel,
  isOfficialPreset = false,
}: SaveCapabilityToLibraryActionsProps) {
  const demoPreview = useDemoPreview();
  const [status, setStatus] = useState<SaveStatus>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [savedName, setSavedName] = useState<string | null>(null);

  const handleSave = async (): Promise<void> => {
    if (demoPreview) {
      setStatus("error");
      setMessage("Demo preview does not save to your account.");
      return;
    }

    setStatus("saving");
    setMessage(null);

    if (isOfficialPreset) {
      const templateId = parsePresetMarketplaceTemplateId(capabilityId);

      if (templateId === null) {
        setStatus("error");
        setMessage("Could not save this starter.");
        return;
      }

      const result = await saveCapabilityTemplateToLibrary(templateId);

      if (!result.ok) {
        setStatus("error");
        setMessage(result.errorMessage);
        return;
      }

      setStatus("saved");
      setSavedName(null);
      setMessage(
        result.harnessInstalled
          ? "Saved to your library. Rules bundle install requested on your Mac."
          : (result.harnessInstallMessage ??
              "Saved to your library. Connect Agent Witch on your Mac to install the rules bundle."),
      );
      return;
    }

    const result = await forkCapabilityToLibrary(capabilityId);

    if (!result.ok) {
      setStatus("error");
      setMessage(result.errorMessage);
      return;
    }

    setStatus("saved");
    setSavedName(result.capability.name);
    setMessage(
      `Saved as a private draft. Edit it under Home → What teammates can request.`,
    );
  };

  return (
    <div className="mt-4 space-y-2">
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
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {isOfficialPreset
          ? "Adds this free starter to your library and requests the rules bundle on your Mac when connected."
          : `Copies the prompt and workflow from ${sourceOwnerLabel} into your account. Rules bundles are not copied — use Install bundle for that.`}
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
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          {message}
        </p>
      ) : null}
    </div>
  );
}

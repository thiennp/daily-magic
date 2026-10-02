"use client";

import { useState } from "react";

import Button from "@/components/ui/button/Button";
import AwcProjectRepoUrlsFields, {
  buildRepoUrlsPayload,
  type AwcProjectRepoUrlsFieldsValue,
} from "@/features/projects/repoUrls/AwcProjectRepoUrlsFields";
import { AWC_PROJECT_REPO_URLS_COPY } from "@/features/projects/repoUrls/awcProjectRepoUrlsCopy.constant";
import { mutateProjectRepoUrls } from "@/features/projects/repoUrls/mutateProjectRepoUrls";
import type { ProjectRepoMetadata } from "@/lib/projects/validateProjectRepoUrls";
import {
  validateDefaultBranch,
  validateProjectRepoUrls,
} from "@/lib/projects/validateProjectRepoUrls";

interface AwcProjectRepoUrlsEditorProps {
  readonly projectId: string;
  readonly initial: ProjectRepoMetadata;
  readonly onSaved?: (metadata: ProjectRepoMetadata) => void;
}

export default function AwcProjectRepoUrlsEditor({
  projectId,
  initial,
  onSaved,
}: AwcProjectRepoUrlsEditorProps) {
  const copy = AWC_PROJECT_REPO_URLS_COPY;
  const [value, setValue] = useState<AwcProjectRepoUrlsFieldsValue>({
    repoUrls: initial.repoUrls.length > 0 ? [...initial.repoUrls] : [""],
    defaultBranch: initial.defaultBranch ?? "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (): Promise<void> => {
    const payload = buildRepoUrlsPayload(value);
    const urlsCheck = validateProjectRepoUrls(payload.repoUrls);
    if (!urlsCheck.ok) {
      setErrorMessage(urlsCheck.error);
      setSuccessMessage(null);
      return;
    }
    const branchCheck = validateDefaultBranch(payload.defaultBranch);
    if (!branchCheck.ok) {
      setErrorMessage(branchCheck.error);
      setSuccessMessage(null);
      return;
    }

    setIsSaving(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    try {
      const result = await mutateProjectRepoUrls({
        projectId,
        repoUrls: urlsCheck.repoUrls,
        defaultBranch: branchCheck.defaultBranch,
      });
      if (!result.ok) {
        setErrorMessage(result.errorMessage);
        return;
      }
      setSuccessMessage(copy.saved);
      setValue({
        repoUrls:
          result.metadata.repoUrls.length > 0
            ? [...result.metadata.repoUrls]
            : [""],
        defaultBranch: result.metadata.defaultBranch ?? "",
      });
      onSaved?.(result.metadata);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-3">
      <AwcProjectRepoUrlsFields
        value={value}
        onChange={setValue}
        disabled={isSaving}
      />
      {errorMessage !== null ? (
        <p className="text-sm text-error-600 dark:text-error-400">
          {errorMessage}
        </p>
      ) : null}
      {successMessage !== null ? (
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {successMessage}
        </p>
      ) : null}
      <Button
        disabled={isSaving}
        onClick={() => {
          void handleSave();
        }}
      >
        {isSaving ? copy.saving : copy.save}
      </Button>
    </div>
  );
}

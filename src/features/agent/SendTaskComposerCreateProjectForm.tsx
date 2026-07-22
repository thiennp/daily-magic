"use client";

import { useState } from "react";

import Button from "@/components/ui/button/Button";
import { createUserProjectFromComposer } from "@/features/agent/utils/createUserProjectFromComposer";
import buildDefaultProjectFolderPath from "@/lib/projects/buildDefaultProjectFolderPath";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

interface SendTaskComposerCreateProjectFormProps {
  readonly deviceId: string;
  readonly onProjectCreated: (project: UserProjectRecord) => void;
  readonly onSelect: (project: UserProjectRecord) => void;
}

export default function SendTaskComposerCreateProjectForm({
  deviceId,
  onProjectCreated,
  onSelect,
}: SendTaskComposerCreateProjectFormProps) {
  const [name, setName] = useState("");
  const [folderPath, setFolderPath] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleCreateProject = async (): Promise<void> => {
    if (name.trim().length === 0) {
      setErrorMessage("Enter a project name.");
      return;
    }

    setIsSaving(true);
    setErrorMessage(null);

    try {
      const result = await createUserProjectFromComposer({
        name,
        folderPath,
        deviceId,
      });

      if (!result.ok) {
        setErrorMessage(result.errorMessage);
        return;
      }

      onProjectCreated(result.project);
      onSelect(result.project);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mt-5 rounded-xl border border-dashed border-gray-200 p-4 dark:border-gray-800">
      <h3 className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
        Save a new project
      </h3>
      <label className="mt-3 block text-sm font-medium text-gray-800 dark:text-white/90">
        Name
        <input
          type="text"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
          className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800"
        />
      </label>
      <label className="mt-3 block text-sm font-medium text-gray-800 dark:text-white/90">
        Folder path (optional, cannot be changed later)
        <input
          type="text"
          value={folderPath}
          placeholder={buildDefaultProjectFolderPath(name || "my-project")}
          onChange={(event) => {
            setFolderPath(event.target.value);
          }}
          className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800"
        />
      </label>
      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        RAG and memory for this project are stored under{" "}
        <code className="text-[11px]">.agent-witch/</code> inside the folder.
      </p>
      {errorMessage !== null ? (
        <p className="mt-2 text-sm text-error-600 dark:text-error-400">
          {errorMessage}
        </p>
      ) : null}
      <div className="mt-3">
        <Button
          disabled={isSaving}
          onClick={() => {
            void handleCreateProject();
          }}
        >
          {isSaving ? "Saving…" : "Save project"}
        </Button>
      </div>
    </div>
  );
}

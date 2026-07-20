"use client";

import { useState } from "react";

import Button from "@/components/ui/button/Button";
import {
  readCreatedProject,
  readProjectErrorMessage,
} from "@/features/agent/utils/readProjectApiResponse";
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
    const trimmedName = name.trim();

    if (trimmedName.length === 0) {
      setErrorMessage("Enter a project name.");
      return;
    }

    setIsSaving(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          folderPath:
            folderPath.trim().length > 0
              ? folderPath.trim()
              : buildDefaultProjectFolderPath(trimmedName),
          deviceId: deviceId.length > 0 ? deviceId : null,
        }),
      });
      const data: unknown = await response.json();

      if (!response.ok) {
        setErrorMessage(readProjectErrorMessage(data));
        return;
      }

      const project = readCreatedProject(data);

      if (project !== null) {
        onProjectCreated(project);
        onSelect(project);
      }
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
        Folder path (optional)
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

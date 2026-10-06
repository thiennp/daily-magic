"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

import Button from "@/components/ui/button/Button";
import SendTaskComposerCreateProjectFields from "@/features/agent/SendTaskComposerCreateProjectFields";
import { createComposerProjectFromFormFields } from "@/features/agent/utils/createComposerProjectFromFormFields";
import AwcProjectRepoUrlsFields, {
  type AwcProjectRepoUrlsFieldsValue,
} from "@/features/projects/repoUrls/AwcProjectRepoUrlsFields";
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
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [folderPath, setFolderPath] = useState("");
  const [repoFields, setRepoFields] = useState<AwcProjectRepoUrlsFieldsValue>({
    repoUrls: [""],
    defaultBranch: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const defaultFolderPlaceholder =
    session?.user?.email !== undefined
      ? buildDefaultProjectFolderPath(name || "my-project", session.user.email)
      : "~/.agent-witch/profiles/<account>/projects/my-project";

  const handleCreateProject = async (): Promise<void> => {
    setIsSaving(true);
    setErrorMessage(null);
    try {
      const result = await createComposerProjectFromFormFields({
        name,
        folderPath,
        deviceId,
        repoFields,
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
      <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
        Save a new project
      </p>
      <SendTaskComposerCreateProjectFields
        name={name}
        folderPath={folderPath}
        defaultFolderPlaceholder={defaultFolderPlaceholder}
        onNameChange={(event) => {
          setName(event.target.value);
        }}
        onFolderPathChange={(event) => {
          setFolderPath(event.target.value);
        }}
      />
      <div className="mt-4 border-t border-gray-100 pt-4 dark:border-gray-800">
        <AwcProjectRepoUrlsFields
          value={repoFields}
          onChange={setRepoFields}
          disabled={isSaving}
        />
      </div>
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

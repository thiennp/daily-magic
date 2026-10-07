import type { ChangeEventHandler } from "react";

import { CREATE_PROJECT_FOLDER_HINT } from "@/features/agent/utils/createComposerProjectFromFormFields";

interface SendTaskComposerCreateProjectFieldsProps {
  readonly name: string;
  readonly folderPath: string;
  readonly defaultFolderPlaceholder: string;
  readonly onNameChange: ChangeEventHandler<HTMLInputElement>;
  readonly onFolderPathChange: ChangeEventHandler<HTMLInputElement>;
}

export default function SendTaskComposerCreateProjectFields({
  name,
  folderPath,
  defaultFolderPlaceholder,
  onNameChange,
  onFolderPathChange,
}: SendTaskComposerCreateProjectFieldsProps) {
  return (
    <>
      <label className="mt-3 block text-sm font-medium text-awc-fg dark:text-white/90">
        Name
        <input
          type="text"
          value={name}
          onChange={onNameChange}
          className="mt-2 w-full rounded-lg border border-awc-border bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800"
        />
      </label>
      <label className="mt-3 block text-sm font-medium text-awc-fg dark:text-white/90">
        Folder path (optional)
        <input
          type="text"
          value={folderPath}
          placeholder={defaultFolderPlaceholder}
          onChange={onFolderPathChange}
          className="mt-2 w-full rounded-lg border border-awc-border bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800"
        />
      </label>
      <p className="mt-2 text-xs text-awc-fg-muted dark:text-gray-400">
        {CREATE_PROJECT_FOLDER_HINT}{" "}
        <code className="text-[11px]">.agent-witch/</code> inside the folder.
      </p>
    </>
  );
}

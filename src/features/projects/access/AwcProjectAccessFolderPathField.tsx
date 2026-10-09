"use client";

import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";
import { useFolderBrowse } from "@/features/projects/access/hooks/useFolderBrowse";
import { PROJECT_PAGE_RESOURCES_COPY as C } from "@/features/projects/resources/projectPageResourcesCopy.constant";

interface Props {
  readonly id: string;
  readonly helpId: string;
  readonly className: string;
  readonly folderPath: string;
  /** Local bridge port of the selected online computer; null = type the path. */
  readonly wakePort: number | null | undefined;
  readonly onFolderPath: (value: string) => void;
}

/** Folder path input; clicking it empty (or Browse…) opens the computer's native picker. */
export default function AwcProjectAccessFolderPathField({
  id,
  helpId,
  className,
  folderPath,
  wakePort,
  onFolderPath,
}: Props) {
  const copy = AWC_PROJECT_ACCESS_COPY;
  const { picking, canBrowse, browse } = useFolderBrowse({
    wakePort,
    onPicked: onFolderPath,
  });
  return (
    <div className="min-w-0 flex-1">
      <label
        className="block text-xs text-awc-fg-muted dark:text-gray-400"
        htmlFor={id}
      >
        {copy.folderPathLabel}
        <input
          id={id}
          className={className}
          placeholder={copy.folderPathPlaceholder}
          value={folderPath}
          aria-describedby={helpId}
          onChange={(event) => onFolderPath(event.target.value)}
          onClick={() => {
            if (folderPath.trim() === "") void browse();
          }}
        />
      </label>
      {canBrowse ? (
        <button
          type="button"
          className="mt-1 text-xs underline disabled:opacity-50"
          disabled={picking}
          onClick={() => void browse()}
        >
          {picking ? C.foldersBrowsing : C.foldersBrowse}
        </button>
      ) : null}
      <span
        id={helpId}
        className="mt-0.5 block text-[11px] text-awc-fg-muted dark:text-gray-400"
      >
        {copy.folderPathHelp}
      </span>
    </div>
  );
}

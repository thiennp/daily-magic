"use client";

import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";
import { AWC_PROJECT_ACCESS_CTA } from "@/features/projects/access/awcProjectAccessCta.constant";

interface AwcProjectAccessMemberRenameControlsProps {
  readonly editing: boolean;
  readonly editValue: string;
  readonly onEditValue: (value: string) => void;
  readonly onStartEdit: () => void;
  readonly onSaveRename: () => void;
  readonly onCancelEdit: () => void;
}

export default function AwcProjectAccessMemberRenameControls({
  editing,
  editValue,
  onEditValue,
  onStartEdit,
  onSaveRename,
  onCancelEdit,
}: AwcProjectAccessMemberRenameControlsProps) {
  const copy = AWC_PROJECT_ACCESS_COPY;
  if (!editing) {
    return (
      <button
        type="button"
        className={AWC_PROJECT_ACCESS_CTA.secondary}
        onClick={onStartEdit}
      >
        {copy.rename}
      </button>
    );
  }
  return (
    <span className="flex flex-col gap-1">
      <span className="flex flex-wrap items-center gap-2">
        <input
          className="rounded-md border px-1 text-xs"
          value={editValue}
          aria-label={copy.displayNameLabel}
          onChange={(event) => onEditValue(event.target.value)}
        />
        <button
          type="button"
          className={AWC_PROJECT_ACCESS_CTA.primary}
          onClick={onSaveRename}
        >
          {copy.renameSave}
        </button>
        <button
          type="button"
          className={AWC_PROJECT_ACCESS_CTA.secondary}
          onClick={onCancelEdit}
        >
          {copy.renameCancel}
        </button>
      </span>
      <span className="text-[11px] text-awc-fg-muted">{copy.renameHint}</span>
    </span>
  );
}

"use client";

import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";
import { AWC_PROJECT_ACCESS_CTA } from "@/features/projects/access/awcProjectAccessCta.constant";

interface AwcProjectAccessMemberRenameEditorProps {
  readonly editValue: string;
  readonly onEditValue: (value: string) => void;
  readonly onSaveRename: () => void;
  readonly onCancelEdit: () => void;
}

export default function AwcProjectAccessMemberRenameEditor({
  editValue,
  onEditValue,
  onSaveRename,
  onCancelEdit,
}: AwcProjectAccessMemberRenameEditorProps) {
  const copy = AWC_PROJECT_ACCESS_COPY;
  return (
    <span className="flex flex-col gap-1">
      <span className="flex flex-wrap items-center gap-2">
        <input
          className="rounded-md border px-1 text-xs"
          value={editValue}
          aria-label={copy.displayNameLabel}
          onChange={(e) => onEditValue(e.target.value)}
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
      <span className="text-[11px] text-gray-500">{copy.renameHint}</span>
    </span>
  );
}

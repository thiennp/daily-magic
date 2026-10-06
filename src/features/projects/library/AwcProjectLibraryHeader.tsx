"use client";

import AwcProjectLibraryOwnerActions from "@/features/projects/library/AwcProjectLibraryOwnerActions";

interface AwcProjectLibraryHeaderProps {
  readonly canEdit: boolean;
  readonly canCreateSkill: boolean;
  readonly onNewSkill: () => void;
  readonly onAddFrom: () => void;
}

/**
 * New / Add from (owner-only; disabled-with-reason else). V5-3: heading +
 * intro live in the tab panel subtitle (`AwcProjectTabPanelIntro`).
 */
export default function AwcProjectLibraryHeader({
  canEdit,
  canCreateSkill,
  onNewSkill,
  onAddFrom,
}: AwcProjectLibraryHeaderProps) {
  return (
    <header className="flex flex-wrap items-start justify-end gap-3 px-1">
      <AwcProjectLibraryOwnerActions
        canEdit={canEdit}
        canCreateSkill={canCreateSkill}
        onNewSkill={onNewSkill}
        onAddFrom={onAddFrom}
      />
    </header>
  );
}

"use client";

import AwcProjectLibraryOwnerActions from "@/features/projects/library/AwcProjectLibraryOwnerActions";

interface AwcProjectLibraryHeaderProps {
  readonly canEdit: boolean;
  readonly canCreateSkill: boolean;
  readonly showActions: boolean;
  readonly onNewSkill: () => void;
  readonly onAddFrom: () => void;
}

/**
 * HN-H3: New / Add from only when the library has items (empty card owns CTAs).
 * Heading + intro live in the tab panel subtitle (`AwcProjectTabPanelIntro`).
 */
export default function AwcProjectLibraryHeader({
  canEdit,
  canCreateSkill,
  showActions,
  onNewSkill,
  onAddFrom,
}: AwcProjectLibraryHeaderProps) {
  if (!showActions) {
    return null;
  }
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

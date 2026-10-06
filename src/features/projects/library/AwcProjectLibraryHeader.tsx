"use client";

import AwcProjectLibraryOwnerActions from "@/features/projects/library/AwcProjectLibraryOwnerActions";
import { PROJECT_PAGE_LIBRARY_COPY as C } from "@/features/projects/library/projectPageLibraryCopy.constant";
import {
  PANEL_HEADING_CLASS,
  PANEL_INTRO_CLASS,
} from "@/features/projects/projectPagePanelChrome.constant";

interface AwcProjectLibraryHeaderProps {
  readonly canEdit: boolean;
  readonly canCreateSkill: boolean;
  readonly onNewSkill: () => void;
  readonly onAddFrom: () => void;
}

/** Heading + intro + New / Add from (owner-only; disabled-with-reason else). */
export default function AwcProjectLibraryHeader({
  canEdit,
  canCreateSkill,
  onNewSkill,
  onAddFrom,
}: AwcProjectLibraryHeaderProps) {
  return (
    <header className="flex flex-wrap items-start justify-between gap-3 px-1">
      <div className="min-w-0 space-y-0.5">
        <h3 className={PANEL_HEADING_CLASS}>{C["library.heading"]}</h3>
        <p className={PANEL_INTRO_CLASS}>{C["library.intro"]}</p>
      </div>
      <AwcProjectLibraryOwnerActions
        canEdit={canEdit}
        canCreateSkill={canCreateSkill}
        onNewSkill={onNewSkill}
        onAddFrom={onAddFrom}
      />
    </header>
  );
}

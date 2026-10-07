"use client";

import { AWC_PROJECT_LEAVE_COPY } from "@/features/projects/awcProjectLeaveCopy.constant";
import {
  PROJECTS_V5_DIVIDER_CLASS,
  PROJECTS_V5_MENU_ITEM_DANGER_CLASS,
} from "@/features/projects/projectsPageV5Classes.constant";

interface AwcProjectLeaveMenuItemProps {
  readonly onRequestConfirm: () => void;
}

/** Danger menu row for invitees — confirm modal mounts outside the dropdown. */
const AwcProjectLeaveMenuItem = ({
  onRequestConfirm,
}: AwcProjectLeaveMenuItemProps) => {
  return (
    <li role="none" className={`mt-1 pt-1 ${PROJECTS_V5_DIVIDER_CLASS}`}>
      <button
        type="button"
        role="menuitem"
        className={PROJECTS_V5_MENU_ITEM_DANGER_CLASS}
        onClick={onRequestConfirm}
      >
        {AWC_PROJECT_LEAVE_COPY.trigger}
      </button>
    </li>
  );
};

export default AwcProjectLeaveMenuItem;

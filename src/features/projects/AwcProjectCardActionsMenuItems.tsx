import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import AwcProjectDeleteMenuItem from "@/features/projects/AwcProjectDeleteMenuItem";
import AwcProjectLeaveMenuItem from "@/features/projects/AwcProjectLeaveMenuItem";
import AwcProjectsMenuDisabledItem from "@/features/projects/AwcProjectsMenuDisabledItem";
import { PROJECTS_V5_MENU_ITEM_CLASS as MENU_ITEM_CLASS } from "@/features/projects/projectsPageV5Classes.constant";
import buildAwcProjectDetailHref from "@/lib/projects/buildAwcProjectDetailHref";
import type { ProjectEditOnMacCta } from "@/features/projects/utils/resolveProjectEditOnMacCta";

interface AwcProjectCardActionsMenuItemsProps {
  readonly projectId: string;
  readonly isDefaultProject: boolean;
  readonly canDelete: boolean;
  readonly canLeave: boolean;
  readonly assignTasksHref: string;
  readonly editCta: ProjectEditOnMacCta;
  readonly editHelperId: string | undefined;
  readonly onClose: () => void;
  readonly onRequestDelete: () => void;
  readonly onRequestLeave: () => void;
}

export default function AwcProjectCardActionsMenuItems({
  projectId,
  isDefaultProject,
  canDelete,
  canLeave,
  assignTasksHref,
  editCta,
  editHelperId,
  onClose,
  onRequestDelete,
  onRequestLeave,
}: AwcProjectCardActionsMenuItemsProps) {
  return (
    <>
      <li role="none">
        <DropdownItem
          tag="a"
          href={`/projects/${projectId}`}
          baseClassName={MENU_ITEM_CLASS}
          onItemClick={onClose}
        >
          View details
        </DropdownItem>
      </li>
      <li role="none">
        <DropdownItem
          tag="a"
          href={buildAwcProjectDetailHref(projectId, "rename")}
          baseClassName={MENU_ITEM_CLASS}
          onItemClick={onClose}
        >
          Rename
        </DropdownItem>
      </li>
      <li role="none">
        <DropdownItem
          tag="a"
          href={assignTasksHref}
          baseClassName={MENU_ITEM_CLASS}
          onItemClick={onClose}
        >
          Assign tasks
        </DropdownItem>
      </li>
      {editCta.href !== null ? (
        <li role="none">
          <a
            role="menuitem"
            href={editCta.href}
            target="_blank"
            rel="noopener noreferrer"
            className={MENU_ITEM_CLASS}
            onClick={onClose}
          >
            Edit on Mac
          </a>
        </li>
      ) : (
        <AwcProjectsMenuDisabledItem
          label="Edit on Mac"
          reason={editCta.helperText}
          fallbackDescribedById={editHelperId}
        />
      )}
      {canDelete && !isDefaultProject ? (
        <AwcProjectDeleteMenuItem
          onRequestConfirm={() => {
            onClose();
            onRequestDelete();
          }}
        />
      ) : null}
      {canLeave && !isDefaultProject ? (
        <AwcProjectLeaveMenuItem
          onRequestConfirm={() => {
            onClose();
            onRequestLeave();
          }}
        />
      ) : null}
    </>
  );
}

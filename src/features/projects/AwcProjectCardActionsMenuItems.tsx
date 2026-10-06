import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import AwcProjectDeleteMenuItem from "@/features/projects/AwcProjectDeleteMenuItem";
import AwcProjectsMenuDisabledItem from "@/features/projects/AwcProjectsMenuDisabledItem";
import { PROJECTS_V5_MENU_ITEM_CLASS as MENU_ITEM_CLASS } from "@/features/projects/projectsPageV5Classes.constant";
import buildAwcProjectDetailHref from "@/lib/projects/buildAwcProjectDetailHref";
import type { ProjectEditOnMacCta } from "@/features/projects/utils/resolveProjectEditOnMacCta";

interface AwcProjectCardActionsMenuItemsProps {
  readonly projectId: string;
  readonly projectName: string;
  readonly isDefaultProject: boolean;
  readonly canDelete: boolean;
  readonly assignTasksHref: string;
  readonly editCta: ProjectEditOnMacCta;
  readonly editHelperId: string | undefined;
  readonly onClose: () => void;
  readonly onProjectDeleted?: () => void;
}

export default function AwcProjectCardActionsMenuItems({
  projectId,
  projectName,
  isDefaultProject,
  canDelete,
  assignTasksHref,
  editCta,
  editHelperId,
  onClose,
  onProjectDeleted,
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
          projectId={projectId}
          projectName={projectName}
          onDeleted={() => {
            onClose();
            onProjectDeleted?.();
          }}
        />
      ) : null}
    </>
  );
}

import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import AwcProjectDeleteMenuItem from "@/features/projects/AwcProjectDeleteMenuItem";
import AwcProjectLeaveMenuItem from "@/features/projects/AwcProjectLeaveMenuItem";
import AwcProjectsMenuNote from "@/features/projects/AwcProjectsMenuNote";
import AwcProjectsMenuDisabledItem from "@/features/projects/AwcProjectsMenuDisabledItem";
import { PROJECTS_V5_MENU_ITEM_CLASS as MENU_ITEM_CLASS } from "@/features/projects/projectsPageV5Classes.constant";
import buildAwcProjectDetailHref from "@/lib/projects/buildAwcProjectDetailHref";
import type { ProjectEditOnMacCta } from "@/features/projects/utils/resolveProjectEditOnMacCta";
import resolveProjectEditOnMacLinkProps from "@/features/projects/utils/resolveProjectEditOnMacLinkProps";

interface AwcProjectCardActionsMenuItemsProps {
  readonly projectId: string;
  readonly isDefaultProject: boolean;
  readonly canDelete: boolean;
  readonly canLeave: boolean;
  /** Null for a viewer, who cannot assign tasks. */
  readonly assignTasksHref: string | null;
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
      {canDelete ? (
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
      ) : null}
      {assignTasksHref !== null ? (
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
      ) : null}
      {editCta.href !== null ? (
        <li role="none">
          <a
            role="menuitem"
            href={editCta.href}
            {...resolveProjectEditOnMacLinkProps(editCta.href)}
            className={MENU_ITEM_CLASS}
            onClick={onClose}
          >
            Edit on this computer
          </a>
        </li>
      ) : (
        <AwcProjectsMenuDisabledItem
          label="Edit on this computer"
          reason={editCta.helperText}
          fallbackDescribedById={editHelperId}
        />
      )}
      {canDelete ? (
        <AwcProjectDeleteMenuItem
          onRequestConfirm={() => {
            onClose();
            onRequestDelete();
          }}
        />
      ) : null}
      {canLeave ? <AwcProjectsMenuNote /> : null}
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

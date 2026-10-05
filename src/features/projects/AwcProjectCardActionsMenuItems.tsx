import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import AwcProjectDeleteMenuItem from "@/features/projects/AwcProjectDeleteMenuItem";
import buildAwcProjectDetailHref from "@/lib/projects/buildAwcProjectDetailHref";
import type { ProjectEditOnMacCta } from "@/features/projects/utils/resolveProjectEditOnMacCta";

const MENU_ITEM_CLASS =
  "block min-h-11 w-full px-3 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5 sm:min-h-0 sm:py-2";

const MENU_ITEM_DISABLED_CLASS =
  "block w-full cursor-not-allowed px-3 py-2 text-left text-sm text-gray-400 dark:text-gray-500";

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
      <li role="none">
        {editCta.href !== null ? (
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
        ) : (
          <button
            type="button"
            role="menuitem"
            disabled
            aria-describedby={editHelperId}
            className={MENU_ITEM_DISABLED_CLASS}
          >
            Edit on Mac
          </button>
        )}
      </li>
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

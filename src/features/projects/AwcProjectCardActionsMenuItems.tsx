import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import type { ProjectEditOnMacCta } from "@/features/projects/utils/resolveProjectEditOnMacCta";

const MENU_ITEM_CLASS =
  "block w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5";

const MENU_ITEM_DISABLED_CLASS =
  "block w-full cursor-not-allowed px-3 py-2 text-left text-sm text-gray-400 dark:text-gray-500";

interface AwcProjectCardActionsMenuItemsProps {
  readonly projectId: string;
  readonly assignTasksHref: string;
  readonly editCta: ProjectEditOnMacCta;
  readonly editHelperId: string | undefined;
  readonly onClose: () => void;
}

export default function AwcProjectCardActionsMenuItems({
  projectId,
  assignTasksHref,
  editCta,
  editHelperId,
  onClose,
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
            Edit
          </a>
        ) : (
          <button
            type="button"
            role="menuitem"
            disabled
            aria-describedby={editHelperId}
            className={MENU_ITEM_DISABLED_CLASS}
          >
            Edit
          </button>
        )}
      </li>
    </>
  );
}

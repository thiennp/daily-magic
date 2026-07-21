"use client";

import { ArrowUpIcon, PaperPlaneIcon, PencilIcon, TrashBinIcon } from "@/icons";
import { renderMacDeviceRowMenuItem } from "@/features/agent-witch/macDevices/utils/renderMacDeviceRowMenuItem";

interface MacDeviceRowMenuItemsProps {
  readonly closeMenu: () => void;
  readonly onEdit: () => void;
  readonly onUpdateLocal?: () => void;
  readonly onDeleteLocalScript?: () => void;
  readonly onDelegateTask?: () => void;
  readonly onOpenShell?: () => void;
  readonly onDelete?: () => void;
}

const runMenuAction = (
  closeMenu: () => void,
  action: () => void,
): (() => void) => {
  return () => {
    closeMenu();
    action();
  };
};

export default function MacDeviceRowMenuItems({
  closeMenu,
  onEdit,
  onUpdateLocal,
  onDeleteLocalScript,
  onDelegateTask,
  onOpenShell,
  onDelete,
}: MacDeviceRowMenuItemsProps) {
  return (
    <ul className="flex flex-col">
      {renderMacDeviceRowMenuItem(
        runMenuAction(closeMenu, onEdit),
        <PencilIcon className="h-4 w-4 shrink-0" />,
        "Edit",
      )}
      {onUpdateLocal
        ? renderMacDeviceRowMenuItem(
            runMenuAction(closeMenu, onUpdateLocal),
            <ArrowUpIcon className="h-4 w-4 shrink-0" />,
            "Update local",
          )
        : null}
      {onDeleteLocalScript
        ? renderMacDeviceRowMenuItem(
            runMenuAction(closeMenu, onDeleteLocalScript),
            <TrashBinIcon className="h-4 w-4 shrink-0" />,
            "Delete local script",
            true,
          )
        : null}
      {onOpenShell
        ? renderMacDeviceRowMenuItem(
            runMenuAction(closeMenu, onOpenShell),
            <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center text-[10px] font-semibold">
              &gt;_
            </span>,
            "Open Mac shell",
          )
        : null}
      {onDelegateTask
        ? renderMacDeviceRowMenuItem(
            runMenuAction(closeMenu, onDelegateTask),
            <PaperPlaneIcon className="h-4 w-4 shrink-0" />,
            "Delegate task",
          )
        : null}
      {onDelete
        ? renderMacDeviceRowMenuItem(
            runMenuAction(closeMenu, onDelete),
            <TrashBinIcon className="h-4 w-4 shrink-0" />,
            "Delete",
            true,
          )
        : null}
    </ul>
  );
}

"use client";

import { PaperPlaneIcon, PencilIcon, TrashBinIcon } from "@/icons";
import MacDeviceRowLocalMenuItems from "@/features/agent-witch/macDevices/MacDeviceRowLocalMenuItems";
import MacDeviceRowThisMacMenuSection from "@/features/agent-witch/macDevices/MacDeviceRowThisMacMenuSection";
import { renderMacDeviceRowMenuItem } from "@/features/agent-witch/macDevices/utils/renderMacDeviceRowMenuItem";
import { runMacDeviceRowMenuAction } from "@/features/agent-witch/macDevices/utils/runMacDeviceRowMenuAction";

interface MacDeviceRowMenuItemsProps {
  readonly closeMenu: () => void;
  readonly onEdit: () => void;
  readonly showThisMacSubmenu?: boolean;
  readonly onUpdateLocal?: () => void;
  readonly onDeleteLocalScript?: () => void;
  readonly onSeeLocalLog?: () => void;
  readonly onDelegateTask?: () => void;
  readonly onOpenShell?: () => void;
  readonly onDelete?: () => void;
}

export default function MacDeviceRowMenuItems({
  closeMenu,
  onEdit,
  showThisMacSubmenu = false,
  onUpdateLocal,
  onDeleteLocalScript,
  onSeeLocalLog,
  onDelegateTask,
  onOpenShell,
  onDelete,
}: MacDeviceRowMenuItemsProps) {
  return (
    <ul className="flex flex-col">
      {renderMacDeviceRowMenuItem(
        runMacDeviceRowMenuAction(closeMenu, onEdit),
        <PencilIcon className="h-4 w-4 shrink-0" />,
        "Edit",
      )}
      {showThisMacSubmenu ? (
        <MacDeviceRowThisMacMenuSection
          closeMenu={closeMenu}
          onSeeLocalLog={onSeeLocalLog}
          onUpdateLocal={onUpdateLocal}
          onDeleteLocalScript={onDeleteLocalScript}
        />
      ) : (
        <MacDeviceRowLocalMenuItems
          closeMenu={closeMenu}
          onSeeLocalLog={onSeeLocalLog}
          onUpdateLocal={onUpdateLocal}
          onDeleteLocalScript={onDeleteLocalScript}
        />
      )}
      {onOpenShell
        ? renderMacDeviceRowMenuItem(
            runMacDeviceRowMenuAction(closeMenu, onOpenShell),
            <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center text-[10px] font-semibold">
              &gt;_
            </span>,
            "Open Mac shell",
          )
        : null}
      {onDelegateTask
        ? renderMacDeviceRowMenuItem(
            runMacDeviceRowMenuAction(closeMenu, onDelegateTask),
            <PaperPlaneIcon className="h-4 w-4 shrink-0" />,
            "Delegate task",
          )
        : null}
      {onDelete
        ? renderMacDeviceRowMenuItem(
            runMacDeviceRowMenuAction(closeMenu, onDelete),
            <TrashBinIcon className="h-4 w-4 shrink-0" />,
            "Delete",
            true,
          )
        : null}
    </ul>
  );
}

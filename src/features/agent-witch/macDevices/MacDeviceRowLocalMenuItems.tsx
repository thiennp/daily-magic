"use client";

import AppIcon from "@/components/ui/icon/AppIcon";
import { ArrowUpIcon, TrashBinIcon } from "@/icons";
import { renderMacDeviceRowMenuItem } from "@/features/agent-witch/macDevices/utils/renderMacDeviceRowMenuItem";
import { runMacDeviceRowMenuAction } from "@/features/agent-witch/macDevices/utils/runMacDeviceRowMenuAction";

interface MacDeviceRowLocalMenuItemsProps {
  readonly closeMenu: () => void;
  readonly onSeeLocalLog?: () => void;
  readonly onUpdateLocal?: () => void;
  readonly onDeleteLocalScript?: () => void;
}

/** Flat fallback for rows that are not the computer in front of the user. */
export default function MacDeviceRowLocalMenuItems({
  closeMenu,
  onSeeLocalLog,
  onUpdateLocal,
  onDeleteLocalScript,
}: MacDeviceRowLocalMenuItemsProps) {
  return (
    <>
      {onSeeLocalLog
        ? renderMacDeviceRowMenuItem(
            runMacDeviceRowMenuAction(closeMenu, onSeeLocalLog),
            <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center text-[10px] font-semibold">
              []
            </span>,
            "See local log",
          )
        : null}
      {onUpdateLocal
        ? renderMacDeviceRowMenuItem(
            runMacDeviceRowMenuAction(closeMenu, onUpdateLocal),
            <AppIcon icon={ArrowUpIcon} size="sm" />,
            "Update",
          )
        : null}
      {onDeleteLocalScript
        ? renderMacDeviceRowMenuItem(
            runMacDeviceRowMenuAction(closeMenu, onDeleteLocalScript),
            <AppIcon icon={TrashBinIcon} size="sm" />,
            "Delete local script",
            true,
          )
        : null}
    </>
  );
}

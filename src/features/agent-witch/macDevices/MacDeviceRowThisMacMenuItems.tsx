"use client";

import Link from "next/link";

import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import {
  MAC_DEVICE_DOWNLOAD_MAC_APP_MENU_LABEL,
  MAC_DEVICE_LOCAL_LOG_MENU_LABEL,
  MAC_DEVICE_LOCAL_STATUS_MENU_LABEL,
} from "@/features/agent-witch/macDevices/macDeviceRowMenuCopy.constant";
import { AWL_REPAIR_MANUALLY_COPY } from "@/features/agent-witch/macDevices/repairManually/awlRepairManuallyCopy.constant";
import { renderMacDeviceRowMenuItem } from "@/features/agent-witch/macDevices/utils/renderMacDeviceRowMenuItem";
import { runMacDeviceRowMenuAction } from "@/features/agent-witch/macDevices/utils/runMacDeviceRowMenuAction";
import AppIcon from "@/components/ui/icon/AppIcon";
import { ArrowUpIcon, TrashBinIcon } from "@/icons";

interface MacDeviceRowThisMacMenuItemsProps {
  readonly closeMenu: () => void;
  readonly openLocalStatus: () => void;
  readonly openRepairManually: () => void;
  readonly onSeeLocalLog?: () => void;
  readonly onUpdateLocal?: () => void;
  readonly onDeleteLocalScript?: () => void;
}

const nestedItemClassName =
  "flex w-full items-center gap-2 py-2 pl-9 pr-3 text-sm text-awc-fg hover:bg-awc-tile dark:text-gray-300 dark:hover:bg-white/5";

export default function MacDeviceRowThisMacMenuItems({
  closeMenu,
  openLocalStatus,
  openRepairManually,
  onSeeLocalLog,
  onUpdateLocal,
  onDeleteLocalScript,
}: MacDeviceRowThisMacMenuItemsProps) {
  return (
    <ul className="flex flex-col pb-1">
      <li>
        <DropdownItem
          onClick={runMacDeviceRowMenuAction(closeMenu, openLocalStatus)}
          baseClassName={nestedItemClassName}
        >
          <span>{MAC_DEVICE_LOCAL_STATUS_MENU_LABEL}</span>
        </DropdownItem>
      </li>
      <li>
        <Link
          href="/download"
          className={nestedItemClassName}
          onClick={closeMenu}
        >
          {MAC_DEVICE_DOWNLOAD_MAC_APP_MENU_LABEL}
        </Link>
      </li>
      {onSeeLocalLog
        ? renderMacDeviceRowMenuItem(
            runMacDeviceRowMenuAction(closeMenu, onSeeLocalLog),
            <span className="inline-flex h-4 w-4 shrink-0" />,
            MAC_DEVICE_LOCAL_LOG_MENU_LABEL,
            false,
            true,
          )
        : null}
      {onUpdateLocal
        ? renderMacDeviceRowMenuItem(
            runMacDeviceRowMenuAction(closeMenu, onUpdateLocal),
            <AppIcon icon={ArrowUpIcon} size="sm" />,
            "Update",
            false,
            true,
          )
        : null}
      {renderMacDeviceRowMenuItem(
        runMacDeviceRowMenuAction(closeMenu, openRepairManually),
        <span className="inline-flex h-4 w-4 shrink-0" />,
        AWL_REPAIR_MANUALLY_COPY.title,
        false,
        true,
      )}
      {onDeleteLocalScript
        ? renderMacDeviceRowMenuItem(
            runMacDeviceRowMenuAction(closeMenu, onDeleteLocalScript),
            <AppIcon icon={TrashBinIcon} size="sm" />,
            "Remove from this computer",
            true,
            true,
          )
        : null}
    </ul>
  );
}

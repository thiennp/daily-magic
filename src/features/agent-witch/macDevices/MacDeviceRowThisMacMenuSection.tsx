"use client";

import { useState } from "react";

import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import {
  MAC_DEVICE_LOCAL_LOG_MENU_LABEL,
  MAC_DEVICE_LOCAL_STATUS_MENU_LABEL,
  MAC_DEVICE_ROW_THIS_MAC_SUBMENU_LABEL,
} from "@/features/agent-witch/macDevices/macDeviceRowMenuCopy.constant";
import { openAgentWitchLocalConsole } from "@/features/agent-witch/macDevices/openAgentWitchLocalConsole";
import { renderMacDeviceRowMenuItem } from "@/features/agent-witch/macDevices/utils/renderMacDeviceRowMenuItem";
import { runMacDeviceRowMenuAction } from "@/features/agent-witch/macDevices/utils/runMacDeviceRowMenuAction";
import { ArrowUpIcon, ChevronDownIcon, TrashBinIcon } from "@/icons";

interface MacDeviceRowThisMacMenuSectionProps {
  readonly closeMenu: () => void;
  readonly onSeeLocalLog?: () => void;
  readonly onUpdateLocal?: () => void;
  readonly onDeleteLocalScript?: () => void;
}

const nestedItemClassName =
  "flex w-full items-center gap-2 py-2 pl-9 pr-3 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5";

export default function MacDeviceRowThisMacMenuSection({
  closeMenu,
  onSeeLocalLog,
  onUpdateLocal,
  onDeleteLocalScript,
}: MacDeviceRowThisMacMenuSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <li className="border-t border-gray-100 dark:border-gray-800">
      <DropdownItem
        onClick={() => {
          setIsExpanded((current) => !current);
        }}
        baseClassName="flex w-full items-center gap-2 px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100 dark:text-white/90 dark:hover:bg-white/5"
      >
        <ChevronDownIcon
          className={`h-4 w-4 shrink-0 transition-transform ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
        <span>{MAC_DEVICE_ROW_THIS_MAC_SUBMENU_LABEL}</span>
      </DropdownItem>
      {isExpanded ? (
        <ul className="flex flex-col pb-1">
          <li>
            <DropdownItem
              onClick={runMacDeviceRowMenuAction(
                closeMenu,
                openAgentWitchLocalConsole,
              )}
              baseClassName={nestedItemClassName}
            >
              <span>{MAC_DEVICE_LOCAL_STATUS_MENU_LABEL}</span>
            </DropdownItem>
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
                <ArrowUpIcon className="h-4 w-4 shrink-0" />,
                "Update Agent Witch",
                false,
                true,
              )
            : null}
          {onDeleteLocalScript
            ? renderMacDeviceRowMenuItem(
                runMacDeviceRowMenuAction(closeMenu, onDeleteLocalScript),
                <TrashBinIcon className="h-4 w-4 shrink-0" />,
                "Remove from this Mac",
                true,
                true,
              )
            : null}
        </ul>
      ) : null}
    </li>
  );
}

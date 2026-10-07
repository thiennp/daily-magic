"use client";

import { useState } from "react";

import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import { MAC_DEVICE_ROW_THIS_MAC_SUBMENU_LABEL } from "@/features/agent-witch/macDevices/macDeviceRowMenuCopy.constant";
import MacDeviceRowThisMacMenuItems from "@/features/agent-witch/macDevices/MacDeviceRowThisMacMenuItems";
import AwlRepairManuallyModal from "@/features/agent-witch/macDevices/repairManually/AwlRepairManuallyModal";
import ReviveAwlMacModal from "@/features/agent-witch/macDevices/ReviveAwlMacModal";
import { openAgentWitchLocalStatus } from "@/features/agent-witch/macDevices/openAgentWitchLocalStatus";
import AppIcon from "@/components/ui/icon/AppIcon";
import { ChevronDownIcon } from "@/icons";

interface MacDeviceRowThisMacMenuSectionProps {
  readonly closeMenu: () => void;
  readonly onSeeLocalLog?: () => void;
  readonly onUpdateLocal?: () => void;
  readonly onDeleteLocalScript?: () => void;
}

export default function MacDeviceRowThisMacMenuSection({
  closeMenu,
  onSeeLocalLog,
  onUpdateLocal,
  onDeleteLocalScript,
}: MacDeviceRowThisMacMenuSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [reviveAwlOpen, setReviveAwlOpen] = useState(false);
  const [repairManuallyOpen, setRepairManuallyOpen] = useState(false);

  const openLocalStatus = (): void => {
    // Exact FIX-2: deep-link raises Mac; healthy H6 must not open Revive from :43347 miss.
    void openAgentWitchLocalStatus().then((result) => {
      if (result === "unavailable") {
        setReviveAwlOpen(true);
      }
    });
  };

  return (
    <li className="border-t border-awc-border dark:border-gray-800">
      <ReviveAwlMacModal
        isOpen={reviveAwlOpen}
        onClose={() => {
          setReviveAwlOpen(false);
        }}
      />
      <AwlRepairManuallyModal
        isOpen={repairManuallyOpen}
        onClose={() => {
          setRepairManuallyOpen(false);
        }}
      />
      <DropdownItem
        onClick={() => {
          setIsExpanded((current) => !current);
        }}
        baseClassName="flex w-full items-center gap-2 px-3 py-2 text-sm font-medium text-awc-fg hover:bg-awc-tile dark:text-white/90 dark:hover:bg-white/5"
      >
        <AppIcon
          icon={ChevronDownIcon}
          size="sm"
          iconClassName={`transition-transform ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
        <span>{MAC_DEVICE_ROW_THIS_MAC_SUBMENU_LABEL}</span>
      </DropdownItem>
      {isExpanded ? (
        <MacDeviceRowThisMacMenuItems
          closeMenu={closeMenu}
          openLocalStatus={openLocalStatus}
          openRepairManually={() => {
            setRepairManuallyOpen(true);
          }}
          onSeeLocalLog={onSeeLocalLog}
          onUpdateLocal={onUpdateLocal}
          onDeleteLocalScript={onDeleteLocalScript}
        />
      ) : null}
    </li>
  );
}

"use client";

import { useState } from "react";
import { createPortal } from "react-dom";

import AppIcon from "@/components/ui/icon/AppIcon";
import AwlRepairManuallyModal from "@/features/agent-witch/macDevices/repairManually/AwlRepairManuallyModal";
import { AWL_REPAIR_MANUALLY_COPY } from "@/features/agent-witch/macDevices/repairManually/awlRepairManuallyCopy.constant";
import { InfoIcon } from "@/icons";

/** (i) next to Needs update / too old: opens the Repair manually panel. */
export default function AwlRepairManuallyInfoButton() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        aria-label={AWL_REPAIR_MANUALLY_COPY.title}
        title={AWL_REPAIR_MANUALLY_COPY.title}
        data-testid="awl-repair-manually-open"
        className="inline-flex items-center align-middle text-current hover:opacity-80"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <AppIcon icon={InfoIcon} size="sm" />
      </button>
      {/* Portal: the (i) sits inside inline row text (<p> / <span>). */}
      {isOpen
        ? createPortal(
            <AwlRepairManuallyModal
              isOpen
              onClose={() => {
                setIsOpen(false);
              }}
            />,
            document.body,
          )
        : null}
    </>
  );
}

"use client";

import { useCallback, useState } from "react";

import { APP_SURFACE_CTA_SECONDARY_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import ReviveAwlMacModal from "@/features/agent-witch/macDevices/ReviveAwlMacModal";
import { openAgentWitchLocalStatus } from "@/features/agent-witch/macDevices/openAgentWitchLocalStatus";

interface HomeOpenLocalStatusButtonProps {
  readonly children: React.ReactNode;
  readonly className?: string;
}

export default function HomeOpenLocalStatusButton({
  children,
  className = APP_SURFACE_CTA_SECONDARY_CLASS,
}: HomeOpenLocalStatusButtonProps) {
  const [reviveOpen, setReviveOpen] = useState(false);
  const handleClick = useCallback(() => {
    void openAgentWitchLocalStatus().then((result) => {
      if (result === "unavailable") {
        setReviveOpen(true);
      }
    });
  }, []);

  return (
    <>
      <button type="button" className={className} onClick={handleClick}>
        {children}
      </button>
      <ReviveAwlMacModal
        isOpen={reviveOpen}
        onClose={() => {
          setReviveOpen(false);
        }}
      />
    </>
  );
}

"use client";

import { useMemo } from "react";

import { Modal } from "@/components/ui/modal";
import { APP_SURFACE_BODY_TEXT_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import CopyableBashCommand from "@/features/home/CopyableBashCommand";
import detectBrowserOperatingSystem from "@/features/home/utils/detectBrowserOperatingSystem";
import { buildAgentWitchReviveAwlSteps } from "@/lib/agentWitch/buildAgentWitchReviveAwlTerminalCommand";

interface ReviveAwlMacModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export default function ReviveAwlMacModal({
  isOpen,
  onClose,
}: ReviveAwlMacModalProps) {
  const steps = useMemo(
    () =>
      buildAgentWitchReviveAwlSteps({
        operatingSystem: detectBrowserOperatingSystem(),
      }),
    [],
  );
  const showLabels = steps.length > 1;

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-lg p-6">
      <h2 className="pr-10 text-lg font-semibold text-gray-900 dark:text-white/90">
        Revive AgentWitch Local
      </h2>
      <p className={`mt-3 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
        AgentWitch Local is not responding on{" "}
        <span className="font-mono text-sm">127.0.0.1:43347</span>. The cloud
        can still show this computer as online when the background client (AWI)
        and bridge (AWB) are running. Restart the AgentWitch client on this
        computer.
        {showLabels
          ? " Use the command for this computer's operating system."
          : null}
      </p>
      {steps.map((step) => (
        <div key={step.platform} className="mt-4">
          {showLabels ? (
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white/90">
              {step.label}
            </h3>
          ) : null}
          <p className={`mt-1 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
            {step.instructions}
          </p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {step.note}
          </p>
          <CopyableBashCommand command={step.command} variant="bash" />
        </div>
      ))}
    </Modal>
  );
}

"use client";

import { useMemo } from "react";

import { Modal } from "@/components/ui/modal";
import { APP_SURFACE_BODY_TEXT_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import CopyableBashCommand from "@/features/home/CopyableBashCommand";
import { buildAgentWitchReviveAwlTerminalCommand } from "@/lib/agentWitch/buildAgentWitchReviveAwlTerminalCommand";

interface ReviveAwlMacModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export default function ReviveAwlMacModal({
  isOpen,
  onClose,
}: ReviveAwlMacModalProps) {
  const command = useMemo(() => buildAgentWitchReviveAwlTerminalCommand(), []);

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-lg p-6">
      <h2 className="pr-10 text-lg font-semibold text-gray-900 dark:text-white/90">
        Revive Agent Witch Local
      </h2>
      <p className={`mt-3 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
        Agent Witch Local is not responding on{" "}
        <span className="font-mono text-sm">127.0.0.1:43347</span>. The cloud
        can still show your Mac as online when the background client (AWI) and
        bridge (AWB) are running. On this Mac, open Terminal, paste this
        command, and press Return.
      </p>
      <p className={`mt-2 text-sm text-gray-500 dark:text-gray-400`}>
        Paste and run the whole block so{" "}
        <span className="font-mono">AW_HOME</span> is set before{" "}
        <span className="font-mono">tail</span>. Ignore{" "}
        <span className="font-mono">com.agent-witch-live</span> unless you
        installed Live as a separate service.
      </p>
      <CopyableBashCommand command={command} variant="bash" />
    </Modal>
  );
}

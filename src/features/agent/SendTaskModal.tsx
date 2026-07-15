"use client";

import { Modal } from "@/components/ui/modal";
import WsTestPanel from "@/features/agent/WsTestPanel";

interface SendTaskModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export default function SendTaskModal({ isOpen, onClose }: SendTaskModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-h-[90vh] w-full max-w-4xl overflow-y-auto p-6"
    >
      <div className="pr-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white/90">
          Send a task
        </h2>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Dispatch to your Mac or a teammate. Every job is saved in Job history.
        </p>
      </div>
      <div className="mt-6">
        <WsTestPanel variant="modal" />
      </div>
    </Modal>
  );
}

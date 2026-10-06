"use client";

import { Modal } from "@/components/ui/modal";
import AwcAccessLogEventList from "@/features/projects/accessLog/AwcAccessLogEventList";
import AwcAccessLogFilterChips from "@/features/projects/accessLog/AwcAccessLogFilterChips";
import { ACCESS_LOG_COPY as C } from "@/features/projects/accessLog/accessLogCopy.constant";
import { useAwcAccessLog } from "@/features/projects/accessLog/hooks/useAwcAccessLog";

interface AwcAccessLogPanelProps {
  readonly projectId: string;
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

/** Access log modal — owner-only surface (rail already gates mount). */
export default function AwcAccessLogPanel({
  projectId,
  isOpen,
  onClose,
}: AwcAccessLogPanelProps) {
  const log = useAwcAccessLog(projectId, isOpen);
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="mx-4 max-h-[85vh] max-w-lg overflow-hidden p-5 sm:p-6"
    >
      <div className="pr-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {C.title}
        </h2>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{C.intro}</p>
        <div className="mt-4">
          <AwcAccessLogFilterChips
            category={log.category}
            onChange={log.setCategory}
          />
        </div>
        <div className="mt-4">
          <AwcAccessLogEventList log={log} />
        </div>
      </div>
    </Modal>
  );
}

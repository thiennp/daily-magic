"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { deleteAgentRunHistory } from "@/features/reports/utils/deleteAgentRunHistory";

interface AgentRunDetailDeleteButtonProps {
  readonly runId: string;
}

export default function AgentRunDetailDeleteButton({
  runId,
}: AgentRunDetailDeleteButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = (): void => {
    if (isDeleting) {
      return;
    }

    setIsDeleting(true);
    void deleteAgentRunHistory(runId)
      .then(() => {
        router.push("/reports");
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };

  return (
    <button
      type="button"
      disabled={isDeleting}
      onClick={handleDelete}
      className="text-sm font-medium text-gray-500 transition hover:text-error-600 disabled:opacity-50 dark:text-gray-400 dark:hover:text-error-400"
    >
      {isDeleting ? "Deleting…" : "Delete"}
    </button>
  );
}

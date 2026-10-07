"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import Button from "@/components/ui/button/Button";
import AwcProjectLeaveConfirmForm from "@/features/projects/AwcProjectLeaveConfirmForm";
import { AWC_PROJECT_LEAVE_COPY } from "@/features/projects/awcProjectLeaveCopy.constant";
import useLeaveProject from "@/features/projects/hooks/useLeaveProject";

interface AwcProjectSettingsLeaveZoneProps {
  readonly projectId: string;
}

/** Settings · Leave zone for invitees (member/viewer). */
export default function AwcProjectSettingsLeaveZone({
  projectId,
}: AwcProjectSettingsLeaveZoneProps) {
  const router = useRouter();
  const { leaveProject, errorMessage, pending, clearError } =
    useLeaveProject(projectId);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const runLeave = async (): Promise<void> => {
    const ok = await leaveProject();
    if (!ok) return;
    router.push("/projects");
    router.refresh();
  };

  return (
    <section className="flex flex-col gap-2" aria-labelledby="p-set-leave-h">
      <h3
        id="p-set-leave-h"
        className="text-[13px] font-semibold text-error-600 dark:text-error-400"
      >
        {AWC_PROJECT_LEAVE_COPY.trigger}
      </h3>
      {!confirmOpen ? (
        <div className="flex flex-wrap items-start justify-between gap-3 rounded-xl px-3.5 py-2.5">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-awc-fg dark:text-white/90">
              {AWC_PROJECT_LEAVE_COPY.title}
            </p>
            <p className="mt-0.5 text-[13px] text-awc-fg-muted dark:text-gray-400">
              {AWC_PROJECT_LEAVE_COPY.body}
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="border-error-200 text-error-600 hover:bg-error-50 dark:border-error-900/40 dark:text-error-400"
            onClick={() => {
              clearError();
              setConfirmOpen(true);
            }}
          >
            {AWC_PROJECT_LEAVE_COPY.trigger}
          </Button>
        </div>
      ) : (
        <div className="px-3.5 py-2">
          <AwcProjectLeaveConfirmForm
            variant="inline"
            pending={pending}
            errorMessage={errorMessage}
            onConfirm={() => {
              void runLeave();
            }}
            onCancel={() => {
              clearError();
              setConfirmOpen(false);
            }}
          />
        </div>
      )}
    </section>
  );
}

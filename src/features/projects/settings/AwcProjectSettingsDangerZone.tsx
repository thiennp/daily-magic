"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import Button from "@/components/ui/button/Button";
import AwcProjectDeleteConfirmForm from "@/features/projects/AwcProjectDeleteConfirmForm";
import useDeleteProject from "@/features/projects/hooks/useDeleteProject";
import { PROJECT_PAGE_SETTINGS_COPY as C } from "@/features/projects/projectPageSettingsCopy.constant";

interface AwcProjectSettingsDangerZoneProps {
  readonly projectId: string;
  readonly projectName: string;
}

/** Settings · Danger zone — type-name confirm → existing delete API. */
export default function AwcProjectSettingsDangerZone({
  projectId,
  projectName,
}: AwcProjectSettingsDangerZoneProps) {
  const router = useRouter();
  const { deleteProject, errorMessage, pending, clearError } =
    useDeleteProject(projectId);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const runDelete = async (): Promise<void> => {
    const ok = await deleteProject();
    if (!ok) return;
    router.push("/projects");
    router.refresh();
  };

  return (
    <section className="flex flex-col gap-2" aria-labelledby="p-set-danger-h">
      <h3
        id="p-set-danger-h"
        className="text-[13px] font-semibold text-error-600 dark:text-error-400"
      >
        {C.dangerHeading}
      </h3>
      {!confirmOpen ? (
        <div className="flex flex-wrap items-start justify-between gap-3 rounded-xl px-3.5 py-2.5">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-awc-fg dark:text-white/90">
              {C.deleteTitle}
            </p>
            <p className="mt-0.5 text-[13px] text-awc-fg-muted dark:text-gray-400">
              {C.deleteSub}
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
            {C.deleteButton}
          </Button>
        </div>
      ) : (
        <div className="px-3.5 py-2">
          <AwcProjectDeleteConfirmForm
            variant="inline"
            projectName={projectName}
            pending={pending}
            errorMessage={errorMessage}
            onConfirm={() => {
              void runDelete();
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

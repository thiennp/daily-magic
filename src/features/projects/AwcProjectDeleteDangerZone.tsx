"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import Button from "@/components/ui/button/Button";
import AwcProjectDeleteConfirmForm from "@/features/projects/AwcProjectDeleteConfirmForm";
import { AWC_PROJECT_DELETE_COPY } from "@/features/projects/awcProjectDeleteCopy.constant";
import useDeleteProject from "@/features/projects/hooks/useDeleteProject";

interface AwcProjectDeleteDangerZoneProps {
  readonly projectId: string;
  readonly projectName: string;
}

const AwcProjectDeleteDangerZone = ({
  projectId,
  projectName,
}: AwcProjectDeleteDangerZoneProps) => {
  const router = useRouter();
  const { deleteProject, errorMessage, pending, clearError } =
    useDeleteProject(projectId);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const runDelete = async (): Promise<void> => {
    const ok = await deleteProject();
    if (!ok) {
      return;
    }

    router.push("/projects");
    router.refresh();
  };

  return (
    <div className="mt-6 border-t border-gray-200 pt-4 dark:border-gray-800">
      <h3 className="text-sm font-medium text-gray-800 dark:text-white/90">
        Danger zone
      </h3>
      {!confirmOpen ? (
        <>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {AWC_PROJECT_DELETE_COPY.scope}
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-3 border-error-200 text-error-600 hover:bg-error-50 dark:border-error-900/40 dark:text-error-400"
            onClick={() => {
              clearError();
              setConfirmOpen(true);
            }}
          >
            {AWC_PROJECT_DELETE_COPY.trigger}
          </Button>
        </>
      ) : (
        <div className="mt-3 rounded-lg border border-error-200/80 bg-error-50/50 p-3 dark:border-error-900/40 dark:bg-error-950/20">
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
    </div>
  );
};

export default AwcProjectDeleteDangerZone;

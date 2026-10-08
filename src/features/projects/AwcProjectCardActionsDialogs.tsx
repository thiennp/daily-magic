"use client";

import { useRouter } from "next/navigation";

import AwcProjectDeleteConfirmForm from "@/features/projects/AwcProjectDeleteConfirmForm";
import AwcProjectLeaveConfirmForm from "@/features/projects/AwcProjectLeaveConfirmForm";
import useDeleteProject from "@/features/projects/hooks/useDeleteProject";
import useLeaveProject from "@/features/projects/hooks/useLeaveProject";

interface DialogProps {
  readonly projectId: string;
  readonly onClose: () => void;
  readonly onProjectDeleted?: () => void;
}

/** Delete confirm dialog (mounted only while open, so errors reset). */
export function AwcProjectCardDeleteDialog({
  projectId,
  projectName,
  onClose,
  onProjectDeleted,
}: DialogProps & { readonly projectName: string }) {
  const { deleteProject, errorMessage, pending, clearError } =
    useDeleteProject(projectId);
  return (
    <AwcProjectDeleteConfirmForm
      variant="dialog"
      projectName={projectName}
      pending={pending}
      errorMessage={errorMessage}
      onConfirm={() => {
        void deleteProject().then((ok) => {
          if (ok) {
            onClose();
            onProjectDeleted?.();
          }
        });
      }}
      onCancel={() => {
        clearError();
        onClose();
      }}
    />
  );
}

/** Leave confirm dialog (mounted only while open). */
export function AwcProjectCardLeaveDialog({
  projectId,
  onClose,
  onProjectDeleted,
}: DialogProps) {
  const router = useRouter();
  const { leaveProject, errorMessage, pending, clearError } =
    useLeaveProject(projectId);
  return (
    <AwcProjectLeaveConfirmForm
      variant="dialog"
      pending={pending}
      errorMessage={errorMessage}
      onConfirm={() => {
        void leaveProject().then((ok) => {
          if (!ok) return;
          onClose();
          onProjectDeleted?.();
          router.push("/projects");
          router.refresh();
        });
      }}
      onCancel={() => {
        clearError();
        onClose();
      }}
    />
  );
}

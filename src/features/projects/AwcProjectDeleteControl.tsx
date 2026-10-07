"use client";

import { useState } from "react";

import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";
import AwcProjectDeleteConfirmForm from "@/features/projects/AwcProjectDeleteConfirmForm";
import AwcProjectDeleteDangerZone from "@/features/projects/AwcProjectDeleteDangerZone";
import AwcProjectDeleteMenuItem from "@/features/projects/AwcProjectDeleteMenuItem";
import useDeleteProject from "@/features/projects/hooks/useDeleteProject";

interface AwcProjectDeleteControlProps {
  readonly project: Pick<UserProjectRecord, "id" | "name">;
  readonly onDeleted?: () => void;
  readonly variant?: "detail" | "menu";
}

const AwcProjectDeleteControl = ({
  project,
  onDeleted,
  variant = "detail",
}: AwcProjectDeleteControlProps) => {
  const { deleteProject, errorMessage, pending, clearError } = useDeleteProject(
    project.id,
  );
  const [confirmOpen, setConfirmOpen] = useState(false);

  if (variant === "menu") {
    return (
      <>
        <AwcProjectDeleteMenuItem
          onRequestConfirm={() => {
            clearError();
            setConfirmOpen(true);
          }}
        />
        {confirmOpen ? (
          <AwcProjectDeleteConfirmForm
            variant="dialog"
            projectName={project.name}
            pending={pending}
            errorMessage={errorMessage}
            onConfirm={() => {
              void deleteProject().then((ok) => {
                if (ok) {
                  setConfirmOpen(false);
                  onDeleted?.();
                }
              });
            }}
            onCancel={() => {
              clearError();
              setConfirmOpen(false);
            }}
          />
        ) : null}
      </>
    );
  }

  return (
    <AwcProjectDeleteDangerZone
      projectId={project.id}
      projectName={project.name}
    />
  );
};

export default AwcProjectDeleteControl;

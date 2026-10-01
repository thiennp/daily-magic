"use client";

import isDefaultUserProject from "@/lib/projects/isDefaultUserProject";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";
import AwcProjectDeleteDangerZone from "@/features/projects/AwcProjectDeleteDangerZone";
import AwcProjectDeleteMenuItem from "@/features/projects/AwcProjectDeleteMenuItem";

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
  if (isDefaultUserProject(project)) {
    return null;
  }

  if (variant === "menu") {
    return (
      <AwcProjectDeleteMenuItem
        projectId={project.id}
        projectName={project.name}
        onDeleted={onDeleted}
      />
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

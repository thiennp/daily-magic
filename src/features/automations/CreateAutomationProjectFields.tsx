"use client";

import SendTaskComposerProjectPickerStep from "@/features/agent/SendTaskComposerProjectPickerStep";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

interface CreateAutomationProjectFieldsProps {
  readonly projects: readonly UserProjectRecord[];
  readonly isLoading: boolean;
  readonly onSelect: (project: UserProjectRecord) => void;
  readonly onProjectCreated: (project: UserProjectRecord) => void;
  readonly onProjectDeleted: (projectId: string) => void;
}

export default function CreateAutomationProjectFields({
  projects,
  isLoading,
  onSelect,
  onProjectCreated,
  onProjectDeleted,
}: CreateAutomationProjectFieldsProps) {
  return (
    <SendTaskComposerProjectPickerStep
      projects={projects}
      isLoading={isLoading}
      deviceId=""
      onSelect={onSelect}
      onProjectCreated={onProjectCreated}
      onProjectDeleted={onProjectDeleted}
    />
  );
}

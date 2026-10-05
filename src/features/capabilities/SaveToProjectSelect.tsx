"use client";

import type { SaveToProjectPickerState } from "@/features/capabilities/hooks/useSaveToProjectPicker";

interface SaveToProjectSelectProps {
  readonly picker: SaveToProjectPickerState;
  readonly disabled?: boolean;
}

export default function SaveToProjectSelect({
  picker,
  disabled = false,
}: SaveToProjectSelectProps) {
  const hasProjects = picker.projects.length > 0;
  const hasContextOnlyProject =
    picker.selectedProjectId.length > 0 &&
    !picker.projects.some((project) => project.id === picker.selectedProjectId);

  return (
    <label className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
      Save to which project?
      <select
        value={picker.selectedProjectId}
        disabled={disabled || picker.isLoading || !hasProjects}
        onChange={(event) => {
          picker.setSelectedProjectId(event.target.value);
        }}
        className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-white/90"
      >
        {picker.isLoading ? <option value="">Loading projects…</option> : null}
        {!picker.isLoading && !hasProjects ? (
          <option value="">No projects yet</option>
        ) : null}
        {hasContextOnlyProject ? (
          <option value={picker.selectedProjectId}>Current project</option>
        ) : null}
        {picker.projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.name}
          </option>
        ))}
      </select>
    </label>
  );
}

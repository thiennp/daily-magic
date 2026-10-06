"use client";

import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";
import type { FolderRefComputerOption } from "@/features/projects/access/utils/folderRefComputerOptions";
import { PROJECT_PAGE_RESOURCES_COPY as C } from "@/features/projects/resources/projectPageResourcesCopy.constant";

interface AwcProjectAccessFolderRefsMachineFieldProps {
  readonly id: string;
  readonly helpId: string;
  readonly className: string;
  readonly computers: readonly FolderRefComputerOption[];
  readonly machineRef: string;
  readonly onMachineRef: (deviceId: string) => void;
}

/** Computer `<select>` — option value is the stable deviceId. */
export default function AwcProjectAccessFolderRefsMachineField({
  id,
  helpId,
  className,
  computers,
  machineRef,
  onMachineRef,
}: AwcProjectAccessFolderRefsMachineFieldProps) {
  const copy = AWC_PROJECT_ACCESS_COPY;
  const hasComputers = computers.length > 0;
  return (
    <div className="min-w-0 flex-1">
      <label
        className="block text-xs text-gray-600 dark:text-gray-400"
        htmlFor={id}
      >
        {copy.machineRefLabel}
        <select
          id={id}
          className={className}
          value={hasComputers ? machineRef : ""}
          disabled={!hasComputers}
          aria-describedby={helpId}
          onChange={(event) => onMachineRef(event.target.value)}
        >
          <option value="">{copy.machineRefPlaceholder}</option>
          {computers.map((computer) => (
            <option key={computer.deviceId} value={computer.deviceId}>
              {computer.label}
            </option>
          ))}
        </select>
      </label>
      <span
        id={helpId}
        className="mt-0.5 block text-[11px] text-gray-500 dark:text-gray-400"
      >
        {hasComputers ? copy.machineRefHelp : C.foldersMachineNone}
      </span>
    </div>
  );
}

"use client";

import type { DispatchTargetCapability } from "@/features/dispatch/hooks/useDispatchTargets";

interface CapabilityPickerProps {
  readonly capabilities: readonly DispatchTargetCapability[];
  readonly selectedCapabilityId: string;
  readonly disabled: boolean;
  readonly onSelect: (capabilityId: string) => void;
}

export default function CapabilityPicker({
  capabilities,
  selectedCapabilityId,
  disabled,
  onSelect,
}: CapabilityPickerProps) {
  if (capabilities.length === 0) {
    return (
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        This teammate has not published an assistant yet.
      </p>
    );
  }

  return (
    <select
      value={selectedCapabilityId}
      disabled={disabled}
      onChange={(event) => {
        onSelect(event.target.value);
      }}
      className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900"
    >
      <option value="">Choose an assistant…</option>
      {capabilities.map((capability) => (
        <option key={capability.id} value={capability.id}>
          {capability.type === "workflow" ? "Workflow: " : "Assistant: "}
          {capability.name}
        </option>
      ))}
    </select>
  );
}

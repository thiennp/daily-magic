"use client";

import {
  DispatchPolicy,
  type DispatchPolicyValue,
} from "@/lib/dispatch/DispatchPolicy.constant";

interface DeviceDispatchPolicySelectProps {
  readonly value: DispatchPolicyValue | "inherit";
  readonly disabled?: boolean;
  readonly onChange: (value: DispatchPolicyValue | "inherit") => void;
  readonly onSave: () => void;
}

export default function DeviceDispatchPolicySelect({
  value,
  disabled = false,
  onChange,
  onSave,
}: DeviceDispatchPolicySelectProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <select
        value={value}
        disabled={disabled}
        onChange={(event) => {
          onChange(event.target.value as DispatchPolicyValue | "inherit");
        }}
        className="rounded-lg border border-gray-200 px-2 py-1.5 text-xs dark:border-gray-700 dark:bg-gray-950"
      >
        <option value="inherit">Inherit</option>
        <option value={DispatchPolicy.APPROVAL}>Approval</option>
        <option value={DispatchPolicy.OPEN}>Open</option>
      </select>
      <button
        type="button"
        disabled={disabled}
        onClick={onSave}
        className="rounded-lg border border-gray-200 px-2 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-900"
      >
        Save
      </button>
    </div>
  );
}

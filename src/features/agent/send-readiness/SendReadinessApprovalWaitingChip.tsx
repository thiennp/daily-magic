"use client";

interface SendReadinessApprovalWaitingChipProps {
  readonly label: string;
}

export default function SendReadinessApprovalWaitingChip({
  label,
}: SendReadinessApprovalWaitingChipProps) {
  return (
    <span
      className="mb-3 inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-800 dark:bg-amber-500/15 dark:text-amber-100"
      role="status"
    >
      {label}
    </span>
  );
}

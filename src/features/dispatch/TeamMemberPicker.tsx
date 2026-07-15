"use client";

import TargetPresenceBadges from "@/features/dispatch/TargetPresenceBadges";
import type { DispatchTargetMember } from "@/features/dispatch/hooks/useDispatchTargets";

interface TeamMemberPickerProps {
  readonly members: readonly DispatchTargetMember[];
  readonly selectedUserId: string;
  readonly disabled?: boolean;
  readonly onSelect: (userId: string) => void;
}

export default function TeamMemberPicker({
  members,
  selectedUserId,
  disabled = false,
  onSelect,
}: TeamMemberPickerProps) {
  if (members.length === 0) {
    return (
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        No teammates in this group.
      </p>
    );
  }

  return (
    <ul className="mt-2 max-h-48 space-y-2 overflow-y-auto rounded-lg border border-gray-200 p-2 dark:border-gray-700">
      {members.map((member) => {
        const isSelected = member.userId === selectedUserId;

        return (
          <li key={member.userId}>
            <button
              type="button"
              disabled={disabled}
              onClick={() => {
                onSelect(member.userId);
              }}
              className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm transition ${
                isSelected
                  ? "bg-brand-50 text-brand-700 dark:bg-brand-950/30 dark:text-brand-300"
                  : "hover:bg-gray-50 dark:hover:bg-white/5"
              }`}
            >
              <span>{member.name ?? member.email}</span>
              <TargetPresenceBadges
                isOnline={member.isOnline}
                isPaired={member.isPaired}
              />
            </button>
          </li>
        );
      })}
    </ul>
  );
}

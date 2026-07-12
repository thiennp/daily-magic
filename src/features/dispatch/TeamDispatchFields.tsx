"use client";

import { useState } from "react";

import TeamMemberPicker from "@/features/dispatch/TeamMemberPicker";
import { useDispatchTargets } from "@/features/dispatch/hooks/useDispatchTargets";

interface TeamDispatchFieldsProps {
  readonly selectedGroupId: string;
  readonly selectedTargetUserId: string;
  readonly onGroupChange: (groupId: string) => void;
  readonly onTargetChange: (userId: string) => void;
}

export default function TeamDispatchFields({
  selectedGroupId,
  selectedTargetUserId,
  onGroupChange,
  onTargetChange,
}: TeamDispatchFieldsProps) {
  const { groups, isLoading } = useDispatchTargets();
  const selectedGroup = groups.find(
    (group) => group.groupId === selectedGroupId,
  );

  if (isLoading) {
    return (
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Loading teammates…
      </p>
    );
  }

  if (groups.length === 0) {
    return (
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Join a team to send tasks to colleagues.
      </p>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <label className="text-sm font-medium text-gray-800 dark:text-white/90">
        Team
        <select
          value={selectedGroupId}
          onChange={(event) => {
            onGroupChange(event.target.value);
          }}
          className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900"
        >
          <option value="">My Mac (self)</option>
          {groups.map((group) => (
            <option key={group.groupId} value={group.groupId}>
              {group.groupName} ({group.dispatchPolicy})
            </option>
          ))}
        </select>
      </label>

      <div className="text-sm font-medium text-gray-800 dark:text-white/90">
        Teammate
        <TeamMemberPicker
          members={selectedGroup?.members ?? []}
          selectedUserId={selectedTargetUserId}
          disabled={selectedGroupId.length === 0}
          onSelect={onTargetChange}
        />
      </div>
    </div>
  );
}

export function useTeamDispatchSelection(): {
  readonly selectedGroupId: string;
  readonly selectedTargetUserId: string;
  readonly setSelectedGroupId: (value: string) => void;
  readonly setSelectedTargetUserId: (value: string) => void;
} {
  const [selectedGroupId, setSelectedGroupId] = useState("");
  const [selectedTargetUserId, setSelectedTargetUserId] = useState("");

  return {
    selectedGroupId,
    selectedTargetUserId,
    setSelectedGroupId: (value: string) => {
      setSelectedGroupId(value);
      setSelectedTargetUserId("");
    },
    setSelectedTargetUserId,
  };
}

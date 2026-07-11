"use client";

import { useState } from "react";

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
        Loading team dispatch targets…
      </p>
    );
  }

  if (groups.length === 0) {
    return (
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Join a group to dispatch tasks to teammates.
      </p>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <label className="text-sm font-medium text-gray-800 dark:text-white/90">
        Group
        <select
          value={selectedGroupId}
          onChange={(event) => {
            onGroupChange(event.target.value);
          }}
          className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900"
        >
          <option value="">My machine (self)</option>
          {groups.map((group) => (
            <option key={group.groupId} value={group.groupId}>
              {group.groupName} ({group.dispatchPolicy})
            </option>
          ))}
        </select>
      </label>

      <label className="text-sm font-medium text-gray-800 dark:text-white/90">
        Teammate
        <select
          value={selectedTargetUserId}
          onChange={(event) => {
            onTargetChange(event.target.value);
          }}
          disabled={selectedGroupId.length === 0}
          className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900"
        >
          <option value="">Select teammate</option>
          {(selectedGroup?.members ?? []).map((member) => (
            <option key={member.userId} value={member.userId}>
              {member.name ?? member.email}
            </option>
          ))}
        </select>
      </label>
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

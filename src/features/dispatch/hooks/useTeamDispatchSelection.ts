"use client";

import { useState } from "react";

export function useTeamDispatchSelection(): {
  readonly selectedGroupId: string;
  readonly selectedTargetUserId: string;
  readonly selectedCapabilityId: string;
  readonly setSelectedGroupId: (value: string) => void;
  readonly setSelectedTargetUserId: (value: string) => void;
  readonly setSelectedCapabilityId: (value: string) => void;
} {
  const [selectedGroupId, setSelectedGroupId] = useState("");
  const [selectedTargetUserId, setSelectedTargetUserId] = useState("");
  const [selectedCapabilityId, setSelectedCapabilityId] = useState("");

  return {
    selectedGroupId,
    selectedTargetUserId,
    selectedCapabilityId,
    setSelectedGroupId: (value: string) => {
      setSelectedGroupId(value);
      setSelectedTargetUserId("");
      setSelectedCapabilityId("");
    },
    setSelectedTargetUserId: (value: string) => {
      setSelectedTargetUserId(value);
      setSelectedCapabilityId("");
    },
    setSelectedCapabilityId,
  };
}

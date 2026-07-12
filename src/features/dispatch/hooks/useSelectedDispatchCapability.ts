"use client";

import { useMemo } from "react";

import { useDispatchTargets } from "@/features/dispatch/hooks/useDispatchTargets";
import type { DispatchTargetCapability } from "@/features/dispatch/hooks/useDispatchTargets";

export function useSelectedDispatchCapability(
  selectedGroupId: string,
  selectedTargetUserId: string,
  selectedCapabilityId: string,
): DispatchTargetCapability | null {
  const { groups } = useDispatchTargets();

  return useMemo(() => {
    if (
      selectedGroupId.length === 0 ||
      selectedTargetUserId.length === 0 ||
      selectedCapabilityId.length === 0
    ) {
      return null;
    }

    const group = groups.find((entry) => entry.groupId === selectedGroupId);
    const member = group?.members.find(
      (entry) => entry.userId === selectedTargetUserId,
    );

    return (
      member?.capabilities.find(
        (capability) => capability.id === selectedCapabilityId,
      ) ?? null
    );
  }, [groups, selectedCapabilityId, selectedGroupId, selectedTargetUserId]);
}

"use client";

import { useDispatchTargets } from "@/features/dispatch/hooks/useDispatchTargets";
import { resolveShouldShowTeamDispatchSection } from "@/features/agent/utils/resolveShouldShowTeamDispatchSection";

export const useShouldShowTeamDispatchSection = (input: {
  readonly isLibraryPlaybook: boolean;
  readonly isOwnDeviceDispatch: boolean;
  readonly isSteppedComposer: boolean;
}): boolean => {
  const { groups, isLoading } = useDispatchTargets();

  return resolveShouldShowTeamDispatchSection({
    ...input,
    isLoading,
    groupCount: groups.length,
  });
};

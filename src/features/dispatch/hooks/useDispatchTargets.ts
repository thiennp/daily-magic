"use client";

import { useSyncExternalStore } from "react";

import type { DispatchTargetGroup } from "@/features/dispatch/dispatchTarget.type";
import { dispatchTargetsResource } from "@/features/dispatch/dispatchTargetsResource";

export type {
  DispatchTargetCapability,
  DispatchTargetGroup,
  DispatchTargetMember,
} from "@/features/dispatch/dispatchTarget.type";

const EMPTY_GROUPS: readonly DispatchTargetGroup[] = [];

export function useDispatchTargets(): {
  readonly groups: readonly DispatchTargetGroup[];
  readonly isLoading: boolean;
} {
  const groups = useSyncExternalStore(
    dispatchTargetsResource.subscribe,
    () => dispatchTargetsResource.getSnapshot() ?? EMPTY_GROUPS,
    () => EMPTY_GROUPS,
  );
  const isLoading = dispatchTargetsResource.getSnapshot() === null;

  return { groups, isLoading };
}

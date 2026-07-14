"use client";

import { useSyncExternalStore } from "react";

import { useDemoPreview } from "@/features/demo/DemoPreviewContext";
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
  const demoPreview = useDemoPreview();
  const groups = useSyncExternalStore(
    dispatchTargetsResource.subscribe,
    () => dispatchTargetsResource.getSnapshot() ?? EMPTY_GROUPS,
    () => EMPTY_GROUPS,
  );
  const isLoading =
    !demoPreview && dispatchTargetsResource.getSnapshot() === null;

  return { groups: demoPreview?.dispatchGroups ?? groups, isLoading };
}

import {
  PROJECT_MESSAGE_LIFECYCLE_ARROWS,
  type ProjectMessageLifecycleArrow,
  type ProjectMessageLifecycleState,
} from "@/lib/projects/acl/messaging/lifecycle/projectMessageLifecycle.constants";

export type ProjectMessageLifecycleTransitionResult =
  | { readonly ok: true; readonly state: ProjectMessageLifecycleState | null }
  | {
      readonly ok: false;
      readonly from: ProjectMessageLifecycleState | null;
      readonly arrow: ProjectMessageLifecycleArrow;
    };

/** Look up one named arrow. Illegal transitions are rejected, never guessed. */
export const nextProjectMessageLifecycleState = (
  from: ProjectMessageLifecycleState | null,
  arrow: ProjectMessageLifecycleArrow,
): ProjectMessageLifecycleTransitionResult => {
  const spec = PROJECT_MESSAGE_LIFECYCLE_ARROWS[arrow];
  return spec.from === from
    ? { ok: true, state: spec.to }
    : { ok: false, from, arrow };
};

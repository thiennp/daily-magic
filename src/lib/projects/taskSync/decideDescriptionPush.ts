import { hashDescription } from "@/lib/projects/taskSync/hashTaskSyncFields";

export type DescriptionPushDecision = {
  /** Include the description in the Linear update. */
  readonly send: boolean;
  /** New clipped baseline to store after a successful push (null = none). */
  readonly nextClippedHash: string | null;
};

/**
 * Linear's description may be longer than the AW cap (we keep the AW text on
 * pull). While the AW description still equals the baseline stored at pull
 * time, pushing it would truncate Linear's text, so it is omitted. An AW-side
 * edit differs from the baseline: send it and drop the clipped marker.
 */
export const decideDescriptionPush = (input: {
  readonly clippedDescriptionHash: string | null;
  readonly description: string | null;
}): DescriptionPushDecision => {
  const baseline = input.clippedDescriptionHash;
  if (baseline === null) return { send: true, nextClippedHash: null };
  return hashDescription(input.description) === baseline
    ? { send: false, nextClippedHash: baseline }
    : { send: true, nextClippedHash: null };
};

"use client";

import { useCallback, useMemo, useState } from "react";

import {
  useAwcGrokWakeLinkFocus,
  type AwcGrokWakeLinkFocusRequest,
} from "@/features/projects/access/hooks/useAwcGrokWakeLinkFocus";
import type { AccessMembershipView } from "@/features/projects/access/utils/projectAccessApi.types";
import { listMembersAwaitingWakeLink } from "@/features/projects/access/utils/resolveMemberWakeLinkState";

/** What the Members list needs to render wake-link pills + expand a form. */
export type AwcMemberWakeLinksListProps = {
  /** Deep link / "Add wake link" target. */
  readonly request: AwcGrokWakeLinkFocusRequest | null;
  /** Saved in this session (pill flips before the next poll). */
  readonly savedIds: ReadonlySet<string>;
  readonly onSaved: (membershipId: string) => void;
};

/** Owner Access: awaiting list for the banner + focus/saved state for rows. */
export const useAwcProjectAccessWakeLinks = (
  botMembers: readonly AccessMembershipView[],
) => {
  const [savedIds, setSavedIds] = useState<ReadonlySet<string>>(
    () => new Set(),
  );
  const onSaved = useCallback((membershipId: string) => {
    setSavedIds((previous) => new Set([...previous, membershipId]));
  }, []);
  const awaiting = useMemo(
    () => listMembersAwaitingWakeLink(botMembers, savedIds),
    [botMembers, savedIds],
  );
  const { request, focus } = useAwcGrokWakeLinkFocus();
  const list = useMemo<AwcMemberWakeLinksListProps>(
    () => ({ request, savedIds, onSaved }),
    [request, savedIds, onSaved],
  );
  return { awaiting, focus, list };
};

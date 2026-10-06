import type { Dispatch, MutableRefObject, SetStateAction } from "react";

import type {
  AwcProjectAccessFolderRef,
  AwcProjectAccessInvite,
  AwcProjectAccessMember,
  AwcProjectAccessPending,
  AwcProjectAccessSnapshot,
} from "@/features/projects/access/hooks/loadAwcProjectAccess";
import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";

type SnapshotSetters = {
  readonly setMembers: Dispatch<
    SetStateAction<readonly AwcProjectAccessMember[]>
  >;
  readonly setPending: Dispatch<
    SetStateAction<readonly AwcProjectAccessPending[]>
  >;
  readonly setFolderRefs: Dispatch<
    SetStateAction<readonly AwcProjectAccessFolderRef[]>
  >;
  readonly setInvites: Dispatch<
    SetStateAction<readonly AwcProjectAccessInvite[]>
  >;
  readonly setProjectName: Dispatch<SetStateAction<string | null>>;
  readonly setLoadError: Dispatch<SetStateAction<string | null>>;
  readonly setAutoApprovedBanner: Dispatch<SetStateAction<string | null>>;
  readonly setRecentlyAutoApprovedIds: Dispatch<
    SetStateAction<readonly string[]>
  >;
};

/** Newly appeared members that came in through invite auto-approve only. */
export const detectInviteAutoApprovedMembers = (input: {
  readonly members: readonly AwcProjectAccessMember[];
  readonly addedIds: readonly string[];
}): {
  readonly banner: string | null;
  readonly badgeIds: readonly string[];
} => {
  const autoJoined = input.addedIds
    .map((id) => input.members.find((member) => member.id === id))
    .filter(
      (member): member is AwcProjectAccessMember =>
        member !== undefined &&
        typeof member.autoApprovedViaInviteLabel === "string" &&
        member.autoApprovedViaInviteLabel.length > 0,
    );
  if (autoJoined.length === 0) {
    return { banner: null, badgeIds: [] };
  }
  const first = autoJoined[0];
  const name =
    first.projectDisplayName?.trim() ||
    first.displayName?.trim() ||
    "Assistant";
  const label = first.autoApprovedViaInviteLabel as string;
  return {
    banner: AWC_PROJECT_ACCESS_COPY.autoApprovedBanner
      .replace("{name}", name)
      .replace("{label}", label),
    badgeIds: autoJoined.map((member) => member.id),
  };
};

/** Apply one Access snapshot: members/pending/folders/invites + auto-approve banner. */
export const applyAwcProjectAccessSnapshot = (input: {
  readonly snapshot: AwcProjectAccessSnapshot;
  readonly knownMemberIdsRef: MutableRefObject<ReadonlySet<string> | null>;
  readonly skipAutoApproveDetectRef: MutableRefObject<boolean>;
  readonly bannerTimerRef: MutableRefObject<number | null>;
  readonly syncBannerWithUsableInvites: (
    invites: readonly AwcProjectAccessInvite[],
  ) => void;
  readonly setters: SnapshotSetters;
}): void => {
  const { snapshot, setters } = input;
  const nextIds = new Set(snapshot.members.map((member) => member.id));
  const prevIds = input.knownMemberIdsRef.current;
  if (
    prevIds !== null &&
    !input.skipAutoApproveDetectRef.current &&
    snapshot.ok
  ) {
    const added = [...nextIds].filter((id) => !prevIds.has(id));
    const detected = detectInviteAutoApprovedMembers({
      members: snapshot.members,
      addedIds: added,
    });
    if (detected.banner !== null) {
      setters.setAutoApprovedBanner(detected.banner);
      setters.setRecentlyAutoApprovedIds(detected.badgeIds);
      if (input.bannerTimerRef.current !== null) {
        window.clearTimeout(input.bannerTimerRef.current);
      }
      input.bannerTimerRef.current = window.setTimeout(() => {
        setters.setAutoApprovedBanner(null);
        setters.setRecentlyAutoApprovedIds([]);
        input.bannerTimerRef.current = null;
      }, 4000);
    }
  }
  input.knownMemberIdsRef.current = nextIds;
  input.skipAutoApproveDetectRef.current = false;
  setters.setMembers(snapshot.members);
  setters.setPending(snapshot.pending);
  setters.setFolderRefs(snapshot.folderRefs);
  setters.setInvites(snapshot.invites);
  input.syncBannerWithUsableInvites(snapshot.invites);
  setters.setProjectName(snapshot.projectName);
  setters.setLoadError(snapshot.ok ? null : snapshot.errorMessage);
};

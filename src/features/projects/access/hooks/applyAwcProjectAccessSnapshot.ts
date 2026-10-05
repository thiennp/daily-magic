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
    if (added.length > 0) {
      setters.setAutoApprovedBanner(AWC_PROJECT_ACCESS_COPY.autoApprovedBanner);
      setters.setRecentlyAutoApprovedIds(added);
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

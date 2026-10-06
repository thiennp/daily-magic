import type { Dispatch, SetStateAction } from "react";

import type {
  AwcProjectAccessFolderRef,
  AwcProjectAccessInvite,
  AwcProjectAccessMember,
  AwcProjectAccessPending,
} from "@/features/projects/access/hooks/loadAwcProjectAccess";

/** State setters one Access snapshot writes (see applyAwcProjectAccessSnapshot). */
export type SnapshotSetters = {
  readonly setMembers: Dispatch<
    SetStateAction<readonly AwcProjectAccessMember[]>
  >;
  readonly setPending: Dispatch<
    SetStateAction<readonly AwcProjectAccessPending[]>
  >;
  readonly setExpired: Dispatch<
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

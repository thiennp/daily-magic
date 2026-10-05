import type { HumanInviteAcceptViewState } from "@/features/projects/access/humanInvites/AwcHumanInviteAcceptView";
import type { HumanInviteRole } from "@/features/projects/access/humanInvites/types/humanInviteUiContract.type";

export type AwcHumanInviteAcceptPageProps = {
  readonly token: string;
  readonly initialView: HumanInviteAcceptViewState;
  readonly projectId: string | null;
  readonly projectName: string;
  readonly inviterDisplayName: string;
  readonly role: HumanInviteRole;
  readonly expiresAt: string | null;
  readonly signedInEmail: string | null;
  readonly accountName?: string | null;
  readonly requireEmailMatch?: boolean;
  readonly invitedEmailMasked?: string | null;
};

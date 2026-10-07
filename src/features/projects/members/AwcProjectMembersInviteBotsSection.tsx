"use client";

import AwcProjectInviteAddAssistantControl from "@/features/projects/access/invites/AwcProjectInviteAddAssistantControl";
import AwcProjectInviteCreatedBanner from "@/features/projects/access/invites/AwcProjectInviteCreatedBanner";
import {
  awcProjectInviteTypeLabel,
  type AwcProjectInviteAddSelection,
} from "@/features/projects/access/invites/awcProjectInviteAddAssistantTypes";
import type { ProjectInvitePlatform } from "@/features/projects/access/invites/projectInvitePlatform.type";
import type { AwcProjectAccessInvite } from "@/features/projects/access/hooks/loadAwcProjectAccess";
import AwcProjectMembersInvitePendingList from "@/features/projects/members/AwcProjectMembersInvitePendingList";
import { PROJECT_PAGE_MEMBERS_COPY as C } from "@/features/projects/projectPageMembersCopy.constant";
import { buildCreatedInviteCopyPrompt } from "@/features/projects/access/invites/buildCreatedInviteCopyPrompt";
import type { CreatedInvitePrompts } from "@/features/projects/access/invites/createdInvitePrompts";

interface AwcProjectMembersInviteBotsSectionProps {
  readonly projectId: string;
  readonly projectName: string | null;
  readonly invites: readonly AwcProjectAccessInvite[];
  readonly createdInviteUrl: string | null;
  readonly createdInviteToken: string | null;
  readonly createdInvitePlatform: ProjectInvitePlatform | null;
  /** Picked types[] id; null = any assistant. */
  readonly createdInviteJoinTypeId: string | null;
  /** Invites this tab created (DF-014): pending rows can Copy again. */
  readonly createdInvitePrompts?: CreatedInvitePrompts;
  readonly onCreate: (selection: AwcProjectInviteAddSelection) => void;
  readonly onRevoke: (inviteId: string) => void;
  readonly onTurnOffAutoApprove?: (inviteId: string) => void;
  readonly onClearCreated: () => void;
}

const BTN =
  "inline-flex items-center justify-center rounded-full bg-gray-900 px-3 py-1.5 text-[13px] font-semibold text-white transition hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100";

/** Shared "Add assistant" invite (optional type) + one-time prompt + pending invites. */
export default function AwcProjectMembersInviteBotsSection({
  projectId,
  projectName,
  invites,
  createdInviteUrl,
  createdInviteToken,
  createdInvitePlatform,
  createdInviteJoinTypeId,
  createdInvitePrompts = {},
  onCreate,
  onRevoke,
  onTurnOffAutoApprove,
  onClearCreated,
}: AwcProjectMembersInviteBotsSectionProps) {
  return (
    <section className="flex flex-col gap-2" aria-labelledby="members-invite-h">
      <h3
        id="members-invite-h"
        className="px-3.5 text-[13px] font-semibold text-awc-fg-muted dark:text-gray-400"
      >
        {C.inviteBotHeading}
      </h3>
      <div className="px-3.5">
        <AwcProjectInviteAddAssistantControl
          buttonClassName={BTN}
          onCreate={onCreate}
        />
      </div>
      {createdInviteUrl ? (
        <div className="px-3.5">
          <p className="mb-1 text-[12px] text-awc-fg-muted dark:text-gray-400">
            {C.invitePrompt(awcProjectInviteTypeLabel(createdInviteJoinTypeId))}
          </p>
          <AwcProjectInviteCreatedBanner
            createdInviteUrl={createdInviteUrl}
            createdInviteToken={createdInviteToken}
            projectId={projectId}
            projectName={projectName}
            platform={createdInvitePlatform}
            joinTypeId={createdInviteJoinTypeId}
            onClearCreatedUrl={onClearCreated}
          />
        </div>
      ) : null}
      <AwcProjectMembersInvitePendingList
        invites={invites}
        onRevoke={onRevoke}
        onTurnOffAutoApprove={onTurnOffAutoApprove}
        copyPromptFor={(inviteId) =>
          buildCreatedInviteCopyPrompt({
            prompt: createdInvitePrompts[inviteId],
            projectName,
          })
        }
      />
    </section>
  );
}

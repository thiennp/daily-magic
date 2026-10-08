"use client";

import type { useAwcProjectAccess } from "@/features/projects/access/hooks/useAwcProjectAccess";
import AwcProjectInviteAddAssistantControl from "@/features/projects/access/invites/AwcProjectInviteAddAssistantControl";
import AwcProjectInviteCreatedBanner from "@/features/projects/access/invites/AwcProjectInviteCreatedBanner";
import { awcProjectInviteTypeLabel } from "@/features/projects/access/invites/awcProjectInviteAddAssistantTypes";
import { buildCreatedInviteCopyPrompt } from "@/features/projects/access/invites/buildCreatedInviteCopyPrompt";
import { fetchPendingInviteCopyPrompt } from "@/features/projects/access/invites/fetchPendingInviteCopyPrompt";
import AwcProjectMembersInfoTip from "@/features/projects/members/AwcProjectMembersInfoTip";
import SectionIcon, {
  SECTION_CARD,
} from "@/features/projects/members/AwcProjectMembersSectionCard";
import AwcProjectMembersInvitePendingList from "@/features/projects/members/AwcProjectMembersInvitePendingList";
import { PROJECT_PAGE_MEMBERS_COPY as C } from "@/features/projects/projectPageMembersCopy.constant";

type ProjectAccess = ReturnType<typeof useAwcProjectAccess>;

interface AwcProjectMembersInviteBotsSectionProps {
  readonly projectId: string;
  /** Owner access state: invites, the just-created banner and the invite actions. */
  readonly access: Pick<
    ProjectAccess,
    | "projectName"
    | "invites"
    | "createdInviteUrl"
    | "createdInviteToken"
    | "createdInvitePlatform"
    | "createdInviteJoinTypeId"
    | "createdInvitePrompts"
    | "createInvite"
    | "revokeInvite"
    | "turnOffAutoApprove"
    | "clearCreatedInviteBanner"
  >;
}

/** DF-036 F2: Pine-outline secondary (never a black pill). */
const BTN =
  "awc-focus-ring inline-flex items-center justify-center rounded-full border border-awc-primary bg-transparent px-3 py-1.5 text-[13px] font-semibold text-awc-primary transition hover:bg-awc-accent-soft";

/** DF-036 D4 "Invite an assistant": one-time invite (setup steps picker) + unused invite rows. */
export default function AwcProjectMembersInviteBotsSection({
  projectId,
  access,
}: AwcProjectMembersInviteBotsSectionProps) {
  const { projectName, createdInviteUrl } = access;
  const prompts = access.createdInvitePrompts ?? {};
  return (
    <section className={SECTION_CARD} aria-labelledby="members-invite-h">
      <div className="flex items-center gap-2">
        <SectionIcon tone="neutral" icon="invite" />
        <h3 id="members-invite-h" className="text-sm font-semibold text-awc-fg">
          {C.inviteBotHeading}
        </h3>
        <AwcProjectMembersInfoTip id="members-invite-tip">
          {C.inviteBotIntro}
        </AwcProjectMembersInfoTip>
      </div>
      <div>
        <AwcProjectInviteAddAssistantControl
          buttonClassName={BTN}
          onCreate={(selection) =>
            void access.createInvite(
              selection.platform,
              false,
              selection.joinTypeId,
            )
          }
        />
      </div>
      {createdInviteUrl ? (
        <div>
          <p className="mb-1 text-[12px] text-awc-fg-muted dark:text-gray-400">
            {C.invitePrompt(
              awcProjectInviteTypeLabel(access.createdInviteJoinTypeId),
            )}
          </p>
          <AwcProjectInviteCreatedBanner
            createdInviteUrl={createdInviteUrl}
            createdInviteToken={access.createdInviteToken}
            projectId={projectId}
            projectName={projectName}
            platform={access.createdInvitePlatform}
            joinTypeId={access.createdInviteJoinTypeId}
            onClearCreatedUrl={access.clearCreatedInviteBanner}
          />
        </div>
      ) : null}
      <AwcProjectMembersInvitePendingList
        invites={access.invites}
        onRevoke={(id) => void access.revokeInvite(id)}
        onTurnOffAutoApprove={(id) => void access.turnOffAutoApprove(id)}
        typeLabelFor={(id) =>
          awcProjectInviteTypeLabel(prompts[id]?.joinTypeId ?? null)
        }
        copyPromptFor={(id) =>
          buildCreatedInviteCopyPrompt({ prompt: prompts[id], projectName })
        }
        fetchCopyPrompt={(inviteId) =>
          fetchPendingInviteCopyPrompt({ projectId, inviteId, projectName })
        }
      />
    </section>
  );
}

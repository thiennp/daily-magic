"use client";

import AwcProjectAccessSection from "@/features/projects/access/AwcProjectAccessSection";
import AwcProjectInvitesPanel from "@/features/projects/access/invites/AwcProjectInvitesPanel";
import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";
import LaneCompareHelpTrigger from "@/features/projects/access/laneCompare/LaneCompareHelpTrigger";
import { LANE_COMPARE_COPY } from "@/features/projects/access/laneCompare/laneCompareCopy.constant";
import type { useAwcProjectAccess } from "@/features/projects/access/hooks/useAwcProjectAccess";

interface AwcProjectAccessInvitesSectionProps {
  readonly projectId: string;
  readonly access: ReturnType<typeof useAwcProjectAccess>;
}

/** Access panel › Assistant invites: shared Add assistant + list. */
export default function AwcProjectAccessInvitesSection({
  projectId,
  access,
}: AwcProjectAccessInvitesSectionProps) {
  const copy = AWC_PROJECT_ACCESS_COPY;
  return (
    <AwcProjectAccessSection
      id="project-access-invites"
      title={copy.invitesHeading}
      hint={copy.invitesIntro}
      count={access.invites.length}
    >
      <LaneCompareHelpTrigger
        hint={LANE_COMPARE_COPY.help.invite}
        testId="lane-compare-help-invite"
      />
      <AwcProjectInvitesPanel
        invites={access.invites}
        createdInviteUrl={access.createdInviteUrl}
        createdInviteToken={access.createdInviteToken}
        createdInvitePlatform={access.createdInvitePlatform}
        createdInviteJoinTypeId={access.createdInviteJoinTypeId}
        projectId={projectId}
        projectName={access.projectName}
        hideChrome
        onCreate={(selection, autoApprove) =>
          void access.createInvite(
            selection.platform,
            autoApprove,
            selection.joinTypeId,
            selection.isolateBots === true,
          )
        }
        onRevoke={(id) => void access.revokeInvite(id)}
        onTurnOffAutoApprove={(id) => void access.turnOffAutoApprove(id)}
        onClearCreatedUrl={access.clearCreatedInviteBanner}
      />
    </AwcProjectAccessSection>
  );
}

"use client";

import { useState } from "react";

import { AwcAccessLogPanel } from "@/features/projects/accessLog/public-api/presentation";
import { AWC_PROJECT_DELETE_COPY } from "@/features/projects/awcProjectDeleteCopy.constant";
import AwcProjectMembersRailMenu from "@/features/projects/members/AwcProjectMembersRailMenu";
import { PROJECT_PAGE_MEMBERS_COPY as C } from "@/features/projects/projectPageMembersCopy.constant";

interface AwcProjectMembersOwnerRailMenuProps {
  readonly projectId: string;
  /** Opens the project's Settings tab (where Delete lives). */
  readonly onOpenSettings: () => void;
}

const focusInviteSection = (): void => {
  const section = document.querySelector<HTMLElement>(
    '[aria-labelledby="members-invite-h"]',
  );
  section?.scrollIntoView({ behavior: "smooth", block: "center" });
  section?.querySelector<HTMLElement>("button, input, textarea")?.focus();
};

/** Owner ⋯ menu: Invite · Access log · Delete project. */
export default function AwcProjectMembersOwnerRailMenu({
  projectId,
  onOpenSettings,
}: AwcProjectMembersOwnerRailMenuProps) {
  const [logOpen, setLogOpen] = useState(false);
  return (
    <>
      <AwcProjectMembersRailMenu
        items={[
          { label: C.railMenuInvite, run: focusInviteSection },
          { label: C.railMenuAccessLog, run: () => setLogOpen(true) },
          {
            label: AWC_PROJECT_DELETE_COPY.trigger,
            run: onOpenSettings,
            bad: true,
            separated: true,
          },
        ]}
      />
      <AwcAccessLogPanel
        projectId={projectId}
        isOpen={logOpen}
        onClose={() => setLogOpen(false)}
      />
    </>
  );
}

"use client";

import AwcHumanInvitePersonForm from "@/features/projects/access/humanInvites/AwcHumanInvitePersonForm";
import {
  HUMAN_INVITE_UI_COPY,
  withProjectName,
} from "@/features/projects/access/humanInvites/humanInviteUiCopy.constant";
import type { AwcHumanInvitePersonPanelProps } from "@/features/projects/access/humanInvites/types/awcHumanInvitePersonPanelProps.type";
import { SECTION_CARD } from "@/features/projects/members/AwcProjectMembersSectionCard";

export type { AwcHumanInvitePersonPanelProps } from "@/features/projects/access/humanInvites/types/awcHumanInvitePersonPanelProps.type";

/** Invite person card — opens above the People list, which stays visible. */
export default function AwcHumanInvitePersonPanel(
  props: AwcHumanInvitePersonPanelProps,
) {
  const copy = HUMAN_INVITE_UI_COPY;
  return (
    <section
      id="inv-person-card"
      className={SECTION_CARD}
      aria-labelledby="inv-person-h1"
    >
      <header className="flex items-baseline justify-between gap-2">
        <h3 className="text-sm font-semibold text-awc-fg" id="inv-person-h1">
          {copy.invitePersonTitle}
        </h3>
        <span className="min-w-0 truncate text-xs text-awc-fg-muted">
          {withProjectName(copy.invitePersonIntro, props.projectName)}
        </span>
      </header>
      <AwcHumanInvitePersonForm {...props} />
    </section>
  );
}

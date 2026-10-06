"use client";

import AwcHumanInvitePersonForm from "@/features/projects/access/humanInvites/AwcHumanInvitePersonForm";
import AwcHumanInviteWhatHappensNext from "@/features/projects/access/humanInvites/AwcHumanInviteWhatHappensNext";
import { HUMAN_INVITE_PERSON_FLOW_COPY } from "@/features/projects/access/humanInvites/humanInvitePersonFlowCopy.constant";
import {
  HUMAN_INVITE_UI_COPY,
  withProjectName,
} from "@/features/projects/access/humanInvites/humanInviteUiCopy.constant";
import {
  INV_BACK_CLASS,
  INV_CARD_CLASS,
  INV_SUB_CLASS,
  INV_TITLE_CLASS,
} from "@/features/projects/access/humanInvites/invitePersonChromeClasses.constant";
import type { AwcHumanInvitePersonPanelProps } from "@/features/projects/access/humanInvites/types/awcHumanInvitePersonPanelProps.type";

export type { AwcHumanInvitePersonPanelProps } from "@/features/projects/access/humanInvites/types/awcHumanInvitePersonPanelProps.type";

/** Owner Invite person — Claude HTML Email|Link + role + What happens next. */
export default function AwcHumanInvitePersonPanel(
  props: AwcHumanInvitePersonPanelProps,
) {
  const copy = HUMAN_INVITE_UI_COPY;
  const flow = HUMAN_INVITE_PERSON_FLOW_COPY;
  const { projectName, onCancel } = props;

  return (
    <div className="space-y-4">
      <button type="button" className={INV_BACK_CLASS} onClick={onCancel}>
        ← {flow.backToPeople}
      </button>
      <section className={INV_CARD_CLASS} aria-labelledby="inv-person-h1">
        <header>
          <h3 className={INV_TITLE_CLASS} id="inv-person-h1">
            {copy.invitePersonTitle}
          </h3>
          <p className={INV_SUB_CLASS}>
            {withProjectName(copy.invitePersonIntro, projectName)}
          </p>
        </header>
        <AwcHumanInvitePersonForm {...props} />
      </section>
      <AwcHumanInviteWhatHappensNext />
    </div>
  );
}

"use client";

import { HUMAN_INVITE_PERSON_FLOW_COPY } from "@/features/projects/access/humanInvites/humanInvitePersonFlowCopy.constant";
import {
  INV_NEXT_CARD_CLASS,
  INV_NEXT_LIST_CLASS,
  INV_TITLE_CLASS,
} from "@/features/projects/access/humanInvites/invitePersonChromeClasses.constant";

/** What happens next card — Claude Invite-person HTML. */
export default function AwcHumanInviteWhatHappensNext() {
  const copy = HUMAN_INVITE_PERSON_FLOW_COPY;
  return (
    <section className={INV_NEXT_CARD_CLASS} aria-labelledby="inv-next-h">
      <h2 className={INV_TITLE_CLASS} id="inv-next-h" title={copy.whatHappensNextTip}>
        {copy.whatHappensNext}
      </h2>
      <ol className={INV_NEXT_LIST_CLASS}>
        <li>{copy.nextStep1}</li>
        <li>{copy.nextStep2}</li>
        <li>{copy.nextStep3}</li>
      </ol>
    </section>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";

import AwcProjectInviteAddAssistantControl from "@/features/projects/access/invites/AwcProjectInviteAddAssistantControl";
import type { AwcProjectInviteAddSelection } from "@/features/projects/access/invites/awcProjectInviteAddAssistantTypes";
import { createProjectInviteApi } from "@/features/projects/access/utils/projectAccessApi";
import { ONBOARDING_COPY as C } from "@/features/onboarding/onboardingCopy.constant";
import {
  OB_ACT_CLASS,
  OB_CARD_CLASS,
  OB_H1_CLASS,
  OB_LEAD_CLASS,
  OB_PRIMARY_BTN_CLASS,
  OB_SECONDARY_BTN_CLASS,
} from "@/features/onboarding/onboardingShellClasses.constant";
import { buildOnboardingStepHref } from "@/features/onboarding/utils/buildOnboardingStepHref";
import { mapProjectAccessError } from "@/lib/projects/acl/mapProjectAccessError";

interface OnboardingAddBotBodyProps {
  readonly projectId: string;
  readonly projectName: string;
}

/**
 * Reuses invite/add-assistant control (HARD: do not copy HTML tool-scan UI).
 * Live project Team invites stay available.
 */
export default function OnboardingAddBotBody({
  projectId,
  projectName,
}: OnboardingAddBotBodyProps) {
  const [message, setMessage] = useState<string | null>(null);
  const [inviteUrl, setInviteUrl] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const machineHref =
    buildOnboardingStepHref("machine", projectId) ?? "/onboarding/machine";
  const taskHref = buildOnboardingStepHref("task", projectId);

  const onCreate = async (selection: AwcProjectInviteAddSelection) => {
    setMessage(null);
    const result = await createProjectInviteApi(projectId, {
      autoApprove: false,
      ...(selection.platform === null ? {} : { platform: selection.platform }),
    });
    if (result.url) {
      setInviteUrl(result.url);
      setAdded(true);
      setMessage("Invite created — copy the link, then continue.");
      return;
    }
    setMessage(
      mapProjectAccessError(result.errorMessage, "Failed to create invite."),
    );
  };

  return (
    <section className={OB_CARD_CLASS} aria-labelledby="ob-h">
      <h1 id="ob-h" tabIndex={-1} className={OB_H1_CLASS}>
        {C.botTitle}
      </h1>
      <p className={OB_LEAD_CLASS}>{C.botLead(projectName)}</p>

      <AwcProjectInviteAddAssistantControl
        buttonClassName={OB_PRIMARY_BTN_CLASS}
        onCreate={(selection) => {
          void onCreate(selection);
        }}
      />

      {inviteUrl ? (
        <p className="break-all rounded-xl bg-awc-tile p-3 text-sm text-awc-fg">
          {inviteUrl}
        </p>
      ) : null}
      {message ? (
        <p className="text-sm text-awc-fg-muted" role="status">
          {message}
        </p>
      ) : null}

      <Link
        href={`/projects/${encodeURIComponent(projectId)}?tab=team`}
        className="text-sm font-medium text-awc-blue-700 underline-offset-2 hover:underline"
      >
        {C.botOpenTeam}
      </Link>

      <div className={OB_ACT_CLASS}>
        <Link href={machineHref} className={OB_SECONDARY_BTN_CLASS}>
          {C.back}
        </Link>
        {taskHref ? (
          <Link
            href={taskHref}
            className={OB_PRIMARY_BTN_CLASS}
            aria-disabled={!added ? true : undefined}
            title={added ? undefined : C.botNeedAdd}
            onClick={(event) => {
              if (!added) event.preventDefault();
            }}
          >
            {C.botContinue}
          </Link>
        ) : null}
      </div>
    </section>
  );
}

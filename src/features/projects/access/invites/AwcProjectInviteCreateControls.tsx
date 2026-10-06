"use client";

import { useState } from "react";

import { AWC_PROJECT_ACCESS_CTA } from "@/features/projects/access/awcProjectAccessCta.constant";
import AwcBotToBotSupportList from "@/features/projects/access/invites/AwcBotToBotSupportList";
import { AWC_PROJECT_INVITE_AUTO_APPROVE_COPY } from "@/features/projects/access/invites/awcProjectInviteAutoApproveCopy.constant";
import AwcProjectInviteAddAssistantControl from "@/features/projects/access/invites/AwcProjectInviteAddAssistantControl";
import type { AwcProjectInviteAddSelection } from "@/features/projects/access/invites/awcProjectInviteAddAssistantTypes";

interface AwcProjectInviteCreateControlsProps {
  readonly onCreate: (
    selection: AwcProjectInviteAddSelection,
    autoApprove: boolean,
  ) => void;
}

/** Create invite: shared "Add assistant" + optional type + auto-approve (owner-only, default off). */
export default function AwcProjectInviteCreateControls({
  onCreate,
}: AwcProjectInviteCreateControlsProps) {
  const [autoApprove, setAutoApprove] = useState(false);
  const copy = AWC_PROJECT_INVITE_AUTO_APPROVE_COPY;

  return (
    <div className="mt-2">
      <label className="mb-3 flex cursor-pointer items-start gap-2 text-sm text-gray-700 dark:text-white/80">
        <input
          type="checkbox"
          className="mt-1"
          checked={autoApprove}
          onChange={(event) => setAutoApprove(event.target.checked)}
          data-invite-auto-approve=""
        />
        <span>
          <span className="font-medium">{copy.checkboxLabel}</span>
          <span className="mt-0.5 block text-xs text-gray-500 dark:text-white/50">
            {copy.checkboxHelp}
          </span>
        </span>
      </label>
      <AwcProjectInviteAddAssistantControl
        buttonClassName={AWC_PROJECT_ACCESS_CTA.primary}
        onCreate={(selection) => onCreate(selection, autoApprove)}
      />
      <AwcBotToBotSupportList />
    </div>
  );
}

"use client";

import { useState } from "react";

import { AWC_PROJECT_ACCESS_CTA } from "@/features/projects/access/awcProjectAccessCta.constant";
import AwcBotToBotSupportList from "@/features/projects/access/invites/AwcBotToBotSupportList";
import { AWC_PROJECT_INVITE_AUTO_APPROVE_COPY } from "@/features/projects/access/invites/awcProjectInviteAutoApproveCopy.constant";
import {
  AWC_PROJECT_INVITE_PLATFORM_COPY,
  AWC_PROJECT_INVITE_PLATFORMS,
} from "@/features/projects/access/invites/awcProjectInvitePlatformCopy.constant";
import type { ProjectInvitePlatform } from "@/features/projects/access/invites/projectInvitePlatform.type";

interface AwcProjectInviteCreateControlsProps {
  readonly onCreate: (
    platform: ProjectInvitePlatform,
    autoApprove: boolean,
  ) => void;
}

/** Create invite: platform buttons + optional auto-approve (owner-only, default off). */
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
      <div className="flex flex-wrap gap-2">
        {AWC_PROJECT_INVITE_PLATFORMS.map((platform) => (
          <button
            key={platform}
            type="button"
            data-invite-platform={platform}
            className={AWC_PROJECT_ACCESS_CTA.primary}
            onClick={() => onCreate(platform, autoApprove)}
          >
            {AWC_PROJECT_INVITE_PLATFORM_COPY[platform].create}
          </button>
        ))}
      </div>
      <AwcBotToBotSupportList />
    </div>
  );
}

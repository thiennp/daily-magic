"use client";

import { useState } from "react";
import { twMerge } from "tailwind-merge";

import AwcProjectAccessPanelBody from "@/features/projects/access/AwcProjectAccessPanelBody";
import AwcProjectActivityFeed from "@/features/projects/access/AwcProjectActivityFeed";
import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";
import { useAwcProjectAccess } from "@/features/projects/access/hooks/useAwcProjectAccess";
import { APP_SURFACE_BODY_TEXT_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";

interface AwcProjectAccessPanelProps {
  readonly projectId: string;
  readonly className?: string;
}

export default function AwcProjectAccessPanel({
  projectId,
  className = "",
}: AwcProjectAccessPanelProps) {
  const access = useAwcProjectAccess(projectId);
  const [activityRefreshSignal, setActivityRefreshSignal] = useState(0);
  const bump = () => setActivityRefreshSignal((v) => v + 1);
  const copy = AWC_PROJECT_ACCESS_COPY;

  const clearCreatedInvite = () => {
    access.setCreatedInviteUrl(null);
    access.setCreatedInviteToken(null);
  };

  return (
    <section
      className={twMerge(
        "mt-8 space-y-4 rounded-xl border border-gray-200/80 p-4 dark:border-gray-800/80",
        className,
      )}
    >
      <h2 className="text-base font-semibold text-gray-900 dark:text-white">
        {copy.title}
      </h2>
      <p className={`text-sm ${APP_SURFACE_BODY_TEXT_CLASS}`}>{copy.intro}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400">{copy.revokeHint}</p>
      <p className="rounded-md border border-gray-200/80 bg-gray-50/80 px-3 py-2 text-xs text-gray-700 dark:border-gray-800/80 dark:bg-gray-950/40 dark:text-gray-300">
        {copy.firstConnectNote}
      </p>

      {access.isLoading ? (
        <p className="text-sm text-gray-500">{copy.loading}</p>
      ) : null}

      {access.loadError ? (
        <p className="rounded-md border border-amber-200/80 bg-amber-50/80 px-3 py-2 text-sm text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-100">
          {/owner|forbidden/i.test(access.loadError)
            ? copy.forbidden
            : access.loadError}
        </p>
      ) : null}

      {!access.isLoading && !access.loadError ? (
        <AwcProjectAccessPanelBody
          projectId={projectId}
          access={access}
          bump={bump}
          clearCreatedInvite={clearCreatedInvite}
        />
      ) : null}

      {access.message ? (
        <p className="text-sm text-gray-600 dark:text-gray-300">{access.message}</p>
      ) : null}
      <AwcProjectActivityFeed
        projectId={projectId}
        refreshSignal={activityRefreshSignal}
      />
    </section>
  );
}

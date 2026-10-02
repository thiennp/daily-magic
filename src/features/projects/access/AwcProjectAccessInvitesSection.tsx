"use client";

import { useCallback, useEffect, useState } from "react";

import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";
import type { AwcInviteCreateResponse, AwcInviteListItem } from "@/features/projects/access/types/awcProjectAccessContract.type";
import {
  createProjectInvite,
  fetchProjectInvites,
  revokeProjectInvite,
} from "@/features/projects/access/utils/projectInvitesApi";

interface AwcProjectAccessInvitesSectionProps {
  readonly projectId: string;
  readonly onChanged?: () => void;
}

export default function AwcProjectAccessInvitesSection({
  projectId,
  onChanged,
}: AwcProjectAccessInvitesSectionProps) {
  const copy = AWC_PROJECT_ACCESS_COPY;
  const [invites, setInvites] = useState<readonly AwcInviteListItem[]>([]);
  const [freshInvite, setFreshInvite] = useState<AwcInviteCreateResponse | null>(
    null,
  );
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [apiGap, setApiGap] = useState(false);

  const reload = useCallback(async () => {
    setIsLoading(true);
    const result = await fetchProjectInvites(projectId);
    if (result.ok) {
      setInvites(result.invites);
      setApiGap(false);
    } else {
      setInvites([]);
      setApiGap(true);
      setMessage(result.errorMessage || copy.invitesLoadError);
    }
    setIsLoading(false);
  }, [projectId, copy.invitesLoadError]);

  useEffect(() => {
    void reload();
  }, [reload]);

  const onCreate = async () => {
    setIsCreating(true);
    setMessage(null);
    const result = await createProjectInvite(projectId, {
      maxUses: 1,
      expiresInDays: 7,
    });
    setIsCreating(false);
    if (!result.ok) {
      setApiGap(result.status === 404 || result.status === 501 || result.status === 0);
      setMessage(result.errorMessage || copy.invitesCreateError);
      return;
    }
    setFreshInvite(result.invite);
    setMessage(copy.invitesCreatedOnce);
    await reload();
    onChanged?.();
  };

  const onCopy = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setMessage(copy.invitesCopied);
    } catch {
      setMessage("Could not copy — select the URL manually.");
    }
  };

  const onRevoke = async (inviteId: string) => {
    const result = await revokeProjectInvite(projectId, inviteId);
    if (!result.ok) {
      setMessage(result.errorMessage || copy.invitesRevokeError);
      return;
    }
    if (freshInvite?.inviteId === inviteId) {
      setFreshInvite(null);
    }
    await reload();
    onChanged?.();
  };

  return (
    <div id="project-access-invites">
      <h3 className="text-sm font-medium text-gray-800 dark:text-white/90">
        {copy.invitesHeading}
      </h3>
      <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
        {copy.invitesIntro}
      </p>
      <p className="mt-1 text-xs text-gray-500">{copy.invitesDefaults}</p>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <button
          type="button"
          className="rounded-md bg-brand-600 px-2 py-1 text-xs text-white disabled:opacity-50"
          disabled={isCreating}
          onClick={() => void onCreate()}
        >
          {isCreating ? copy.invitesCreating : copy.invitesCreate}
        </button>
      </div>
      {freshInvite ? (
        <div className="mt-2 rounded-md border border-amber-300/80 bg-amber-50/80 px-3 py-2 text-xs dark:border-amber-700/60 dark:bg-amber-950/30">
          <p className="font-medium text-amber-900 dark:text-amber-200">
            {copy.invitesCreatedOnce}
          </p>
          <p className="mt-1 break-all font-mono text-amber-950 dark:text-amber-100">
            {freshInvite.url}
          </p>
          <button
            type="button"
            className="mt-2 rounded-md border border-amber-400 px-2 py-1 text-xs"
            onClick={() => void onCopy(freshInvite.url)}
          >
            {copy.invitesCopyUrl}
          </button>
        </div>
      ) : null}
      {isLoading ? (
        <p className="mt-2 text-xs text-gray-400">Loading invites…</p>
      ) : invites.length === 0 ? (
        <p className="mt-2 text-sm text-gray-500">
          {apiGap ? copy.invitesLoadError : copy.invitesEmpty}
        </p>
      ) : (
        <ul className="mt-2 space-y-2">
          {invites.map((invite) => (
            <li
              key={invite.inviteId}
              className="flex flex-wrap items-center justify-between gap-2 text-sm"
            >
              <span className="text-gray-800 dark:text-white/90">
                {invite.inviteId.slice(0, 8)}…
                {invite.teamLabel ? ` · ${invite.teamLabel}` : ""}
                {" · "}
                uses {invite.usesRemaining}/{invite.maxUses}
                {invite.revokedAt ? " · revoked" : ""}
              </span>
              {!invite.revokedAt && invite.usesRemaining > 0 ? (
                <button
                  type="button"
                  className="rounded-md border border-red-300 px-2 py-1 text-xs text-red-700"
                  onClick={() => void onRevoke(invite.inviteId)}
                >
                  {copy.invitesRevoke}
                </button>
              ) : null}
            </li>
          ))}
        </ul>
      )}
      {message ? (
        <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">{message}</p>
      ) : null}
    </div>
  );
}

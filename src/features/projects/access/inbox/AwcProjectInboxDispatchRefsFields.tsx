"use client";

import { useId } from "react";

import { AWC_PROJECT_INBOX_COPY } from "@/features/projects/access/inbox/awcProjectInboxCopy.constant";
import { AwcBotSupportUrlKindLabel } from "@/features/projects/botSupportUrl/public-api/presentation";

const FIELD =
  "mt-1 w-full rounded-md border border-awc-border-strong bg-white px-2 py-1.5 text-xs dark:border-gray-700 dark:bg-gray-950";

interface AwcProjectInboxDispatchRefsFieldsProps {
  readonly prUrl: string;
  readonly commitSha: string;
  readonly localPath: string;
  readonly allowClaimId: string;
  readonly onPrUrl: (value: string) => void;
  readonly onCommitSha: (value: string) => void;
  readonly onLocalPath: (value: string) => void;
  readonly onAllowClaimId: (value: string) => void;
}

export default function AwcProjectInboxDispatchRefsFields({
  prUrl,
  commitSha,
  localPath,
  allowClaimId,
  onPrUrl,
  onCommitSha,
  onLocalPath,
  onAllowClaimId,
}: AwcProjectInboxDispatchRefsFieldsProps) {
  const copy = AWC_PROJECT_INBOX_COPY;
  const idBase = useId();
  const prUrlId = `${idBase}-prUrl`;
  const commitShaId = `${idBase}-commitSha`;
  const localPathId = `${idBase}-localPath`;
  const allowClaimIdField = `${idBase}-allowClaimId`;

  return (
    <div className="space-y-1.5">
      <p className="text-[11px] font-medium text-awc-fg-muted dark:text-gray-400">
        {copy.dispatchRefsHeading}
      </p>
      <AwcBotSupportUrlKindLabel url={prUrl} />
      <label
        className="block text-xs text-awc-fg-muted dark:text-gray-400"
        htmlFor={prUrlId}
      >
        {copy.dispatchPrUrlLabel}
        <input
          id={prUrlId}
          className={FIELD}
          value={prUrl}
          placeholder={copy.dispatchPrUrlPlaceholder}
          onChange={(event) => onPrUrl(event.target.value)}
        />
      </label>
      <label
        className="block text-xs text-awc-fg-muted dark:text-gray-400"
        htmlFor={commitShaId}
      >
        {copy.dispatchCommitShaLabel}
        <input
          id={commitShaId}
          className={FIELD}
          value={commitSha}
          placeholder={copy.dispatchCommitShaPlaceholder}
          onChange={(event) => onCommitSha(event.target.value)}
        />
      </label>
      <label
        className="block text-xs text-awc-fg-muted dark:text-gray-400"
        htmlFor={localPathId}
      >
        {copy.dispatchLocalPathLabel}
        <input
          id={localPathId}
          className={FIELD}
          value={localPath}
          placeholder={copy.dispatchLocalPathPlaceholder}
          onChange={(event) => onLocalPath(event.target.value)}
        />
      </label>
      <label
        className="block text-xs text-awc-fg-muted dark:text-gray-400"
        htmlFor={allowClaimIdField}
      >
        {copy.dispatchAllowClaimIdLabel}
        <input
          id={allowClaimIdField}
          className={FIELD}
          value={allowClaimId}
          placeholder={copy.dispatchAllowClaimIdPlaceholder}
          onChange={(event) => onAllowClaimId(event.target.value)}
        />
      </label>
    </div>
  );
}

"use client";

import { AWC_PROJECT_INBOX_COPY } from "@/features/projects/access/inbox/awcProjectInboxCopy.constant";
import AwcBotSupportUrlKindLabel from "@/features/projects/botSupportUrl/AwcBotSupportUrlKindLabel";

const FIELD =
  "mt-1 w-full rounded-md border border-gray-300 bg-white px-2 py-1.5 text-xs dark:border-gray-700 dark:bg-gray-950";

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
  return (
    <div className="space-y-1.5">
      <p className="text-[11px] font-medium text-gray-600 dark:text-gray-400">
        {copy.dispatchRefsHeading}
      </p>
      <AwcBotSupportUrlKindLabel url={prUrl} />
      <input
        className={FIELD}
        value={prUrl}
        placeholder={copy.dispatchPrUrl}
        onChange={(event) => onPrUrl(event.target.value)}
      />
      <input
        className={FIELD}
        value={commitSha}
        placeholder={copy.dispatchCommitSha}
        onChange={(event) => onCommitSha(event.target.value)}
      />
      <input
        className={FIELD}
        value={localPath}
        placeholder={copy.dispatchLocalPath}
        onChange={(event) => onLocalPath(event.target.value)}
      />
      <input
        className={FIELD}
        value={allowClaimId}
        placeholder={copy.dispatchAllowClaimId}
        onChange={(event) => onAllowClaimId(event.target.value)}
      />
    </div>
  );
}

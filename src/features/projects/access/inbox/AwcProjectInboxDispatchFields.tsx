"use client";

import { AWC_PROJECT_INBOX_COPY } from "@/features/projects/access/inbox/awcProjectInboxCopy.constant";
import AwcProjectInboxDispatchRefsFields from "@/features/projects/access/inbox/AwcProjectInboxDispatchRefsFields";
import type { InboxDispatchPeerOption } from "@/features/projects/access/inbox/utils/inboxDispatchPeerOptions";

const FIELD =
  "mt-1 w-full rounded-md border border-gray-300 bg-white px-2 py-1.5 text-xs dark:border-gray-700 dark:bg-gray-950";

interface AwcProjectInboxDispatchFieldsProps {
  readonly peers: readonly InboxDispatchPeerOption[];
  readonly peerMembershipId: string;
  readonly summary: string;
  readonly kind: string;
  readonly prUrl: string;
  readonly commitSha: string;
  readonly localPath: string;
  readonly allowClaimId: string;
  readonly onPeerMembershipId: (value: string) => void;
  readonly onSummary: (value: string) => void;
  readonly onKind: (value: string) => void;
  readonly onPrUrl: (value: string) => void;
  readonly onCommitSha: (value: string) => void;
  readonly onLocalPath: (value: string) => void;
  readonly onAllowClaimId: (value: string) => void;
}

export default function AwcProjectInboxDispatchFields({
  peers,
  peerMembershipId,
  summary,
  kind,
  prUrl,
  commitSha,
  localPath,
  allowClaimId,
  onPeerMembershipId,
  onSummary,
  onKind,
  onPrUrl,
  onCommitSha,
  onLocalPath,
  onAllowClaimId,
}: AwcProjectInboxDispatchFieldsProps) {
  const copy = AWC_PROJECT_INBOX_COPY;
  return (
    <>
      <label className="block text-xs text-gray-600 dark:text-gray-400">
        {copy.dispatchPeerLabel}
        <select
          className={FIELD}
          value={peerMembershipId}
          onChange={(event) => onPeerMembershipId(event.target.value)}
        >
          <option value="">{copy.dispatchPeerPlaceholder}</option>
          {peers.map((peer) => (
            <option key={peer.membershipId} value={peer.membershipId}>
              {peer.projectDisplayName}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-xs text-gray-600 dark:text-gray-400">
        {copy.dispatchSummaryLabel}
        <textarea
          className={FIELD}
          rows={2}
          maxLength={200}
          value={summary}
          placeholder={copy.dispatchSummaryPlaceholder}
          onChange={(event) => onSummary(event.target.value)}
        />
      </label>
      <label className="block text-xs text-gray-600 dark:text-gray-400">
        {copy.dispatchKindLabel}
        <input
          className={FIELD}
          value={kind}
          placeholder={copy.dispatchKindPlaceholder}
          onChange={(event) => onKind(event.target.value)}
        />
      </label>
      <AwcProjectInboxDispatchRefsFields
        prUrl={prUrl}
        commitSha={commitSha}
        localPath={localPath}
        allowClaimId={allowClaimId}
        onPrUrl={onPrUrl}
        onCommitSha={onCommitSha}
        onLocalPath={onLocalPath}
        onAllowClaimId={onAllowClaimId}
      />
    </>
  );
}

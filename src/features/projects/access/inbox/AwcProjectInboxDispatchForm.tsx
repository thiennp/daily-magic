"use client";

import { useState } from "react";

import { AWC_PROJECT_ACCESS_CTA } from "@/features/projects/access/awcProjectAccessCta.constant";
import { AWC_PROJECT_INBOX_COPY } from "@/features/projects/access/inbox/awcProjectInboxCopy.constant";
import AwcProjectInboxDispatchFields from "@/features/projects/access/inbox/AwcProjectInboxDispatchFields";
import AwcProjectInboxDispatchStatus from "@/features/projects/access/inbox/AwcProjectInboxDispatchStatus";
import { useAwcProjectInboxDispatchClientSend } from "@/features/projects/access/inbox/hooks/useAwcProjectInboxDispatchClientSend";
import type AwcProjectInboxMessage from "@/features/projects/access/inbox/types/awcProjectInboxMessage.type";
import { buildInboxDispatchRefs } from "@/features/projects/access/inbox/utils/buildInboxDispatchRefs";
import { dispatchProjectInboxMessage } from "@/features/projects/access/inbox/utils/dispatchProjectInboxMessage";
import { inboxDispatchPeerOptions } from "@/features/projects/access/inbox/utils/inboxDispatchPeerOptions";
import { mapInboxDispatchError } from "@/features/projects/access/inbox/utils/mapInboxDispatchError";
import type { AccessMembershipView } from "@/features/projects/access/utils/projectAccessApi.types";

interface AwcProjectInboxDispatchFormProps {
  readonly projectId: string;
  readonly members: readonly AccessMembershipView[];
  readonly messages: readonly AwcProjectInboxMessage[];
}

const SUMMARY_MAX = 200;

export default function AwcProjectInboxDispatchForm({
  projectId,
  members,
  messages,
}: AwcProjectInboxDispatchFormProps) {
  const copy = AWC_PROJECT_INBOX_COPY;
  const peers = inboxDispatchPeerOptions(members);
  const send = useAwcProjectInboxDispatchClientSend(messages);
  const [peerMembershipId, setPeerMembershipId] = useState("");
  const [summary, setSummary] = useState("");
  const [kind, setKind] = useState("");
  const [prUrl, setPrUrl] = useState("");
  const [commitSha, setCommitSha] = useState("");
  const [localPath, setLocalPath] = useState("");
  const [allowClaimId, setAllowClaimId] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (text: string) => {
    setToast(text);
    window.setTimeout(() => setToast(null), 2800);
  };

  const onSubmit = () => {
    if (send.isInFlight) return;
    const trimmed = summary.trim();
    if (
      peerMembershipId.length === 0 ||
      trimmed.length === 0 ||
      trimmed.length > SUMMARY_MAX
    ) {
      showToast(copy.dispatchInvalid);
      return;
    }
    send.markInFlight();
    void dispatchProjectInboxMessage({
      projectId,
      toMembershipId: peerMembershipId,
      summary: trimmed,
      kind: kind.trim() || undefined,
      refs: buildInboxDispatchRefs({ prUrl, commitSha, localPath, allowClaimId }),
    }).then((result) => {
      if (result.ok) {
        setSummary("");
        send.markAccepted(result.messageId);
        showToast(copy.dispatchSuccess);
        return;
      }
      send.markIdle();
      showToast(mapInboxDispatchError(result));
    });
  };

  if (peers.length === 0) {
    return <p className="text-xs text-awc-fg-muted">{copy.dispatchPeerEmpty}</p>;
  }

  return (
    <div className="space-y-2 border-t border-awc-border/70 pt-3 dark:border-gray-800/70">
      <h4 className="text-xs font-semibold uppercase tracking-wide text-awc-fg-muted dark:text-gray-300">
        {copy.dispatchHeading}
      </h4>
      <p className="text-xs text-awc-fg-muted dark:text-gray-400">{copy.dispatchIntro}</p>
      <AwcProjectInboxDispatchFields
        peers={peers}
        peerMembershipId={peerMembershipId}
        summary={summary}
        kind={kind}
        prUrl={prUrl}
        commitSha={commitSha}
        localPath={localPath}
        allowClaimId={allowClaimId}
        onPeerMembershipId={setPeerMembershipId}
        onSummary={setSummary}
        onKind={setKind}
        onPrUrl={setPrUrl}
        onCommitSha={setCommitSha}
        onLocalPath={setLocalPath}
        onAllowClaimId={setAllowClaimId}
      />
      <button
        type="button"
        className={AWC_PROJECT_ACCESS_CTA.primary}
        disabled={send.isInFlight}
        onClick={onSubmit}
      >
        {copy.dispatchSubmit}
      </button>
      <AwcProjectInboxDispatchStatus
        statusText={send.statusText}
        toast={toast}
      />
    </div>
  );
}

"use client";

import { useState } from "react";

import { AWC_PROJECT_ACCESS_CTA } from "@/features/projects/access/awcProjectAccessCta.constant";
import { AWC_PROJECT_INBOX_COPY } from "@/features/projects/access/inbox/awcProjectInboxCopy.constant";
import AwcProjectInboxDispatchFields from "@/features/projects/access/inbox/AwcProjectInboxDispatchFields";
import { buildInboxDispatchRefs } from "@/features/projects/access/inbox/utils/buildInboxDispatchRefs";
import { dispatchProjectInboxMessage } from "@/features/projects/access/inbox/utils/dispatchProjectInboxMessage";
import { inboxDispatchPeerOptions } from "@/features/projects/access/inbox/utils/inboxDispatchPeerOptions";
import { mapInboxDispatchError } from "@/features/projects/access/inbox/utils/mapInboxDispatchError";
import type { AccessMembershipView } from "@/features/projects/access/utils/projectAccessApi.types";

interface AwcProjectInboxDispatchFormProps {
  readonly projectId: string;
  readonly members: readonly AccessMembershipView[];
}

const SUMMARY_MAX = 200;

export default function AwcProjectInboxDispatchForm({
  projectId,
  members,
}: AwcProjectInboxDispatchFormProps) {
  const copy = AWC_PROJECT_INBOX_COPY;
  const peers = inboxDispatchPeerOptions(members);
  const [peerName, setPeerName] = useState("");
  const [summary, setSummary] = useState("");
  const [kind, setKind] = useState("");
  const [prUrl, setPrUrl] = useState("");
  const [commitSha, setCommitSha] = useState("");
  const [localPath, setLocalPath] = useState("");
  const [allowClaimId, setAllowClaimId] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const showToast = (text: string) => {
    setToast(text);
    window.setTimeout(() => setToast(null), 2800);
  };

  const onSubmit = () => {
    if (busy) return;
    const trimmed = summary.trim();
    if (
      peerName.length === 0 ||
      trimmed.length === 0 ||
      trimmed.length > SUMMARY_MAX
    ) {
      showToast(copy.dispatchInvalid);
      return;
    }
    setBusy(true);
    void dispatchProjectInboxMessage({
      projectId,
      toProjectDisplayName: peerName,
      summary: trimmed,
      kind: kind.trim() || undefined,
      refs: buildInboxDispatchRefs({ prUrl, commitSha, localPath, allowClaimId }),
    }).then((result) => {
      setBusy(false);
      if (result.ok) {
        setSummary("");
        showToast(copy.dispatchSuccess);
        return;
      }
      showToast(mapInboxDispatchError(result));
    });
  };

  if (peers.length === 0) {
    return <p className="text-xs text-gray-500">{copy.dispatchPeerEmpty}</p>;
  }

  return (
    <div className="space-y-2 border-t border-gray-200/70 pt-3 dark:border-gray-800/70">
      <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300">
        {copy.dispatchHeading}
      </h4>
      <p className="text-xs text-gray-500 dark:text-gray-400">{copy.dispatchIntro}</p>
      <AwcProjectInboxDispatchFields
        peers={peers}
        peerName={peerName}
        summary={summary}
        kind={kind}
        prUrl={prUrl}
        commitSha={commitSha}
        localPath={localPath}
        allowClaimId={allowClaimId}
        onPeerName={setPeerName}
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
        disabled={busy}
        onClick={onSubmit}
      >
        {copy.dispatchSubmit}
      </button>
      {toast ? (
        <p className="text-[11px] font-medium text-gray-700 dark:text-gray-200">
          {toast}
        </p>
      ) : null}
    </div>
  );
}

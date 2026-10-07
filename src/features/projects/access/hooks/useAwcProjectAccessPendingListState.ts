"use client";

import { useEffect, useState } from "react";

import type { PendingBusy } from "@/features/projects/access/approvalCard/AwcPendingRequestActions";
import {
  pendingAssistantName,
  type PendingDecision,
} from "@/features/projects/access/approvalCard/formatPendingApprovalCard";
import { pendingNicknameDefault } from "@/features/projects/access/approvalCard/pendingNickname";
import type { AwcProjectAccessPending } from "@/features/projects/access/hooks/loadAwcProjectAccess";
import { runPendingApprove } from "@/features/projects/access/runPendingApprove";
import { fetchDisplayNamePresets } from "@/features/projects/access/utils/projectAccessApi";

export type AwcPendingResolved = {
  readonly id: string;
  readonly decision: PendingDecision;
  readonly nickname: string;
  readonly requester: string;
};

export type AwcPendingListActions = {
  readonly onApprove: (
    requestId: string,
    projectDisplayName?: string,
  ) => Promise<{ readonly ok: boolean; readonly errorMessage?: string }>;
  /** Resolve true on success to show the denied row. */
  readonly onDeny: (requestId: string) => void | Promise<boolean>;
};

const withoutKey = (
  record: Record<string, string>,
  id: string,
): Record<string, string> =>
  Object.fromEntries(Object.entries(record).filter(([key]) => key !== id));

/** Pending list state: names, inline errors, busy flags, resolved rows, presets. */
export const useAwcProjectAccessPendingListState = ({
  projectId,
  pending,
  onApprove,
  onDeny,
}: AwcPendingListActions & {
  readonly projectId: string;
  readonly pending: readonly AwcProjectAccessPending[];
}) => {
  const [names, setNames] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState<Record<string, PendingBusy>>({});
  const [resolved, setResolved] = useState<readonly AwcPendingResolved[]>([]);
  const [suggested, setSuggested] = useState<string>("");
  const [available, setAvailable] = useState<readonly string[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    void fetchDisplayNamePresets(projectId).then((payload) => {
      if (controller.signal.aborted) return;
      setAvailable(payload.available ?? payload.presets ?? []);
      setSuggested(payload.suggested ?? "");
    });
    return () => controller.abort();
  }, [projectId, pending.length]);

  // Typed → requesterLabel → suggestedProjectDisplayName → free preset.
  const nameFor = (req: AwcProjectAccessPending): string =>
    names[req.id] ?? pendingNicknameDefault(req, suggested);
  const setBusyFor = (id: string, value: PendingBusy) =>
    setBusy((b) => ({ ...b, [id]: value }));
  const resolve = (entry: AwcPendingResolved) =>
    setResolved((r) => [...r.filter((x) => x.id !== entry.id), entry]);
  const setErrorFor = (id: string, message: string | null) =>
    setErrors((e) => (message === null ? withoutKey(e, id) : { ...e, [id]: message }));

  const changeName = (id: string, value: string) => {
    setNames((n) => ({ ...n, [id]: value }));
    setErrorFor(id, null);
  };

  const deny = (req: AwcProjectAccessPending) => {
    setBusyFor(req.id, "denying");
    void Promise.resolve(onDeny(req.id)).then((ok) => {
      setBusyFor(req.id, null);
      if (ok !== true) return;
      const requester = pendingAssistantName(req);
      resolve({ id: req.id, decision: "denied", nickname: nameFor(req), requester });
    });
  };

  const approve = (req: AwcProjectAccessPending) => {
    const needsName = req.requesterIsAgent !== false;
    const nickname = nameFor(req).trim();
    setBusyFor(req.id, "approving");
    void runPendingApprove({
      requestId: req.id,
      needsName,
      nameValue: nickname,
      onApprove,
      setError: (message) => setErrorFor(req.id, message),
    }).then((ok) => {
      setBusyFor(req.id, null);
      if (!ok) return;
      const requester = pendingAssistantName(req);
      resolve({
        id: req.id,
        decision: "approved",
        nickname: needsName ? nickname : requester,
        requester,
      });
    });
  };

  return { names, errors, busy, resolved, available, nameFor, changeName, deny, approve };
};

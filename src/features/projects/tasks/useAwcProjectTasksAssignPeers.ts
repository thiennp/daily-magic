"use client";

import { useCallback, useEffect, useState } from "react";

import {
  inboxDispatchPeerOptions,
  type InboxDispatchPeerOption,
} from "@/features/projects/access/inbox/utils/inboxDispatchPeerOptions";
import {
  buildAssignAgentOptions,
  type AssignAgentOption,
} from "@/features/projects/tasks/utils/buildAssignAgentOptions";
import { fetchProjectAccess } from "@/features/projects/access/utils/fetchProjectAccess";
import { PROJECT_PAGE_TASKS_COPY as C } from "@/features/projects/tasks/projectPageTasksCopy.constant";

/** Assign dialog assistants: loads dispatch peers while open; first peer preselected. */
export const useAwcProjectTasksAssignPeers = (input: {
  readonly open: boolean;
  readonly projectId: string;
}) => {
  const { open, projectId } = input;
  const [peers, setPeers] = useState<readonly InboxDispatchPeerOption[]>([]);
  const [peersLoading, setPeersLoading] = useState(false);
  const [peersError, setPeersError] = useState<string | null>(null);
  const [agentOptions, setAgentOptions] = useState<
    readonly AssignAgentOption[]
  >([]);
  const [optionId, setOptionId] = useState("");

  /** Called from the dialog's render-time open seed. */
  const resetPeers = useCallback(() => {
    setPeersError(null);
    setPeers([]);
    setAgentOptions([]);
    setOptionId("");
    setPeersLoading(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const controller = new AbortController();
    const fail = () => {
      if (controller.signal.aborted) return;
      setPeersError(C.assignPeersLoadFailed);
      setPeersLoading(false);
    };
    // Abort rejects with AbortError → fail() returns early (signal aborted).
    void fetchProjectAccess(projectId, controller.signal)
      .then((access) => {
        if (controller.signal.aborted) return;
        if (!access.ok || access.members === undefined) {
          fail();
          return;
        }
        const next = inboxDispatchPeerOptions(access.members);
        setPeers(next);
        const options = buildAssignAgentOptions(access.members);
        setAgentOptions(options);
        setOptionId(options.find((o) => !o.disabled)?.optionId ?? "");
        setPeersLoading(false);
      })
      .catch(fail);
    return () => controller.abort();
  }, [open, projectId]);

  const selectedOption = agentOptions.find((o) => o.optionId === optionId);
  return {
    peers,
    peersLoading,
    peersError,
    agentOptions,
    selectedOption,
    optionId,
    setOptionId,
    assistantId: selectedOption?.membershipId ?? "",
    resetPeers,
  };
};

"use client";

import { useCallback, useState } from "react";

import {
  formatPendingDecisionToast,
  pendingAssistantName,
} from "@/features/projects/access/approvalCard/formatPendingApprovalCard";
import type { AwcProjectAccessPending } from "@/features/projects/access/hooks/loadAwcProjectAccess";

type ApproveResult = { readonly ok: boolean; readonly errorMessage?: string };

/** COPY.md approved/denied toast, set only after the owner's action succeeds. */
export const usePendingDecisionNote = () => {
  const [note, setNote] = useState<string | null>(null);

  const approve = useCallback(
    async (
      assistantName: string,
      run: () => Promise<ApproveResult>,
    ): Promise<ApproveResult> => {
      setNote(null);
      const result = await run();
      if (result.ok) {
        setNote(formatPendingDecisionToast("approved", assistantName));
      }
      return result;
    },
    [],
  );

  const deny = useCallback(
    async (
      req: AwcProjectAccessPending,
      run: () => void | Promise<boolean>,
    ): Promise<void> => {
      setNote(null);
      const ok = await run();
      if (ok === true) {
        setNote(
          formatPendingDecisionToast("denied", pendingAssistantName(req)),
        );
      }
    },
    [],
  );

  return { note, approve, deny };
};

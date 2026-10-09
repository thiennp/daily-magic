"use client";

import { useState } from "react";

import { setBotRestrictionsApi } from "@/features/projects/access/utils/botManagementApi";

/** State + actions behind one assistant's block / only-I-can-message switches. */
export const useHelperBotLocks = (input: {
  readonly projectId: string;
  readonly membershipId: string;
  readonly onChanged: () => void;
}) => {
  const [confirming, setConfirming] = useState(false);
  const [failed, setFailed] = useState(false);
  const change = async (next: {
    readonly isolated?: boolean;
    readonly closed?: boolean;
  }): Promise<void> => {
    setFailed(false);
    const ok = await setBotRestrictionsApi(
      input.projectId,
      input.membershipId,
      next,
    );
    setConfirming(false);
    if (ok) input.onChanged();
    else setFailed(true);
  };
  return { confirming, setConfirming, failed, change };
};

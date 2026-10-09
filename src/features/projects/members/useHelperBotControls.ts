"use client";

import { useState } from "react";

import {
  sendBotGuidanceApi,
  setBotIsolatedApi,
} from "@/features/projects/access/utils/botManagementApi";

type GuidanceState = "idle" | "sending" | "sent" | "failed";

/** State + actions behind one assistant's block switch and Update guidance button. */
export const useHelperBotControls = (input: {
  readonly projectId: string;
  readonly membershipId: string;
  readonly onChanged: () => void;
}) => {
  const [guidance, setGuidance] = useState<GuidanceState>("idle");
  const [confirming, setConfirming] = useState(false);
  const [changeFailed, setChangeFailed] = useState(false);
  const setBlocked = async (next: boolean): Promise<void> => {
    setChangeFailed(false);
    const ok = await setBotIsolatedApi(
      input.projectId,
      input.membershipId,
      next,
    );
    setConfirming(false);
    if (ok) input.onChanged();
    else setChangeFailed(true);
  };
  const updateGuidance = async (): Promise<void> => {
    setGuidance("sending");
    const ok = await sendBotGuidanceApi(input.projectId, input.membershipId);
    setGuidance(ok ? "sent" : "failed");
  };
  return {
    guidance,
    confirming,
    setConfirming,
    changeFailed,
    setBlocked,
    updateGuidance,
  };
};

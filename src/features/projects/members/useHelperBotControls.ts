"use client";

import { useState } from "react";

import { sendBotGuidanceApi } from "@/features/projects/access/utils/botManagementApi";

type GuidanceState = "idle" | "sending" | "sent" | "failed";

/** State + action behind one assistant's Update guidance button. */
export const useHelperBotControls = (input: {
  readonly projectId: string;
  readonly membershipId: string;
}) => {
  const [guidance, setGuidance] = useState<GuidanceState>("idle");
  const updateGuidance = async (): Promise<void> => {
    setGuidance("sending");
    const ok = await sendBotGuidanceApi(input.projectId, input.membershipId);
    setGuidance(ok ? "sent" : "failed");
  };
  return { guidance, updateGuidance };
};

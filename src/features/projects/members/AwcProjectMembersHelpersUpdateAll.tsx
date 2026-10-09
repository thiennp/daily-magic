"use client";

import { useState } from "react";

import { sendBotGuidanceApi } from "@/features/projects/access/utils/botManagementApi";
import { BOT_CONTROLS_LINK_CLASS as LINK } from "@/features/projects/members/botControlsClasses.constant";
import { BOT_MANAGEMENT_COPY as C } from "@/features/projects/members/botManagementCopy.constant";

/**
 * Header action of the Assistants card: send new guidance to every assistant
 * the viewer manages that has not fetched it yet. Shown from 2 outdated up.
 */
export default function AwcProjectMembersHelpersUpdateAll({
  projectId,
  outdatedIds,
}: {
  readonly projectId: string;
  readonly outdatedIds: readonly string[];
}) {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "failed">(
    "idle",
  );
  if (outdatedIds.length < 2) return null;
  const run = async (): Promise<void> => {
    setState("sending");
    const results = await Promise.all(
      outdatedIds.map((id) => sendBotGuidanceApi(projectId, id)),
    );
    setState(results.every(Boolean) ? "sent" : "failed");
  };
  if (state === "sent") {
    return (
      <span className="ml-auto text-[12.5px] text-awc-fg-muted">
        {C.updateAllSent(outdatedIds.length)}
      </span>
    );
  }
  return (
    <button
      type="button"
      className={`${LINK} ml-auto`}
      disabled={state === "sending"}
      onClick={() => void run()}
    >
      {state === "sending"
        ? C.updateSending
        : state === "failed"
          ? C.updateFailed
          : C.updateAll(outdatedIds.length)}
    </button>
  );
}

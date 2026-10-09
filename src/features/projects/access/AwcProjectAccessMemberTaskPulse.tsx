"use client";

import { useState } from "react";

import { dispatchProjectInboxMessage } from "@/features/projects/access/inbox/utils/dispatchProjectInboxMessage";
import { AWC_MEMBER_TASK_PULSE_COPY as copy } from "@/features/projects/access/awcMemberTaskPulseCopy.constant";
import { AWC_PROJECT_ACCESS_BADGE_ALERT_CLASS } from "@/features/projects/access/awcProjectAccessSection.constant";
import { AWC_PROJECT_ACCESS_CTA } from "@/features/projects/access/awcProjectAccessCta.constant";
import type { AwcMemberTaskPulse } from "@/features/projects/access/utils/resolveMemberTaskPulse";
import { PROJECT_PAGE_METADATA_TEXT_CLASS } from "@/features/projects/projectPageMetadataText.constant";
import { buildProjectTabHash } from "@/lib/shell/buildNavConsolidationRedirect";

type AskState = "idle" | "confirm" | "sending" | "sent" | "failed";

const formatAgo = (nowMs: number, thenMs: number): string => {
  const minutes = Math.max(0, Math.floor((nowMs - thenMs) / 60_000));
  return minutes < 1 ? "just now" : `${minutes} min ago`;
};

/** Owner-only status line under a bot: Working / Quiet (with Ask status) / Idle. */
export default function AwcProjectAccessMemberTaskPulse({
  projectId,
  membershipId,
  pulse,
  nowMs,
}: {
  readonly projectId: string;
  readonly membershipId: string;
  readonly pulse: AwcMemberTaskPulse;
  readonly nowMs: number;
}) {
  const [ask, setAsk] = useState<AskState>("idle");

  if (pulse.kind === "idle") {
    return (
      <p className={`basis-full text-xs ${PROJECT_PAGE_METADATA_TEXT_CLASS}`}>
        {copy.idle}
      </p>
    );
  }
  if (pulse.kind === "working") {
    return (
      <p className={`basis-full text-xs ${PROJECT_PAGE_METADATA_TEXT_CLASS}`}>
        {copy.working(pulse.openCount, formatAgo(nowMs, pulse.lastUpdateMs))}
      </p>
    );
  }

  const sendRequest = async (): Promise<void> => {
    setAsk("sending");
    const result = await dispatchProjectInboxMessage({
      projectId,
      toMembershipId: membershipId,
      summary: copy.requestSummary(pulse.taskTitle),
    });
    setAsk(result.ok ? "sent" : "failed");
  };

  return (
    <div className="basis-full space-y-1 text-xs">
      <p className="flex flex-wrap items-center gap-2">
        <span className={AWC_PROJECT_ACCESS_BADGE_ALERT_CLASS}>
          {copy.quiet(pulse.quietMinutes, pulse.taskTitle)}
        </span>
        <a
          className="underline text-awc-fg dark:text-white/90"
          href={buildProjectTabHash("tasks", { task: pulse.taskId })}
        >
          {copy.openTask}
        </a>
      </p>
      <p className={PROJECT_PAGE_METADATA_TEXT_CLASS}>{copy.quietHint}</p>
      {ask === "idle" ? (
        <button
          type="button"
          className={AWC_PROJECT_ACCESS_CTA.secondary}
          onClick={() => setAsk("confirm")}
        >
          {copy.askStatus}
        </button>
      ) : null}
      {ask === "confirm" || ask === "sending" ? (
        <span className="flex flex-wrap items-center gap-2">
          <span className="text-awc-fg dark:text-white/90">{copy.confirm}</span>
          <button
            type="button"
            className={AWC_PROJECT_ACCESS_CTA.primary}
            disabled={ask === "sending"}
            onClick={() => void sendRequest()}
          >
            {copy.send}
          </button>
          <button
            type="button"
            className={AWC_PROJECT_ACCESS_CTA.secondary}
            disabled={ask === "sending"}
            onClick={() => setAsk("idle")}
          >
            {copy.cancel}
          </button>
        </span>
      ) : null}
      {ask === "sent" ? (
        <p className={PROJECT_PAGE_METADATA_TEXT_CLASS} role="status">
          {copy.sent}
        </p>
      ) : null}
      {ask === "failed" ? (
        <p className="text-red-600" role="alert">
          {copy.failed}{" "}
          <button
            type="button"
            className="underline"
            onClick={() => setAsk("confirm")}
          >
            {copy.askStatus}
          </button>
        </p>
      ) : null}
    </div>
  );
}

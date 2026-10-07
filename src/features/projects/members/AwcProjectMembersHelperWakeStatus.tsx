import type { RailAssistantWakeStatus } from "@/features/projects/members/utils/resolveRailAssistantWakeStatus";
import { PROJECT_PAGE_MEMBERS_COPY as C } from "@/features/projects/projectPageMembersCopy.constant";

/** Dot tone per status — existing sand/state tokens only (text label always shown). */
const DOT_CLASS: Record<RailAssistantWakeStatus, string> = {
  ready: "bg-awc-ok-dot",
  checks_on_demand: "bg-awc-control-border",
  checking: "bg-awc-control-border animate-pulse",
  cant_reach: "bg-awc-bad-dot",
  not_connected: "bg-awc-warn-dot",
};

/** DF-036: "Wake failed" reads in `--bad`; every other chip stays subtle. */
const TEXT_CLASS = (status: RailAssistantWakeStatus): string =>
  status === "cant_reach" ? "text-awc-bad" : "text-awc-fg-subtle";

/** P1-S1b: assistant row wake status (replaces the hard-coded "Ready"). */
export default function AwcProjectMembersHelperWakeStatus({
  status,
}: {
  readonly status: RailAssistantWakeStatus;
}) {
  return (
    <span
      className={`flex shrink-0 items-center gap-1.5 text-[12.5px] ${TEXT_CLASS(status)}`}
      data-wake-status={status}
    >
      <span
        className={`inline-block size-[7px] rounded-full ${DOT_CLASS[status]}`}
        aria-hidden
      />
      {C.helpersWake[status]}
    </span>
  );
}

import type { RailAssistantWakeStatus } from "@/features/projects/members/utils/resolveRailAssistantWakeStatus";
import { PROJECT_PAGE_MEMBERS_COPY as C } from "@/features/projects/projectPageMembersCopy.constant";

/** Dot tone per status — lock tokens only (DF-036 F2: neutral, never amber; bad = --bad). */
const DOT_CLASS: Record<RailAssistantWakeStatus, string> = {
  ready: "bg-awc-ok-dot",
  checks_on_demand: "bg-awc-control-border",
  checking: "bg-awc-control-border animate-pulse",
  cant_reach: "bg-awc-bad",
  cant_check: "bg-awc-control-border",
  not_connected: "bg-awc-control-border",
};

/** "Wake failed" reads in `--bad`; every other chip stays subtle. */
const TEXT_CLASS = (status: RailAssistantWakeStatus): string =>
  status === "cant_reach" ? "text-awc-bad" : "text-awc-fg-subtle";

/** Assistant row wake chip; one click opens the row's Wake link block with the paste box (DF-036 F3). */
export default function AwcProjectMembersHelperWakeStatus({
  status,
  onOpen,
}: {
  readonly status: RailAssistantWakeStatus;
  readonly onOpen: () => void;
}) {
  return (
    <button
      type="button"
      className={`awc-focus-ring flex min-w-0 max-w-[35%] shrink items-center gap-1.5 rounded-md px-1 py-0.5 text-[12.5px] hover:bg-awc-fill ${TEXT_CLASS(status)}`}
      data-wake-status={status}
      onClick={onOpen}
    >
      <span
        className={`inline-block size-[7px] shrink-0 rounded-full ${DOT_CLASS[status]}`}
        aria-hidden
      />
      <span className="min-w-0 truncate">{C.helpersWake[status]}</span>
    </button>
  );
}

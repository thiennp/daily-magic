import { PROJECT_PAGE_MEMBERS_COPY as C } from "@/features/projects/projectPageMembersCopy.constant";

interface AwcProjectMembersRailHeadingProps {
  /** Members · {n} once the roster is loaded; null = loading or failed. */
  readonly count: number | null;
  /** DF-036 F5: waiting person invites + join requests + unused assistant invites. */
  readonly waiting?: number;
}

const PILL =
  "rounded-full bg-awc-tile-2 px-2 py-px text-[11.5px] font-semibold tabular-nums text-awc-fg-muted";

/** Members rail title: "Members · {n}" + "{k} waiting" (DF-036 EN PASS S6, F5). */
export default function AwcProjectMembersRailHeading({ count, waiting = 0 }: AwcProjectMembersRailHeadingProps) {
  return (
    <div className="mb-3 flex items-center gap-2 px-3.5">
      <h2 className="text-[13px] font-semibold text-awc-fg-muted dark:text-gray-400" data-members-heading>
        {count === null ? C.columnLabel : C.columnLabelCount(count)}
      </h2>
      {count !== null && waiting > 0 ? (
        <span className={PILL} data-members-waiting={waiting}>
          {C.waitingPill(waiting)}
        </span>
      ) : null}
    </div>
  );
}

import type { ReactNode } from "react";

import { PROJECT_PAGE_MEMBERS_COPY as C } from "@/features/projects/public-api/types";

export interface RailAvatar {
  readonly initials: string;
  /** Assistants are rounded squares in Pine-soft; people are round sand. */
  readonly assistant: boolean;
}

interface AwcProjectMembersRailHeadingProps {
  /** Members count once the roster is loaded; null = loading or failed. */
  readonly count: number | null;
  /** DF-036 F5: waiting person invites + join requests + unused assistant invites. */
  readonly waiting?: number;
  readonly avatars?: readonly RailAvatar[];
  /** Right-aligned ⋯ menu slot in the eyebrow row. */
  readonly menu?: ReactNode;
}

const STACK_MAX = 4;
const AV =
  "-ml-1.5 grid size-8 place-items-center border-2 border-awc-surface text-[10.5px] font-semibold first:ml-0";

/** Rail header (design v2): "Members" eyebrow, avatar stack, big count, waiting pill. */
export default function AwcProjectMembersRailHeading({
  count,
  waiting = 0,
  avatars = [],
  menu = null,
}: AwcProjectMembersRailHeadingProps) {
  const extra = avatars.length - STACK_MAX;
  return (
    <div
      className="mb-3 grid gap-3 rounded-awc-card border border-awc-accent-soft-2 bg-gradient-to-br from-awc-accent-soft to-awc-surface p-3.5 shadow-awc-lift"
      data-members-heading
    >
      <div className="flex items-center gap-2">
        <h2 className="text-[13px] font-semibold uppercase tracking-[0.08em] text-awc-fg-muted">
          {C.columnLabel}
        </h2>
        {menu}
      </div>
      {count === null ? null : (
        <div className="flex items-center gap-3">
          {avatars.length > 0 ? (
            <div className="flex" aria-hidden>
              {avatars.slice(0, STACK_MAX).map((a, i) => (
                <span
                  key={`${a.initials}-${i}`}
                  className={`${AV} ${
                    a.assistant
                      ? "rounded-[10px] bg-awc-accent-soft text-awc-primary"
                      : "rounded-full bg-awc-tile text-awc-fg-muted"
                  }`}
                >
                  {a.initials}
                </span>
              ))}
              {extra > 0 ? (
                <span
                  className={`${AV} rounded-full bg-awc-tile text-awc-fg-muted`}
                >
                  +{extra}
                </span>
              ) : null}
            </div>
          ) : null}
          <p className="m-0 grid leading-none" data-members-count={count}>
            <span className="text-[28px] font-bold tabular-nums tracking-tight text-awc-fg">
              {count}
            </span>
            <span className="mt-1 text-xs text-awc-fg-subtle">
              {count === 1 ? C.memberSingular : C.memberPlural}
            </span>
          </p>
          {waiting > 0 ? (
            <span
              className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-awc-accent-soft-2 bg-awc-surface px-2.5 py-1 text-[12.5px] font-semibold text-awc-primary"
              data-members-waiting={waiting}
            >
              <i
                className="size-[7px] rounded-full bg-awc-primary"
                aria-hidden
              />
              {C.waitingPill(waiting)}
            </span>
          ) : null}
        </div>
      )}
    </div>
  );
}

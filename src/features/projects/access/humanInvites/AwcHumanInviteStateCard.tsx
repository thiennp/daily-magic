"use client";

import type { ReactNode } from "react";

import {
  InviteAlertIcon,
  InviteCheckIcon,
  InviteClockIcon,
  InviteCloseIcon,
  InviteUsersIcon,
} from "@/features/projects/access/humanInvites/inviteInlineIcons";

export type AwcHumanInviteStateIcon =
  "clock" | "x" | "users" | "check" | "alert";

const ICONS = {
  clock: InviteClockIcon,
  x: InviteCloseIcon,
  users: InviteUsersIcon,
  check: InviteCheckIcon,
  alert: InviteAlertIcon,
} as const;

const TONES = {
  warn: "bg-awc-warn-soft text-awc-warn",
  bad: "bg-awc-bad-soft text-awc-bad",
  ok: "bg-awc-ok-soft text-awc-ok",
} as const;

export type AwcHumanInviteStateCardProps = {
  readonly icon: AwcHumanInviteStateIcon;
  readonly tone: keyof typeof TONES;
  readonly title: string;
  readonly children?: ReactNode;
  readonly actions?: ReactNode;
};

/** Centered icon + title + body + actions — Join project state card. */
export default function AwcHumanInviteStateCard({
  icon,
  tone,
  title,
  children,
  actions,
}: AwcHumanInviteStateCardProps) {
  const Icon = ICONS[icon];
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <span
        className={`grid h-14 w-14 place-items-center rounded-[18px] ${TONES[tone]}`}
      >
        <Icon className="h-6 w-6" />
      </span>
      <h1 id="h1" tabIndex={-1} className="text-xl font-bold tracking-tight">
        {title}
      </h1>
      {children ? (
        <p className="text-sm text-awc-fg-muted dark:text-gray-400">
          {children}
        </p>
      ) : null}
      {actions}
    </div>
  );
}

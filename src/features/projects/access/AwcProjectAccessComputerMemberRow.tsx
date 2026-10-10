"use client";

import Link from "next/link";

import { AwlRepairManuallyInfoButton } from "@/features/agent-witch/macDevices/public-api/presentation";
import { AWC_PROJECT_COMPUTER_MEMBER_COPY } from "@/features/projects/access/awcProjectComputerMemberCopy.constant";
import {
  describeComputerAccessMember,
  type ComputerAccessMemberFields,
  type ComputerAccessMemberStatus,
} from "@/features/projects/access/utils/describeComputerAccessMember";
import AwcProjectAccessComputerAgents from "@/features/projects/access/AwcProjectAccessComputerAgents";
import { PROJECT_PAGE_METADATA_TEXT_CLASS } from "@/features/projects/public-api/types";

/** Black / white / gray only (no brand or status hues). */
const STATUS_CHIP_CLASS: Readonly<Record<ComputerAccessMemberStatus, string>> =
  {
    online: "border-gray-900 text-awc-fg dark:border-white dark:text-white",
    offline:
      "border-awc-border-strong text-awc-fg-muted dark:border-gray-700 dark:text-gray-400",
    needs_update:
      "border-gray-900 bg-gray-900 text-white dark:border-white dark:bg-white dark:text-gray-900",
  };

interface AwcProjectAccessComputerMemberRowProps {
  readonly member: ComputerAccessMemberFields & { readonly id: string };
  readonly viewerUserId: string | null;
}

export default function AwcProjectAccessComputerMemberRow({
  member,
  viewerUserId,
}: AwcProjectAccessComputerMemberRowProps) {
  const copy = AWC_PROJECT_COMPUTER_MEMBER_COPY;
  const view = describeComputerAccessMember(member, viewerUserId);
  return (
    <li
      data-member-kind="computer"
      data-computer-status={view.status}
      className="flex flex-wrap items-center justify-between gap-2 text-sm"
    >
      <span className="min-w-0 text-awc-fg dark:text-white/90">
        <span className="font-medium">{view.name}</span>
        <span className={`ml-2 text-xs ${PROJECT_PAGE_METADATA_TEXT_CLASS}`}>
          {view.ownerLine}
        </span>
      </span>
      <span className="flex items-center gap-2">
        <span
          className={`rounded-full border px-1.5 py-0.5 text-[10px] font-medium ${STATUS_CHIP_CLASS[view.status]}`}
        >
          {view.statusLabel}
        </span>
        {view.status === "needs_update" ? (
          <Link
            href={copy.updateHref}
            className="text-xs font-medium text-awc-fg underline underline-offset-2 dark:text-white"
          >
            {copy.updateLink}
          </Link>
        ) : null}
        {view.status === "needs_update" &&
        viewerUserId !== null &&
        member.ownerUserId === viewerUserId ? (
          <AwlRepairManuallyInfoButton />
        ) : null}
      </span>
      <AwcProjectAccessComputerAgents
        computerName={view.name}
        agents={member.agents ?? []}
      />
    </li>
  );
}

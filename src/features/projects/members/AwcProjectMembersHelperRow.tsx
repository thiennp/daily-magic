"use client";

import { useRef } from "react";

import { awcGrokWakeLinkHash } from "@/features/projects/access/awcGrokWakeLinkDeepLink";
import { useWakeLinkOpenRequest } from "@/features/projects/access/hooks/useWakeLinkOpenRequest";
import AwcProjectMembersHelperRowLinks from "@/features/projects/members/AwcProjectMembersHelperRowLinks";
import AwcProjectMembersHelperRowLabel from "@/features/projects/members/AwcProjectMembersHelperRowLabel";
import AwcProjectMembersHelperRowMenu from "@/features/projects/members/AwcProjectMembersHelperRowMenu";
import AwcProjectMembersHelperRowMoreMenu from "@/features/projects/members/AwcProjectMembersHelperRowMoreMenu";
import AwcProjectMembersHelperWakeStatus from "@/features/projects/members/AwcProjectMembersHelperWakeStatus";
import { useHelperRowWakeStatus } from "@/features/projects/members/hooks/useHelperRowWakeStatus";
import { useHelperRowState } from "@/features/projects/members/hooks/useHelperRowState";
import type { AccessMembershipView } from "@/features/projects/access/utils/projectAccessApi.types";

type HelperMember = Pick<
  AccessMembershipView,
  "id" | "userId" | "projectDisplayName" | "wakeLinkSet" | "deliveryMode"
>;

interface AwcProjectMembersHelperRowProps {
  readonly projectId: string;
  readonly member: HelperMember;
  /** Wake links saved this session (status flips to Checking… until reload). */
  readonly savedIds: ReadonlySet<string>;
  /** Bumped by `#wake-link-<id>` → expand, open the one-box connect, focus. */
  readonly wakeOpenRequest: number;
  readonly onWakeSaved: (membershipId: string) => void;
  readonly onMessage: (membershipId: string) => void;
  readonly onRename: (membershipId: string, name: string) => Promise<boolean>;
  readonly onRemove: (membershipId: string) => void;
}

const ROW =
  "flex w-full items-center gap-2 rounded-[10px] border border-transparent px-3.5 py-2.5 text-sm transition-all hover:border-awc-line hover:bg-awc-surface-2";

/** Flat nav-style assistant row: wake chip (opens the paste box), ⋯ menu, expandable detail (DF-036 F3/F12). */
export default function AwcProjectMembersHelperRow(
  p: AwcProjectMembersHelperRowProps,
) {
  const { member } = p;
  const row = useHelperRowState();
  const containerRef = useRef<HTMLLIElement | null>(null);
  useWakeLinkOpenRequest({
    containerRef,
    openRequest: p.wakeOpenRequest,
    openForm: row.openWake,
    membershipId: member.id,
  });
  const name = member.projectDisplayName?.trim() || member.userId.slice(0, 8);
  const { wake, health, status } = useHelperRowWakeStatus(
    p.projectId,
    member,
    p.savedIds,
  );
  const showHealth = health && (status === "ready" || status === "cant_reach");

  return (
    <li
      ref={containerRef}
      id={awcGrokWakeLinkHash(member.id)}
      className="flex scroll-mt-20 flex-col"
    >
      <div className={ROW}>
        <AwcProjectMembersHelperRowLabel
          name={name}
          line={showHealth ? health.line : null}
          expanded={row.open}
          onToggle={row.toggle}
        />
        <AwcProjectMembersHelperWakeStatus
          status={status}
          onOpen={row.openWake}
        />
        <AwcProjectMembersHelperRowMoreMenu
          name={name}
          onMessage={() => p.onMessage(member.id)}
          onRename={row.startRename}
          onWakeLink={row.openWake}
          onRemove={row.startRemove}
        />
      </div>
      <AwcProjectMembersHelperRowLinks
        cantCheck={status === "cant_check"}
        offerPaste={Boolean(showHealth && health.offerPaste && !row.wakeOpen)}
        onRetry={wake.retry}
        onPaste={row.openWake}
      />
      {row.open ? (
        <AwcProjectMembersHelperRowMenu
          projectId={p.projectId}
          member={member}
          name={name}
          mode={row.mode}
          onEndMode={row.endMode}
          wake={{
            status,
            health,
            pasteOpen: row.wakeOpen,
            onOpenPaste: row.openPaste,
            onRetry: wake.retry,
          }}
          onWakeSaved={(id) => {
            row.closeWake();
            p.onWakeSaved(id);
          }}
          onRename={p.onRename}
          onRemove={p.onRemove}
        />
      ) : null}
    </li>
  );
}

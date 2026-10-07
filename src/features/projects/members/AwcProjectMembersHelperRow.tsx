"use client";

import { useCallback, useRef, useState } from "react";

import { awcGrokWakeLinkHash } from "@/features/projects/access/awcGrokWakeLinkDeepLink";
import { useWakeLinkOpenRequest } from "@/features/projects/access/hooks/useWakeLinkOpenRequest";
import AwcProjectMembersHelperRowMenu from "@/features/projects/members/AwcProjectMembersHelperRowMenu";
import AwcProjectMembersHelperWakeStatus from "@/features/projects/members/AwcProjectMembersHelperWakeStatus";
import { useAssistantWakeHealth } from "@/features/projects/members/hooks/useAssistantWakeHealth";
import { resolveRailAssistantWakeStatus } from "@/features/projects/members/utils/resolveRailAssistantWakeStatus";
import { ASSISTANT_WAKE_BLOCK_COPY as B } from "@/features/projects/members/assistantWakeBlockCopy.constant";
import { ASSISTANT_WAKE_HEALTH_COPY as W } from "@/features/projects/members/assistantWakeHealthCopy.constant";
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
const LINK = "ml-[3.75rem] self-start text-[13px] font-medium text-awc-primary underline-offset-2 hover:underline";

/** Flat nav-style assistant row: wake chip (opens the paste box) + expandable detail with the Wake link block. */
export default function AwcProjectMembersHelperRow(p: AwcProjectMembersHelperRowProps) {
  const { member } = p;
  const [open, setOpen] = useState(false);
  const [wakeOpen, setWakeOpen] = useState(false);
  const containerRef = useRef<HTMLLIElement | null>(null);
  const openWake = useCallback(() => {
    setOpen(true);
    setWakeOpen(true);
  }, []);
  useWakeLinkOpenRequest({ containerRef, openRequest: p.wakeOpenRequest, openForm: openWake, membershipId: member.id });
  const name = member.projectDisplayName?.trim() || member.userId.slice(0, 8);
  const savedNow = p.savedIds.has(member.id);
  const wake = useAssistantWakeHealth({
    projectId: p.projectId,
    membershipId: member.id,
    enabled: member.wakeLinkSet === true && (member.deliveryMode !== "poll" || savedNow),
    reloadKey: savedNow ? 1 : 0,
  });
  const { health } = wake;
  const status = resolveRailAssistantWakeStatus({ member, savedIds: p.savedIds, health, loadFailed: wake.loadFailed });
  const showHealth = health && (status === "ready" || status === "cant_reach");
  const toggle = () => setOpen((value) => !value);

  return (
    <li ref={containerRef} id={awcGrokWakeLinkHash(member.id)} className="flex scroll-mt-20 flex-col">
      <div className={ROW}>
        <button type="button" className="flex min-w-0 flex-1 items-center gap-3 text-left" aria-expanded={open} onClick={toggle}>
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-awc-tile-2 text-[13px] font-semibold text-awc-fg-muted">
            {name.slice(0, 2).toUpperCase()}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate font-semibold text-awc-fg">{name}</span>
            {showHealth ? <span className="block text-[12px] text-awc-fg-subtle">{health.line}</span> : null}
          </span>
        </button>
        <AwcProjectMembersHelperWakeStatus status={status} onOpen={openWake} />
        <button
          type="button"
          className="awc-focus-ring grid size-7 shrink-0 place-items-center rounded-lg text-[15px] font-semibold leading-none text-awc-fg-muted hover:bg-awc-fill"
          aria-label={`More for ${name}`}
          aria-expanded={open}
          onClick={toggle}
        >
          ⋯
        </button>
      </div>
      {status === "cant_check" ? (
        <button type="button" className={LINK} onClick={wake.retry}>{B.retry}</button>
      ) : null}
      {showHealth && health.offerPaste && !wakeOpen ? (
        <button type="button" className={LINK} onClick={openWake}>{W.pasteNew}</button>
      ) : null}
      {open ? (
        <AwcProjectMembersHelperRowMenu
          projectId={p.projectId}
          member={member}
          name={name}
          wake={{ status, health, pasteOpen: wakeOpen, onOpenPaste: () => setWakeOpen(true), onRetry: wake.retry }}
          onWakeSaved={(id) => {
            setWakeOpen(false);
            p.onWakeSaved(id);
          }}
          onMessage={p.onMessage}
          onRename={p.onRename}
          onRemove={p.onRemove}
        />
      ) : null}
    </li>
  );
}

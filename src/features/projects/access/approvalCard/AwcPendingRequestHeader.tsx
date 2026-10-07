import type { ReactNode } from "react";

import AwcPendingNotLinkedInfo from "@/features/projects/access/approvalCard/AwcPendingNotLinkedInfo";
import { AWC_PENDING_APPROVAL_CARD_COPY as C } from "@/features/projects/access/approvalCard/awcPendingApprovalCardCopy.constant";
import {
  cleanLabel,
  formatPendingAskedAt,
  formatPendingOwnerLine,
  pendingInitials,
} from "@/features/projects/access/approvalCard/formatPendingApprovalCard";
import type { PendingApprovalCardMeta } from "@/lib/projects/acl/approvalCard/PendingApprovalCardMeta.type";

interface AwcPendingRequestHeaderProps {
  readonly requestId: string;
  readonly title: string;
  readonly isAssistant: boolean;
  readonly createdAt: string | null | undefined;
  readonly card: PendingApprovalCardMeta | null | undefined;
}

const Dot = () => (
  <span className="text-awc-fg-subtle" aria-hidden>
    ·
  </span>
);

/** Who's asking: avatar, requested name, type, when, and who it is from. */
export default function AwcPendingRequestHeader({
  requestId,
  title,
  isAssistant,
  createdAt,
  card,
}: AwcPendingRequestHeaderProps) {
  const asked = formatPendingAskedAt(createdAt);
  const kind = card ? cleanLabel(card.assistantKind) : null;
  const owner = card ? formatPendingOwnerLine(card) : null;
  const notLinked = card !== null && card !== undefined && !card.ownerClaimed;
  const viaInvite = card !== null && card !== undefined && card.connectVia === null;
  const meta: ReactNode[] = [];
  if (kind) meta.push(<span key="kind">{kind}</span>);
  if (viaInvite) meta.push(<span key="via">{C.viaInvite}</span>);
  if (owner) meta.push(<span key="owner">{owner}</span>);
  if (notLinked)
    meta.push(
      <AwcPendingNotLinkedInfo key="nl" tipId={`pending-tip-${requestId}`} />,
    );

  return (
    <div className="flex items-start gap-3.5">
      <span
        className="grid size-11 shrink-0 place-items-center rounded-xl bg-awc-accent-soft text-[15px] font-bold tracking-wide text-awc-blue-800"
        aria-hidden
      >
        {pendingInitials(title)}
      </span>
      <div className="grid min-w-0 flex-1 gap-1">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
          <h4
            id={`pending-who-${requestId}`}
            className="m-0 min-w-0 break-words text-[17px] font-semibold text-awc-fg"
          >
            {title}
          </h4>
          <span className="rounded-full bg-awc-accent-soft px-2 py-0.5 text-[12px] font-semibold text-awc-blue-800">
            {isAssistant ? C.typeAssistant : C.typePerson}
          </span>
          {asked ? (
            <span className="ml-auto hidden whitespace-nowrap text-[13px] tabular-nums text-awc-fg-muted @min-[520px]:inline">
              {asked}
            </span>
          ) : null}
        </div>
        {meta.length > 0 || asked ? (
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[13px] text-awc-fg-muted">
            {meta.flatMap((node, i) =>
              i === 0 ? [node] : [<Dot key={`d${i}`} />, node],
            )}
            {asked ? (
              /* Narrow cards: "when" moves from the title row into the meta line. */
              <span className="inline-flex gap-2 @min-[520px]:hidden">
                {meta.length > 0 ? <Dot /> : null}
                <span>{asked}</span>
              </span>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

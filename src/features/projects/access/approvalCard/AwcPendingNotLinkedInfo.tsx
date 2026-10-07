import { AWC_PENDING_APPROVAL_CARD_COPY as C } from "@/features/projects/access/approvalCard/awcPendingApprovalCardCopy.constant";

/** "Not linked to a person yet" + (i) tooltip (hover / keyboard focus). */
export default function AwcPendingNotLinkedInfo({
  tipId,
}: {
  readonly tipId: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span>{C.notLinked}</span>
      <span className="group relative inline-flex">
        <button
          type="button"
          className="awc-focus-ring grid size-[18px] cursor-help place-items-center rounded-full border border-awc-border-strong bg-transparent p-0 text-[11px] font-semibold leading-none text-awc-fg-muted"
          aria-label={C.notLinkedInfoLabel}
          aria-describedby={tipId}
        >
          i
        </button>
        <span
          role="tooltip"
          id={tipId}
          className="pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 z-10 w-max max-w-[240px] -translate-x-1/2 rounded-lg bg-awc-fg px-2.5 py-2 text-[12.5px] leading-snug text-white opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100"
        >
          {C.notLinkedTip}
        </span>
      </span>
    </span>
  );
}

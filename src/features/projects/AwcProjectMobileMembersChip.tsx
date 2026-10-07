"use client";

import { useAwcProjectAccess } from "@/features/projects/access/hooks/useAwcProjectAccess";
import { PROJECT_PAGE_LAYOUT_V2_COPY as C } from "@/features/projects/projectPageLayoutV2Copy.constant";

const CHIP_CLASS =
  "inline-flex w-fit rounded-full bg-awc-fill px-3 py-1 text-xs font-semibold text-awc-fg ring-1 ring-awc-border transition hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400/40 dark:bg-white/10 dark:text-gray-200 dark:ring-white/15 dark:hover:bg-white/15 lg:hidden";

const scrollToMembersColumn = (): void => {
  document
    .getElementById("project-members-column")
    ?.scrollIntoView({ behavior: "smooth", block: "nearest" });
};

function MembersChipButton(props: {
  readonly label: string;
  readonly ariaLabel: string;
}) {
  return (
    <button
      type="button"
      className={CHIP_CLASS}
      aria-label={props.ariaLabel}
      onClick={scrollToMembersColumn}
    >
      {props.label}
    </button>
  );
}

function ApproverMembersChip({ projectId }: { readonly projectId: string }) {
  const { pending, isLoading } = useAwcProjectAccess(projectId);
  const n = isLoading ? 0 : pending.length;
  const waiting = n >= 1;
  return (
    <MembersChipButton
      label={waiting ? C.mobileMembersChipPending(n) : C.mobileMembersChip}
      ariaLabel={
        waiting ? C.mobileMembersChipAriaPending(n) : C.mobileMembersChipAria
      }
    />
  );
}

interface AwcProjectMobileMembersChipProps {
  readonly projectId: string;
  /** Owner / canApprove — waiting label only when true and n≥1. */
  readonly canApprove: boolean;
}

/**
 * Mobile-only Members chip → scroll to `#project-members-column`.
 * n = join requests awaiting owner Approve (not unredeemed invite links).
 */
export default function AwcProjectMobileMembersChip({
  projectId,
  canApprove,
}: AwcProjectMobileMembersChipProps) {
  if (!canApprove) {
    return (
      <MembersChipButton
        label={C.mobileMembersChip}
        ariaLabel={C.mobileMembersChipAria}
      />
    );
  }
  return <ApproverMembersChip projectId={projectId} />;
}

"use client";

import Link from "next/link";

import AppPanel from "@/components/surfaces/AppPanel";
import Button from "@/components/ui/button/Button";
import LibraryPlaybookTypeBadge from "@/features/library/LibraryPlaybookTypeBadge";
import { buildSignInHref } from "@/features/empty-states/buildGuestAuthHrefs";
import { removeGuestLibraryDraft } from "@/lib/library/guest/guestLibraryDraftStorage";
import type GuestLibraryDraft from "@/lib/library/guest/types/GuestLibraryDraft.type";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";

interface GuestLibraryPlaybookCardProps {
  readonly draft: GuestLibraryDraft;
  readonly onRemoved: () => void;
}

export default function GuestLibraryPlaybookCard({
  draft,
  onRemoved,
}: GuestLibraryPlaybookCardProps) {
  return (
    <AppPanel as="article" padding="compact">
      <div className="flex flex-wrap items-center gap-2">
        <LibraryPlaybookTypeBadge type={draft.type} />
        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-900 dark:bg-amber-950/50 dark:text-amber-200">
          This browser only
        </span>
        <p className="text-sm font-medium text-gray-800 dark:text-white/90">
          {draft.name}
        </p>
      </div>
      {draft.description.length > 0 ? (
        <p className="mt-2 line-clamp-3 text-sm text-gray-600 dark:text-gray-400">
          {draft.description}
        </p>
      ) : null}
      <p className="mt-2 text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
        {draft.type === CapabilityType.WORKFLOW
          ? `${draft.workflowFields.length} inputs`
          : "Agent"}
        {draft.sourceTemplateId !== null ? " · from template" : ""}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          href={buildSignInHref("/library")}
          className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-4 py-3 text-sm font-medium text-white shadow-sm hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-400"
        >
          Sign in to run
        </Link>
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            removeGuestLibraryDraft(draft.localId);
            onRemoved();
          }}
        >
          Remove
        </Button>
      </div>
    </AppPanel>
  );
}

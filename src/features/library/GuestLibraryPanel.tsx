"use client";

import CapabilityTemplatePicker from "@/features/capabilities/CapabilityTemplatePicker";
import { guestSaveCapabilityTemplateOutcome } from "@/features/capabilities/utils/guestSaveCapabilityTemplateOutcome";
import GuestLibraryPlaybookCard from "@/features/library/GuestLibraryPlaybookCard";
import { useGuestLibraryDrafts } from "@/features/library/hooks/useGuestLibraryDrafts";
import {
  CREATE_FREE_ACCOUNT_HREF,
  buildSignInHref,
} from "@/features/empty-states/buildGuestAuthHrefs";
import Link from "next/link";

interface GuestLibraryPanelProps {
  readonly refreshKey?: number;
  readonly onDraftsChanged?: () => void;
}

export default function GuestLibraryPanel({
  refreshKey = 0,
  onDraftsChanged,
}: GuestLibraryPanelProps) {
  const { drafts, reload } = useGuestLibraryDrafts(refreshKey);

  const handleDraftsChanged = (): void => {
    reload();
    onDraftsChanged?.();
  };

  return (
    <div className="space-y-8">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Build workflows here without an account. Saves stay on this browser
        until you{" "}
        <Link
          href={buildSignInHref("/library")}
          className="font-medium text-brand-600 hover:underline dark:text-brand-400"
        >
          sign in
        </Link>{" "}
        — we sync using the newest copy (browser vs account).
      </p>

      {drafts.length > 0 ? (
        <section className="space-y-3">
          <h2 className="text-base font-semibold text-gray-800 dark:text-white/90">
            Saved on this browser
          </h2>
          {drafts.map((draft) => (
            <GuestLibraryPlaybookCard
              key={draft.localId}
              draft={draft}
              onRemoved={handleDraftsChanged}
            />
          ))}
        </section>
      ) : null}

      <section>
        <h2 className="text-base font-semibold text-gray-800 dark:text-white/90">
          Starter templates
        </h2>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Add a preset to your browser library, then customize after you create
          an account.
        </p>
        <CapabilityTemplatePicker
          saveTemplate={guestSaveCapabilityTemplateOutcome}
          saveButtonLabel="Save to this browser"
          savedButtonLabel="Saved here"
          onSaved={handleDraftsChanged}
        />
      </section>

      <p className="text-sm text-gray-500 dark:text-gray-400">
        <Link
          href={CREATE_FREE_ACCOUNT_HREF}
          className="text-brand-600 hover:underline dark:text-brand-400"
        >
          Create free account
        </Link>{" "}
        to run tasks on your Mac and keep playbooks across devices.
      </p>
    </div>
  );
}

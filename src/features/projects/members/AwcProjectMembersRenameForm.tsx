"use client";

import { useState } from "react";

import { PROJECT_PAGE_MEMBERS_COPY as C } from "@/features/projects/public-api/types";

/** Inline rename form for an assistant row. */
export default function AwcProjectMembersRenameForm(p: {
  readonly member: {
    readonly id: string;
    readonly projectDisplayName: string | null;
  };
  readonly onRename: (membershipId: string, name: string) => Promise<boolean>;
  readonly onDone: () => void;
}) {
  const [draft, setDraft] = useState(p.member.projectDisplayName ?? "");
  const id = `rename-${p.member.id}`;
  return (
    <form
      className="flex flex-wrap items-center gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        void p.onRename(p.member.id, draft).then((ok) => {
          if (ok) p.onDone();
        });
      }}
    >
      <label className="sr-only" htmlFor={id}>
        {C.renameAria}
      </label>
      <input
        id={id}
        maxLength={32}
        value={draft}
        autoFocus
        onChange={(e) => setDraft(e.target.value)}
        className="min-w-0 flex-1 rounded-lg border border-awc-border bg-white px-2 py-1 text-sm dark:border-gray-700 dark:bg-gray-950"
      />
      <button
        type="submit"
        className="text-[13px] font-semibold text-awc-fg dark:text-white"
      >
        {C.renameSave}
      </button>
      <button
        type="button"
        className="text-[13px] text-awc-fg-muted"
        onClick={p.onDone}
      >
        {C.renameCancel}
      </button>
    </form>
  );
}

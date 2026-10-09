"use client";

import { useId } from "react";

import { PROJECT_PAGE_LIBRARY_COPY as C } from "@/features/projects/library/projectPageLibraryCopy.constant";
import useProjectSkillBody from "@/features/projects/library/useProjectSkillBody";
import {
  PANEL_LINK_CLASS,
  PANEL_LIST_CLASS,
  PANEL_STATUS_CLASS,
} from "@/features/projects/projectPagePanelChrome.constant";

const LABEL_CLASS =
  "text-[12px] font-semibold uppercase tracking-wide text-awc-fg-muted dark:text-gray-400";

/** Full skill text, so the owner can read it before publishing. */
export default function AwcProjectLibrarySkillContent({
  projectId,
  skillId,
  updatedAt,
}: {
  readonly projectId: string;
  readonly skillId: string;
  readonly updatedAt: string;
}) {
  const headingId = useId();
  const { state, retry } = useProjectSkillBody(projectId, skillId, updatedAt);
  return (
    <section
      aria-labelledby={headingId}
      aria-busy={state.status === "loading"}
      className="flex flex-col gap-1 px-1"
    >
      <h5 id={headingId} className={LABEL_CLASS}>
        {C["library.detail.body"]}
      </h5>
      {state.status === "loading" ? (
        <p
          role="status"
          className={`${PANEL_LIST_CLASS} p-3 text-[13px] text-awc-fg-muted dark:text-gray-400`}
        >
          {C["library.detail.body.loading"]}
        </p>
      ) : state.status === "error" ? (
        <p
          role="alert"
          className={`${PANEL_STATUS_CLASS} flex flex-wrap items-center gap-2 px-0`}
        >
          {C["library.detail.body.error"]}
          <button type="button" className={PANEL_LINK_CLASS} onClick={retry}>
            {C["library.error.retry"]}
          </button>
        </p>
      ) : state.body.trim().length === 0 ? (
        <p className={`${PANEL_STATUS_CLASS} px-0`}>
          {C["library.detail.body.empty"]}
        </p>
      ) : (
        <pre
          tabIndex={0}
          aria-labelledby={headingId}
          className={`${PANEL_LIST_CLASS} max-h-96 overflow-auto whitespace-pre-wrap break-words p-3 font-mono text-[12.5px] leading-relaxed text-awc-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400/40 dark:text-gray-200`}
        >
          {state.body}
        </pre>
      )}
    </section>
  );
}

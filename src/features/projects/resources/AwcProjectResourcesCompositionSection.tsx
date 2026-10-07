"use client";

import useAwcProjectComposition from "@/features/projects/hooks/useAwcProjectComposition";
import { PROJECT_PAGE_RESOURCES_COPY as C } from "@/features/projects/resources/projectPageResourcesCopy.constant";
import type { ProjectEditOnMacCta } from "@/features/projects/utils/resolveProjectEditOnMacCta";

const ROW_CLASS =
  "flex items-center justify-between gap-3 border-t border-awc-border/80 px-3 py-3 first:border-t-0 dark:border-gray-800/80";
const LINK_CLASS =
  "shrink-0 text-[13px] font-medium text-awc-fg underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400/40 dark:text-white";

const KINDS = [
  { kind: "harness", title: C.playbooksTitle },
  { kind: "workflow", title: C.workflowsTitle },
  { kind: "agent", title: C.agentsTitle },
] as const;

interface Props {
  readonly projectId: string;
  readonly deviceDisplayName: string;
  readonly editCta: ProjectEditOnMacCta;
}

/** Playbooks / Workflows / Agents + Attach on this computer. */
export default function AwcProjectResourcesCompositionSection({
  projectId,
  deviceDisplayName,
  editCta,
}: Props) {
  const { counts, isLoading } = useAwcProjectComposition(projectId);
  const sub = C.pwaEmptySub(deviceDisplayName);

  return (
    <section className="flex min-w-0 flex-col gap-2" aria-labelledby="res-pwa-h">
      <div className="flex items-baseline justify-between gap-3 px-1">
        <h3
          id="res-pwa-h"
          className="text-[13px] font-semibold uppercase tracking-wide text-awc-fg-muted dark:text-gray-400"
        >
          {C.pwaHeading}
        </h3>
        {editCta.href !== null ? (
          <a
            href={editCta.href}
            target="_blank"
            rel="noopener noreferrer"
            className={LINK_CLASS}
          >
            {C.pwaAttach}
          </a>
        ) : (
          <span className={`${LINK_CLASS} cursor-not-allowed opacity-50`}>
            {C.pwaAttach}
          </span>
        )}
      </div>
      <div className="overflow-hidden rounded-2xl bg-awc-surface-2/80 dark:bg-white/[0.03]">
        {KINDS.map(({ kind, title }) => {
          const count = isLoading ? 0 : counts[kind];
          return (
            <div key={kind} className={ROW_CLASS}>
              <div className="min-w-0">
                <p className="text-[15px] font-medium text-awc-fg dark:text-gray-100">
                  {title}
                </p>
                <p className="text-[13px] text-awc-fg-muted dark:text-gray-400">
                  {count === 0 ? sub : `${count} attached. View here, edit on ${deviceDisplayName}.`}
                </p>
              </div>
              <span className="tabular-nums text-sm text-awc-fg-muted dark:text-gray-400">
                {isLoading ? "…" : count}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

import type { ReactNode } from "react";

interface DownloadStepCardProps {
  readonly id: string;
  readonly title: string;
  readonly done?: boolean;
  readonly doneLabel?: string;
  readonly children: ReactNode;
}

/** Card for one wizard step: heading, optional success pill, content. */
export default function DownloadStepCard({
  id,
  title,
  done = false,
  doneLabel = "Done",
  children,
}: DownloadStepCardProps) {
  return (
    <section
      aria-labelledby={id}
      className="flex flex-col gap-4 rounded-xl border border-awc-border bg-awc-surface p-5"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id={id} className="text-base font-semibold text-awc-fg">
          {title}
        </h2>
        {done ? (
          <span className="rounded-full bg-awc-ok-soft px-2 py-0.5 text-xs font-semibold text-awc-ok">
            {doneLabel}
          </span>
        ) : null}
      </div>
      {children}
    </section>
  );
}

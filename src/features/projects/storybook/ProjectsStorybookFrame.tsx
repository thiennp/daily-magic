"use client";

import type { ReactNode } from "react";

export type ProjectsStorybookViewport = "desktop" | "mobile";

interface ProjectsStorybookFrameProps {
  readonly title: string;
  readonly description: string;
  readonly viewport: ProjectsStorybookViewport;
  readonly children: ReactNode;
}

const ProjectsStorybookFrame = ({
  title,
  description,
  viewport,
  children,
}: ProjectsStorybookFrameProps) => (
  <article className="rounded-xl border border-awc-border bg-white p-4 dark:border-gray-800 dark:bg-gray-dark">
    <header className="mb-4 border-b border-awc-border pb-3 dark:border-gray-800">
      <h3 className="text-sm font-semibold text-awc-fg dark:text-white/90">
        {title}
      </h3>
      <p className="mt-1 text-xs text-awc-fg-muted dark:text-gray-400">
        {description}
      </p>
      <p className="mt-2 text-[0.6875rem] font-medium uppercase tracking-wide text-brand-600 dark:text-brand-400">
        {viewport === "mobile" ? "Mobile width (390px)" : "Desktop width"}
      </p>
    </header>
    <div
      className={
        viewport === "mobile"
          ? "mx-auto w-full max-w-[390px] rounded-lg border border-dashed border-awc-border p-3 dark:border-gray-700"
          : "w-full max-w-3xl"
      }
    >
      {children}
    </div>
  </article>
);

export default ProjectsStorybookFrame;

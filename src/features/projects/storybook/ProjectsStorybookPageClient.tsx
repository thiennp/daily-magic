"use client";

import Link from "next/link";
import { useState } from "react";

import { ThemeToggleButton } from "@/components/common/ThemeToggleButton";
import ProjectsStorybookMockFetchProvider from "@/features/projects/storybook/ProjectsStorybookMockFetchProvider";
import ProjectsStorybookStories from "@/features/projects/storybook/ProjectsStorybookStories";
import type { ProjectsStorybookViewport } from "@/features/projects/storybook/ProjectsStorybookFrame";

const ProjectsStorybookPageClient = () => {
  const [viewport, setViewport] =
    useState<ProjectsStorybookViewport>("desktop");

  return (
    <ProjectsStorybookMockFetchProvider>
      <div className="min-h-screen bg-awc-bg dark:bg-gray-900">
        <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur dark:border-gray-800 dark:bg-gray-900/95">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-brand-500">
                Dev only · localhost:3000
              </p>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white/90">
                Projects UI storybook
              </h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Mock API for UX review — toggle mobile/desktop, then sign in for
                live{" "}
                <Link href="/projects" className="text-brand-600">
                  /projects
                </Link>
                .
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div
                className="inline-flex rounded-lg border border-gray-200 p-0.5 dark:border-gray-700"
                role="group"
                aria-label="Preview viewport"
              >
                {(["desktop", "mobile"] as const).map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={`rounded-md px-3 py-1.5 text-sm capitalize transition ${
                      viewport === option
                        ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                        : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5"
                    }`}
                    onClick={() => {
                      setViewport(option);
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <ThemeToggleButton />
            </div>
          </div>
        </header>

        <main className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:px-6">
          <ProjectsStorybookStories viewport={viewport} />
        </main>
      </div>
    </ProjectsStorybookMockFetchProvider>
  );
};

export default ProjectsStorybookPageClient;

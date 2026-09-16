"use client";

import AppPanel from "@/components/surfaces/AppPanel";
import { ThemeToggleButton } from "@/components/common/ThemeToggleButton";
import { useStyleguideActiveSection } from "@/features/styleguide/hooks/useStyleguideActiveSection";
import { STYLEGUIDE_SECTIONS } from "@/features/styleguide/styleguideSections.constant";
import Link from "next/link";

export default function StyleguideShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const activeSectionId = useStyleguideActiveSection();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur dark:border-gray-800 dark:bg-gray-800/95">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-brand-500">
              Agent Witch
            </p>
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white/90">
              Design system
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5"
            >
              Home
            </Link>
            <ThemeToggleButton />
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1600px] gap-6 px-4 py-6 lg:grid-cols-[minmax(0,240px)_minmax(0,1fr)] lg:px-6">
        <AppPanel
          as="aside"
          padding="compact"
          className="h-fit lg:sticky lg:top-24"
        >
          <p className="mb-3 text-sm font-medium text-gray-800 dark:text-white/90">
            Sections
          </p>
          <nav className="flex flex-row flex-wrap gap-2 lg:flex-col lg:gap-1">
            {STYLEGUIDE_SECTIONS.map((section) => {
              const isActive = section.id === activeSectionId;

              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  aria-current={isActive ? "location" : undefined}
                  className={`rounded-lg px-3 py-2 text-sm transition ${
                    isActive
                      ? "bg-brand-50 font-medium text-brand-700 dark:bg-brand-950/40 dark:text-brand-300"
                      : "text-gray-600 hover:bg-gray-50 hover:text-brand-600 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-brand-400"
                  }`}
                >
                  {section.label}
                </a>
              );
            })}
          </nav>
        </AppPanel>

        <main className="min-w-0 space-y-10">{children}</main>
      </div>
    </div>
  );
}

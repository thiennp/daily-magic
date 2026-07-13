"use client";

import AppPanel from "@/components/surfaces/AppPanel";
import { ThemeToggleButton } from "@/components/common/ThemeToggleButton";
import Link from "next/link";

const STYLEGUIDE_SECTIONS = [
  { id: "brand-logo", label: "Brand logo" },
  { id: "surfaces", label: "App surfaces" },
  { id: "buttons", label: "Buttons" },
  { id: "alerts", label: "Alerts" },
  { id: "badges", label: "Badges" },
  { id: "avatars", label: "Avatars" },
  { id: "images", label: "Images" },
  { id: "videos", label: "Videos" },
  { id: "modals", label: "Modals" },
  { id: "forms", label: "Form elements" },
  { id: "tables", label: "Tables" },
  { id: "charts", label: "Charts" },
] as const;

export default function StyleguideShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur dark:border-gray-800 dark:bg-gray-900/95">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-brand-500">
              TailAdmin MIT
            </p>
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white/90">
              Component Styleguide
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

      <div className="mx-auto grid max-w-[1600px] gap-6 px-4 py-6 lg:grid-cols-[240px_1fr] lg:px-6">
        <AppPanel
          as="aside"
          padding="compact"
          className="h-fit lg:sticky lg:top-24"
        >
          <p className="mb-3 text-sm font-medium text-gray-800 dark:text-white/90">
            Sections
          </p>
          <nav className="flex flex-row flex-wrap gap-2 lg:flex-col lg:gap-1">
            {STYLEGUIDE_SECTIONS.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="rounded-lg px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-50 hover:text-brand-600 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-brand-400"
              >
                {section.label}
              </a>
            ))}
          </nav>
        </AppPanel>

        <main className="space-y-10">{children}</main>
      </div>
    </div>
  );
}

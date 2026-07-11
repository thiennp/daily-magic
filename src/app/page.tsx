import Link from "next/link";

import LocalAgentSetupInstructions from "@/features/home/LocalAgentSetupInstructions";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 dark:bg-gray-900">
      <main className="w-full max-w-2xl rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-theme-sm dark:border-gray-800 dark:bg-white/[0.03]">
        <p className="text-sm font-medium uppercase tracking-wide text-brand-500">
          Daily Magic
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-gray-800 dark:text-white/90">
          Next.js + Neon + TailAdmin
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Local app scaffold with Neon database wiring and a TailAdmin-based
          component styleguide.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/styleguide"
            className="inline-flex h-11 items-center justify-center rounded-lg bg-brand-500 px-5 text-sm font-medium text-white transition hover:bg-brand-600"
          >
            Open styleguide
          </Link>
          <Link
            href="/ws-test"
            className="inline-flex h-11 items-center justify-center rounded-lg border border-gray-200 px-5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5"
          >
            WebSocket test
          </Link>
          <a
            href="https://github.com/TailAdmin/free-nextjs-admin-dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center rounded-lg border border-gray-200 px-5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5"
          >
            TailAdmin source
          </a>
        </div>
        <LocalAgentSetupInstructions />
      </main>
    </div>
  );
}

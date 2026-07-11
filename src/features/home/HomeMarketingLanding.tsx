import Link from "next/link";
import { Suspense } from "react";

import LoginForm from "@/features/auth/LoginForm";
import HomeMarketingFeatures from "@/features/home/HomeMarketingFeatures";
import HomeMarketingSteps from "@/features/home/HomeMarketingSteps";

export default function HomeMarketingLanding() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur dark:border-gray-800 dark:bg-gray-900/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-500">
            Daily Magic
          </p>
          <Link
            href="/styleguide"
            className="text-sm text-gray-600 hover:text-brand-600 dark:text-gray-400"
          >
            Styleguide
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-16">
        <section className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-brand-500">
              Team agent dispatch
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-gray-900 dark:text-white/90 sm:text-5xl">
              Run local agents for your team — with approval, reports, and
              shared harnesses.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
              Daily Magic connects browser dashboards to paired machines in your
              group. Dispatch Claude tasks to yourself or teammates, require
              approval when policy demands it, and track every run.
            </p>
            <HomeMarketingFeatures />
          </div>

          <div
            className="rounded-2xl border border-gray-200 bg-white p-8 shadow-theme-sm dark:border-gray-800 dark:bg-white/[0.03]"
            id="get-started"
          >
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
              Get started
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Sign in to pair your machine, join a group, and dispatch your
              first agent task.
            </p>
            <div className="mt-6">
              <Suspense
                fallback={<div className="text-sm text-gray-500">Loading…</div>}
              >
                <LoginForm defaultCallbackUrl="/" />
              </Suspense>
            </div>
          </div>
        </section>

        <HomeMarketingSteps />
      </main>
    </div>
  );
}

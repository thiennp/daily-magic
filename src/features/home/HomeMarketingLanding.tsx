import Link from "next/link";
import { Suspense } from "react";

import LoginForm from "@/features/auth/LoginForm";
import HomeMarketingFeatures from "@/features/home/HomeMarketingFeatures";
import HomeMarketingSteps from "@/features/home/HomeMarketingSteps";
import MarketingCard from "@/features/marketing/MarketingCard";
import MarketingIntegrationsRow from "@/features/marketing/MarketingIntegrationsRow";
import MarketingProductPreview from "@/features/marketing/MarketingProductPreview";
import MarketingShell from "@/features/marketing/MarketingShell";
import MarketingTrustStrip from "@/features/marketing/MarketingTrustStrip";

export default function HomeMarketingLanding() {
  return (
    <MarketingShell>
      <section className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-brand-600">
            Team agent dispatch
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Run local agents for your team — with approval, reports, and shared
            harnesses.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-gray-600">
            Daily Magic connects browser dashboards to paired machines in your
            group. Dispatch Claude tasks to yourself or teammates, require
            approval when policy demands it, and track every run.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/#get-started"
              className="inline-flex h-11 items-center rounded-lg bg-brand-500 px-5 text-sm font-medium text-white transition hover:bg-brand-600"
            >
              Get started free
            </Link>
            <Link
              href="/styleguide"
              className="inline-flex h-11 items-center rounded-lg border border-gray-300 bg-white px-5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              View styleguide
            </Link>
          </div>
          <div className="mt-8">
            <MarketingTrustStrip />
          </div>
        </div>

        <div className="space-y-6">
          <MarketingProductPreview />
          <MarketingCard id="get-started">
            <h2 className="text-xl font-semibold text-gray-900">Get started</h2>
            <p className="mt-2 text-sm text-gray-600">
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
          </MarketingCard>
        </div>
      </section>

      <HomeMarketingFeatures />
      <HomeMarketingSteps />
      <MarketingIntegrationsRow />
    </MarketingShell>
  );
}

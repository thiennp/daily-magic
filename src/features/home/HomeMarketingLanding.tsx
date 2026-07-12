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
import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";

export default function HomeMarketingLanding() {
  return (
    <MarketingShell>
      <section className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-brand-600">
            AI tasks for teams
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Send work to your Mac from the browser — with your team&apos;s
            approval when it matters.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-gray-600">
            {AGENT_WITCH_PRODUCT_NAME} connects this website to computers on
            your team. Ask your own Mac for help, send a task to a colleague,
            have managers approve sensitive requests, and keep a record of every
            job.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/#get-started"
              className="inline-flex h-11 items-center rounded-lg bg-brand-500 px-5 text-sm font-medium text-white transition hover:bg-brand-600"
            >
              Get started free
            </Link>
            <Link
              href="/login"
              className="inline-flex h-11 items-center rounded-lg border border-gray-300 bg-white px-5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Sign in
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
              Sign in, connect your Mac, and send your first task in a few
              minutes.
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

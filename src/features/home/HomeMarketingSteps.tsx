import Link from "next/link";

import MarketingCard from "@/features/marketing/MarketingCard";
import MarketingSectionHeader from "@/features/marketing/MarketingSectionHeader";

const MARKETING_STEPS = [
  {
    title: "Sign in",
    body: "Create your account and open your home page.",
    href: "#get-started",
  },
  {
    title: "Install on your Mac",
    body: "After sign-in, copy the install command from Your setup on the home page.",
    href: "/login",
  },
  {
    title: "Connect & invite",
    body: "Link your Mac and invite colleagues from Companies.",
    href: "/admin/groups",
  },
  {
    title: "Send & review",
    body: "Send a task from Agent and read what happened in Reports.",
    href: "/agent",
  },
] as const;

export default function HomeMarketingSteps() {
  return (
    <section className="mt-20">
      <MarketingSectionHeader
        eyebrow="How it works"
        title="Four steps to your first task"
      />
      <MarketingCard className="mt-8">
        <ol className="grid gap-8 md:grid-cols-4">
          {MARKETING_STEPS.map((step, index) => (
            <li key={step.title} className="space-y-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-500 text-sm font-semibold text-white shadow-theme-xs">
                {index + 1}
              </span>
              <p className="text-sm font-semibold text-gray-900">
                {step.title}
              </p>
              <p className="text-sm text-gray-600">{step.body}</p>
              <Link
                href={step.href}
                className="text-sm font-medium text-brand-600 hover:text-brand-700"
              >
                Learn more →
              </Link>
            </li>
          ))}
        </ol>
      </MarketingCard>
    </section>
  );
}

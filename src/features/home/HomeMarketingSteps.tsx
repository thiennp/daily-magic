import Link from "next/link";

import MarketingCard from "@/features/marketing/MarketingCard";
import { MARKETING_TEXT_LINK_CLASSES } from "@/features/marketing/marketingInteractiveClasses.constant";
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
    <section className="mt-24" aria-labelledby="steps-heading">
      <MarketingSectionHeader
        eyebrow="How it works"
        title="Four steps to your first task"
        headingId="steps-heading"
      />
      <MarketingCard as="section" className="mt-10" interactive>
        <ol className="grid gap-8 md:grid-cols-4">
          {MARKETING_STEPS.map((step, index) => (
            <li
              key={step.title}
              className="group space-y-3 rounded-xl p-2 transition duration-200 hover:bg-gray-50/80"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-500 text-sm font-semibold text-white shadow-theme-xs transition duration-200 group-hover:scale-105">
                {index + 1}
              </span>
              <p className="text-sm font-semibold text-gray-900">{step.title}</p>
              <p className="text-sm leading-relaxed text-gray-600">{step.body}</p>
              <Link href={step.href} className={MARKETING_TEXT_LINK_CLASSES}>
                Learn more →
              </Link>
            </li>
          ))}
        </ol>
      </MarketingCard>
    </section>
  );
}

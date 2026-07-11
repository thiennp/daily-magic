import Link from "next/link";

const MARKETING_STEPS = [
  {
    title: "Sign in",
    body: "Create your account and open the dashboard.",
    href: "#get-started",
  },
  {
    title: "Install Agent Witch",
    body: "After sign-in, copy the install command from Your setup on the home page.",
    href: "/login",
  },
  {
    title: "Pair & join a group",
    body: "Link your Mac and invite teammates under Groups & policy.",
    href: "/admin/groups",
  },
  {
    title: "Dispatch & review",
    body: "Send tasks from Agent and track outcomes in Reports.",
    href: "/agent",
  },
] as const;

export default function HomeMarketingSteps() {
  return (
    <section className="mt-20 rounded-3xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-white/[0.03]">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white/90">
        How it works
      </h2>
      <ol className="mt-8 grid gap-6 md:grid-cols-4">
        {MARKETING_STEPS.map((step, index) => (
          <li key={step.title} className="space-y-3">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-500 text-sm font-semibold text-white">
              {index + 1}
            </span>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              {step.title}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {step.body}
            </p>
            <Link
              href={step.href}
              className="text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
            >
              Learn more
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}

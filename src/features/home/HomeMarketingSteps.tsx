const MARKETING_STEPS = [
  "Sign in and install the local Agent Witch client on your Mac.",
  "Pair your machine and join a group with teammates.",
  "Dispatch a task from Agent — self or cross-user within the group.",
  "Review outcomes on Reports; approve incoming dispatches when required.",
] as const;

export default function HomeMarketingSteps() {
  return (
    <section className="mt-20 rounded-3xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-white/[0.03]">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white/90">
        How it works
      </h2>
      <ol className="mt-8 grid gap-6 md:grid-cols-4">
        {MARKETING_STEPS.map((step, index) => (
          <li key={step} className="space-y-3">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-500 text-sm font-semibold text-white">
              {index + 1}
            </span>
            <p className="text-sm text-gray-600 dark:text-gray-400">{step}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

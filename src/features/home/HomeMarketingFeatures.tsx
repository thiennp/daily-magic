const MARKETING_FEATURES = [
  {
    title: "Dispatch",
    body: "Send tasks to your machine or a teammate in the same group.",
  },
  {
    title: "Approve",
    body: "Group admins set open vs approval; users can override in agent setup.",
  },
  {
    title: "Report",
    body: "Every run is recorded with status, policy, and output.",
  },
] as const;

export default function HomeMarketingFeatures() {
  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-3">
      {MARKETING_FEATURES.map((item) => (
        <div
          key={item.title}
          className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]"
        >
          <h2 className="text-sm font-semibold text-gray-800 dark:text-white/90">
            {item.title}
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {item.body}
          </p>
        </div>
      ))}
    </div>
  );
}

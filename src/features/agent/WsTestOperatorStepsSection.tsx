"use client";

interface WsTestOperatorStepsSectionProps {
  readonly operatorSteps: readonly {
    readonly id: string;
    readonly title: string;
    readonly content: string;
  }[];
}

export default function WsTestOperatorStepsSection({
  operatorSteps,
}: WsTestOperatorStepsSectionProps) {
  if (operatorSteps.length === 0) {
    return null;
  }

  return (
    <section
      aria-label="Your steps before the Mac agent runs"
      className="rounded-xl border border-amber-200 bg-amber-50/80 p-4 dark:border-amber-500/30 dark:bg-amber-950/20"
    >
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
        Your steps
      </h3>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
        Complete these before or while the Mac agent runs. The agent only gets a
        short checkpoint summary in its prompt.
      </p>
      <ol className="mt-3 space-y-3">
        {operatorSteps.map((step, index) => (
          <li
            key={step.id}
            className="text-sm text-gray-800 dark:text-gray-200"
          >
            <span className="font-medium text-gray-900 dark:text-white">
              {index + 1}. {step.title}
            </span>
            <p className="mt-1 whitespace-pre-wrap text-gray-600 dark:text-gray-300">
              {step.content}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

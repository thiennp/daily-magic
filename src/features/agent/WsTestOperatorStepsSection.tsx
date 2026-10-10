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
      aria-label="Your steps before the computer agent runs"
      className="rounded-xl border border-amber-200 bg-amber-50/80 p-4 dark:border-amber-500/30 dark:bg-amber-950/20"
    >
      <h3 className="text-sm font-semibold text-awc-fg dark:text-white">
        Your steps
      </h3>
      <p className="mt-1 text-sm text-awc-fg-muted dark:text-gray-300">
        Complete these before or while the computer agent runs. The agent only
        gets a short checkpoint summary in its prompt.
      </p>
      <ol className="mt-3 space-y-3">
        {operatorSteps.map((step, index) => (
          <li key={step.id} className="text-sm text-awc-fg dark:text-gray-200">
            <span className="font-medium text-awc-fg dark:text-white">
              {index + 1}. {step.title}
            </span>
            <p className="mt-1 whitespace-pre-wrap text-awc-fg-muted dark:text-gray-300">
              {step.content}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

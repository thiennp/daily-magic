"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  loadOnboardingSteps,
  type OnboardingStep,
} from "@/features/home/loadOnboardingSteps";

export default function HomeOnboardingChecklist() {
  const [steps, setSteps] = useState<readonly OnboardingStep[]>([]);

  useEffect(() => {
    void loadOnboardingSteps().then(setSteps);
  }, []);

  if (steps.length === 0) {
    return null;
  }

  const completedCount = steps.filter((step) => step.done).length;

  if (completedCount === steps.length) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-brand-200 bg-brand-50/50 p-6 dark:border-brand-900/40 dark:bg-brand-950/20">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
        Getting started ({completedCount}/{steps.length})
      </h2>
      <ul className="mt-4 space-y-3">
        {steps.map((step) => (
          <li key={step.id} className="flex items-center justify-between gap-3">
            <span
              className={
                step.done
                  ? "text-sm text-gray-500 line-through dark:text-gray-400"
                  : "text-sm text-gray-800 dark:text-white/90"
              }
            >
              {step.label}
            </span>
            {step.done ? (
              <span className="text-xs font-medium text-success-600">Done</span>
            ) : (
              <Link
                href={step.href}
                className="text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
              >
                Continue
              </Link>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

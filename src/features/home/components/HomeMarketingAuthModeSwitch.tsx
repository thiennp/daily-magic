"use client";

import type { MarketingAuthMode } from "@/features/marketing/public-api/presentation";

const OPTIONS: readonly { value: MarketingAuthMode; label: string }[] = [
  { value: "in", label: "Sign in" },
  { value: "up", label: "Create account" },
];

interface HomeMarketingAuthModeSwitchProps {
  readonly mode: MarketingAuthMode;
  readonly onChange: (mode: MarketingAuthMode) => void;
}

/** Design segmented control: Sign in / Create account. */
export default function HomeMarketingAuthModeSwitch({
  mode,
  onChange,
}: HomeMarketingAuthModeSwitchProps) {
  return (
    <div
      role="group"
      aria-label="Sign in or create account"
      className="inline-flex rounded-lg border border-awc-border bg-awc-fill p-0.5"
    >
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={mode === option.value}
          onClick={() => {
            onChange(option.value);
          }}
          className={`rounded-md px-3 py-1.5 text-sm font-medium ${
            mode === option.value
              ? "bg-white text-awc-fg shadow-sm"
              : "text-awc-fg-muted"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

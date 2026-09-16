"use client";

import type { ReactElement } from "react";
import Link from "next/link";

import type {
  SendReadinessBannerCta,
  SendReadinessBannerModel,
} from "@/features/agent/send-readiness/sendReadinessBanner.types";

interface SendReadinessBannerProps {
  readonly banner: SendReadinessBannerModel;
  readonly onRetry: () => void;
  readonly onFocusPrompt: () => void;
}

const severityBorderClass: Record<
  SendReadinessBannerModel["severity"],
  string
> = {
  danger:
    "border-error-200 bg-error-50 text-error-800 dark:border-error-500/30 dark:bg-error-500/10 dark:text-error-100",
  warning:
    "border-warning-200 bg-warning-50 text-warning-800 dark:border-warning-500/30 dark:bg-warning-500/10 dark:text-warning-100",
  info: "border-brand-200 bg-brand-50 text-brand-800 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-100",
};

const renderCta = (
  cta: SendReadinessBannerCta,
  onRetry: () => void,
  onFocusPrompt: () => void,
  variant: "primary" | "secondary",
): ReactElement => {
  const baseClass =
    variant === "primary"
      ? "inline-flex h-9 items-center justify-center rounded-lg bg-brand-500 px-4 text-sm font-medium text-white hover:bg-brand-600"
      : "inline-flex h-9 items-center justify-center rounded-lg border border-gray-200 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-white/5";

  if (cta.href !== undefined && cta.href.length > 0) {
    return (
      <Link key={cta.label} href={cta.href} className={baseClass}>
        {cta.label}
      </Link>
    );
  }

  const onClick = (): void => {
    if (cta.action === "retry") {
      onRetry();
      return;
    }

    if (cta.action === "focus_prompt") {
      onFocusPrompt();
    }
  };

  return (
    <button
      key={cta.label}
      type="button"
      onClick={onClick}
      className={baseClass}
    >
      {cta.label}
    </button>
  );
};

export default function SendReadinessBanner({
  banner,
  onRetry,
  onFocusPrompt,
}: SendReadinessBannerProps) {
  return (
    <div
      role="status"
      className={`mb-4 rounded-xl border px-4 py-3 ${severityBorderClass[banner.severity]}`}
    >
      <p className="text-sm font-semibold">{banner.title}</p>
      <p className="mt-1 text-sm opacity-90">{banner.body}</p>
      {banner.primaryCta !== null || banner.secondaryCta !== null ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {banner.primaryCta !== null
            ? renderCta(banner.primaryCta, onRetry, onFocusPrompt, "primary")
            : null}
          {banner.secondaryCta !== null
            ? renderCta(
                banner.secondaryCta,
                onRetry,
                onFocusPrompt,
                "secondary",
              )
            : null}
        </div>
      ) : null}
    </div>
  );
}

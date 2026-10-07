"use client";

import { useState } from "react";

import { AWC_MESSENGER_AI_SESSION_COPY as C } from "@/features/projects/messenger/awcMessengerAiSessionCopy.constant";
import type { AwcMessengerTimelineEntry } from "@/features/projects/messenger/types/awcProjectMessenger.type";
import { messengerAiSessionStatusTone } from "@/features/projects/messenger/utils/messengerAiSessionStatusTone";
import { buildProjectTabHash } from "@/lib/shell/buildNavConsolidationRedirect";

interface AwcMessengerAiSessionRowProps {
  readonly entry: AwcMessengerTimelineEntry;
}

const TONE_CLASS: Record<string, string> = {
  ok: "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-100",
  info: "border-awc-border bg-awc-tile text-awc-fg dark:border-gray-700 dark:bg-white/10 dark:text-gray-100",
  warn: "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-100",
  err: "border-red-200 bg-red-50 text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-100",
  muted:
    "border-awc-border bg-awc-tile-2 text-awc-fg-muted dark:border-gray-700 dark:bg-white/5 dark:text-gray-300",
};

const formatWhen = (iso: string): string => {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleString();
};

const formatStatusLabel = (status: string): string => {
  const trimmed = status.trim();
  if (trimmed.length === 0) return "Unknown";
  return trimmed.replaceAll("_", " ");
};

/**
 * Compact AI-session timeline row (not a chat bubble).
 * Open report → `#reports?report=<agentRunId>` when present; else expand summary.
 */
export default function AwcMessengerAiSessionRow({
  entry,
}: AwcMessengerAiSessionRowProps) {
  const [expanded, setExpanded] = useState(false);
  const session = entry.session;
  const writerLabel =
    session?.writerAgent?.trim() ||
    entry.author.displayName?.trim() ||
    C.fallbackTitle;
  const status = session?.status?.trim() || "unknown";
  const tone = messengerAiSessionStatusTone(status);
  const agentRunId = session?.agentRunId?.trim() || null;
  const summary = entry.text.trim();
  const reportHref =
    agentRunId !== null
      ? buildProjectTabHash("reports", { report: agentRunId })
      : null;

  return (
    <article
      className="w-full max-w-xl self-stretch rounded-xl border border-awc-border bg-awc-surface-2 px-3 py-2.5 dark:border-gray-800 dark:bg-white/[0.03]"
      data-entry-kind="session"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-semibold text-awc-fg dark:text-white">
          {writerLabel}
        </span>
        <span
          className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] font-medium capitalize ${TONE_CLASS[tone]}`}
          aria-label={`${C.statusLabel}: ${formatStatusLabel(status)}`}
        >
          {formatStatusLabel(status)}
        </span>
        <span className="ml-auto text-[11px] text-awc-fg-subtle dark:text-gray-400">
          {formatWhen(entry.createdAt)}
        </span>
      </div>
      {summary.length > 0 ? (
        <p
          className={`mt-1.5 text-sm leading-5 text-awc-fg-muted dark:text-gray-300 ${
            expanded ? "whitespace-pre-wrap" : "line-clamp-2"
          }`}
        >
          {summary}
        </p>
      ) : null}
      <div className="mt-2">
        {reportHref !== null ? (
          <a
            href={reportHref}
            className="text-xs font-medium text-awc-fg underline-offset-2 hover:underline dark:text-gray-200"
          >
            {C.openReport}
          </a>
        ) : summary.length > 0 ? (
          <button
            type="button"
            className="text-xs font-medium text-awc-fg underline-offset-2 hover:underline dark:text-gray-200"
            aria-expanded={expanded}
            onClick={() => {
              setExpanded((v) => !v);
            }}
          >
            {expanded ? C.hideSummary : C.showSummary}
          </button>
        ) : null}
      </div>
    </article>
  );
}

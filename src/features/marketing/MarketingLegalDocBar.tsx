"use client";

import Link from "next/link";

import {
  MARKETING_LEGAL_UPDATED,
  MARKETING_PRIVACY_COPY,
  MARKETING_TERMS_COPY,
  type MarketingLegalDoc,
} from "@/features/marketing/marketingLegalCopy.constant";

const SEG = "inline-flex gap-1 rounded-full bg-awc-fill p-[3px]";
const SEG_BTN =
  "inline-flex min-h-[30px] items-center rounded-full px-3 text-sm font-medium text-awc-fg-muted";
const SEG_ON = "bg-awc-fg font-semibold text-white";
const META_BTN =
  "inline-flex min-h-[30px] items-center rounded-lg border border-awc-border-strong bg-awc-surface px-3 text-sm font-semibold text-awc-fg hover:bg-awc-fill";

/** Privacy | Terms switch + updated chip + Print / Copy link. */
export default function MarketingLegalDocBar({
  doc,
  status,
  onCopyLink,
}: {
  readonly doc: MarketingLegalDoc;
  readonly status: string;
  readonly onCopyLink: () => void;
}) {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-3">
      <div className={SEG} role="group" aria-label="Document">
        {[MARKETING_PRIVACY_COPY, MARKETING_TERMS_COPY].map((d) => (
          <Link
            key={d.key}
            href={d.path}
            aria-current={d.key === doc.key ? "page" : undefined}
            className={`${SEG_BTN} ${d.key === doc.key ? SEG_ON : ""}`}
          >
            {d.title}
          </Link>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full border border-awc-border-strong px-2 text-xs font-medium text-awc-fg-muted">
          {MARKETING_LEGAL_UPDATED}
        </span>
        <button
          type="button"
          className={META_BTN}
          onClick={() => window.print()}
        >
          Print
        </button>
        <button type="button" className={META_BTN} onClick={onCopyLink}>
          Copy link
        </button>
        <span role="status" className="text-sm text-awc-fg-muted">
          {status}
        </span>
      </div>
    </div>
  );
}

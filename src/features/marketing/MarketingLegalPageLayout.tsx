"use client";

import { useCallback, useState } from "react";

import MarketingLegalDocBar from "@/features/marketing/MarketingLegalDocBar";
import MarketingLegalSectionBody from "@/features/marketing/MarketingLegalSectionBody";
import { type MarketingLegalDoc } from "@/features/marketing/marketingLegalCopy.constant";
import { copyProjectPathToClipboard } from "@/features/projects/utils/public-api/presentation";

const slugify = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const sectionId = (doc: MarketingLegalDoc, heading: string, index: number) =>
  `${doc.key}-${slugify(heading)}-${index}`;

/** Claude "Privacy and Terms" design: lead, TOC, switch, meta actions. */
export default function MarketingLegalPageLayout({
  doc,
}: {
  readonly doc: MarketingLegalDoc;
}) {
  const [status, setStatus] = useState("");

  const jump = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el === null) return;
    el.scrollIntoView({ block: "start" });
    const heading = el.querySelector("h2");
    heading?.setAttribute("tabindex", "-1");
    heading?.focus({ preventScroll: true });
  }, []);

  const copyLink = useCallback(async () => {
    const ok = await copyProjectPathToClipboard(
      `${window.location.origin}${doc.path}`,
    );
    setStatus(ok ? "Link copied" : "Could not copy the link.");
  }, [doc.path]);

  return (
    <div className="mx-auto max-w-[1040px] py-2 sm:py-4">
      <h1 className="text-3xl font-bold tracking-tight text-awc-fg">
        {doc.title}
      </h1>
      <p className="mt-3 text-sm text-awc-fg-muted">{doc.lead}</p>
      <div className="mt-5 grid items-start gap-6 md:grid-cols-[220px_minmax(0,1fr)]">
        <nav
          aria-label="On this page"
          className="flex flex-row flex-wrap gap-0.5 md:sticky md:top-4 md:flex-col"
        >
          {doc.sections.map((s, i) => (
            <a
              key={sectionId(doc, s.heading, i)}
              href={`#${sectionId(doc, s.heading, i)}`}
              className="rounded-[10px] px-3 py-2 text-sm font-medium text-awc-fg-muted hover:bg-awc-fill hover:text-awc-fg"
              onClick={(e) => {
                e.preventDefault();
                jump(sectionId(doc, s.heading, i));
              }}
            >
              {s.heading}
            </a>
          ))}
        </nav>
        <article className="rounded-[20px] bg-awc-surface p-4 shadow-awc-card sm:p-6">
          <MarketingLegalDocBar
            doc={doc}
            status={status}
            onCopyLink={() => void copyLink()}
          />
          {doc.sections.map((s, i) => (
            <MarketingLegalSectionBody
              key={sectionId(doc, s.heading, i)}
              id={sectionId(doc, s.heading, i)}
              section={s}
            />
          ))}
        </article>
      </div>
    </div>
  );
}

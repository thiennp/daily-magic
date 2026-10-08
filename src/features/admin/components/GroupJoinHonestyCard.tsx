"use client";

import { useState } from "react";

import Button from "@/components/ui/button/Button";
import { COMPANIES_RULES_HUB_COPY as C } from "@/features/admin/companiesRulesHubCopy.constant";

interface GroupJoinHonestyCardProps {
  readonly actorEmail: string | null;
}

export default function GroupJoinHonestyCard({
  actorEmail,
}: GroupJoinHonestyCardProps) {
  const [emailCopied, setEmailCopied] = useState(false);

  return (
    <section
      aria-labelledby="join-honesty-h"
      className="rounded-lg border border-dashed border-awc-border p-4"
    >
      <h3 id="join-honesty-h" className="text-sm font-semibold text-awc-fg">
        {C.joinHonestyHeading}
      </h3>
      <p className="mt-2 text-sm text-awc-fg-muted">{C.joinHonestyBody}</p>
      {actorEmail ? (
        <div className="mt-2 inline-flex max-w-full items-center gap-2 rounded-md border border-awc-border-strong bg-awc-surface py-0.5 pl-3 pr-0.5">
          <span className="truncate font-mono text-sm text-awc-fg-muted">
            {actorEmail}
          </span>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              void navigator.clipboard.writeText(actorEmail).then(() => {
                setEmailCopied(true);
                window.setTimeout(() => {
                  setEmailCopied(false);
                }, 2000);
              });
            }}
          >
            {emailCopied ? "Email copied" : C.copyEmail}
          </Button>
        </div>
      ) : null}
      <p className="mt-2 text-sm text-awc-fg-muted">{C.joinHonestyFollowUp}</p>
    </section>
  );
}

"use client";

import { useState } from "react";

import Button from "@/components/ui/button/Button";
import { COMPANIES_RULES_HUB_COPY as C } from "@/features/admin/companiesRulesHubCopy.constant";

interface GroupCreateCompanyPanelProps {
  readonly newGroupName: string;
  readonly actorEmail: string | null;
  readonly onNewGroupNameChange: (value: string) => void;
  readonly onCreateGroup: () => void;
}

export default function GroupCreateCompanyPanel({
  newGroupName,
  actorEmail,
  onNewGroupNameChange,
  onCreateGroup,
}: GroupCreateCompanyPanelProps) {
  const [emailCopied, setEmailCopied] = useState(false);

  return (
    <>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        {C.createBody}
      </p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <label className="flex-1">
          <span className="sr-only">{C.companyNameLabel}</span>
          <input
            value={newGroupName}
            onChange={(event) => {
              onNewGroupNameChange(event.target.value);
            }}
            placeholder={C.companyNamePlaceholder}
            aria-label={C.companyNameLabel}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-950"
          />
        </label>
        <Button onClick={() => void onCreateGroup()}>{C.createCta}</Button>
      </div>

      <section className="mt-6 rounded-lg border border-dashed border-gray-200 p-4 dark:border-gray-700">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-white/90">
          {C.joinHonestyHeading}
        </h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {C.joinHonestyBody}
        </p>
        {actorEmail ? (
          <p className="mt-2 font-mono text-sm text-gray-800 dark:text-white/90">
            {actorEmail}
          </p>
        ) : null}
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {C.joinHonestyFollowUp}
        </p>
        {actorEmail ? (
          <div className="mt-3">
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
              {emailCopied ? "Copied" : C.copyEmail}
            </Button>
          </div>
        ) : null}
      </section>
    </>
  );
}

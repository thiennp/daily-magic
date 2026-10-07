"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

import AppPanel from "@/components/surfaces/AppPanel";
import Button from "@/components/ui/button/Button";
import GroupCompanySettingsAccess from "@/features/admin/components/GroupCompanySettingsAccess";
import { COMPANIES_RULES_HUB_COPY as C } from "@/features/admin/companiesRulesHubCopy.constant";
import { COMPANIES_ENTITY_LABEL } from "@/lib/admin/companyGroupCopy.constant";
import type { GroupItem } from "@/features/admin/types/groupManagement.types";

interface GroupSelectionSectionProps {
  readonly groups: readonly GroupItem[];
  readonly selectedGroupId: string;
  readonly newGroupName: string;
  readonly canDeleteTeam: boolean;
  readonly canConfigureDispatchPolicy: boolean;
  readonly onNewGroupNameChange: (value: string) => void;
  readonly onSelectGroup: (groupId: string) => void;
  readonly onCreateGroup: () => void;
  readonly onOpenSettings: () => void;
}

export default function GroupSelectionSection({
  groups,
  selectedGroupId,
  newGroupName,
  canDeleteTeam,
  canConfigureDispatchPolicy,
  onNewGroupNameChange,
  onSelectGroup,
  onCreateGroup,
  onOpenSettings,
}: GroupSelectionSectionProps) {
  const { data: session } = useSession();
  const [emailCopied, setEmailCopied] = useState(false);
  const hasTeam = groups.length > 0;
  const actorEmail =
    session?.user &&
    "email" in session.user &&
    typeof session.user.email === "string"
      ? session.user.email
      : null;

  return (
    <AppPanel padding="compact">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
        {hasTeam ? COMPANIES_ENTITY_LABEL : C.createHeading}
      </h2>

      {!hasTeam ? (
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
      ) : null}

      {hasTeam ? (
        <GroupCompanySettingsAccess
          groups={groups}
          selectedGroupId={selectedGroupId}
          canConfigureDispatchPolicy={canConfigureDispatchPolicy}
          canDeleteTeam={canDeleteTeam}
          onSelectGroup={onSelectGroup}
          onOpenSettings={onOpenSettings}
        />
      ) : null}
    </AppPanel>
  );
}

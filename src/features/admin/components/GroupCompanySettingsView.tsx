"use client";

import AppPanel from "@/components/surfaces/AppPanel";
import Button from "@/components/ui/button/Button";
import CompaniesRulesHead, {
  COMPANIES_RULES_CRUMB_SEP,
} from "@/features/admin/components/CompaniesRulesHead";
import GroupDeleteControls from "@/features/admin/components/GroupDeleteControls";
import GroupDispatchPolicyControl from "@/features/admin/components/GroupDispatchPolicyControl";
import { COMPANIES_RULES_HUB_COPY as C } from "@/features/admin/companiesRulesHubCopy.constant";
import type { GroupItem } from "@/features/admin/types/groupManagement.types";

interface GroupCompanySettingsViewProps {
  readonly groupId: string;
  readonly groups: readonly GroupItem[];
  readonly canConfigureDispatchPolicy: boolean;
  readonly canDeleteTeam: boolean;
  readonly deleteMembers: boolean;
  readonly onBack: () => void;
  readonly onDeleteMembersChange: (value: boolean) => void;
  readonly onDeleteGroup: () => void;
}

export default function GroupCompanySettingsView({
  groupId,
  groups,
  canConfigureDispatchPolicy,
  canDeleteTeam,
  deleteMembers,
  onBack,
  onDeleteMembersChange,
  onDeleteGroup,
}: GroupCompanySettingsViewProps) {
  const companyName = groups.find((group) => group.id === groupId)?.name ?? "";

  return (
    <div className="space-y-6">
      <div>
        <Button size="sm" variant="outline" onClick={onBack}>
          {C.settingsBack}
        </Button>
      </div>
      <CompaniesRulesHead
        title={C.settingsTitle}
        crumbs={
          <>
            <button
              type="button"
              onClick={onBack}
              className="hover:text-awc-blue-700 hover:underline"
            >
              {C.crumbHub}
            </button>
            {COMPANIES_RULES_CRUMB_SEP}
            <span>{companyName}</span>
            {COMPANIES_RULES_CRUMB_SEP}
            <span aria-current="page">{C.settingsTitle}</span>
          </>
        }
      />
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-start">
        <GroupDispatchPolicyControl
          groupId={groupId}
          companyName={companyName}
          canEdit={canConfigureDispatchPolicy}
        />
        <AppPanel
          padding="compact"
          aria-labelledby="dz-h"
          className="border-awc-bad-dot/40"
        >
          <h2 id="dz-h" className="text-lg font-semibold text-awc-bad">
            {C.dangerZone}
          </h2>
          <p className="mt-2 text-sm text-awc-fg-muted">
            <b className="text-awc-fg">
              {C.deleteCompany} {companyName}
            </b>
            <br />
            {C.deleteBody}
          </p>
          <GroupDeleteControls
            canDelete={canDeleteTeam}
            groups={groups}
            selectedGroupId={groupId}
            deleteMembers={deleteMembers}
            onDeleteMembersChange={onDeleteMembersChange}
            onDeleteGroup={onDeleteGroup}
          />
        </AppPanel>
      </div>
    </div>
  );
}

"use client";

import { useId, useState } from "react";

import Button from "@/components/ui/button/Button";
import GroupCompanyNameField from "@/features/admin/components/GroupCompanyNameField";
import { COMPANIES_RULES_HUB_COPY as C } from "@/features/admin/companiesRulesHubCopy.constant";
import validateCompanyName from "@/features/admin/utils/validateCompanyName";

interface GroupCreateCompanyPanelProps {
  readonly newGroupName: string;
  readonly onNewGroupNameChange: (value: string) => void;
  readonly onCreateGroup: (name: string) => void;
}

export default function GroupCreateCompanyPanel({
  newGroupName,
  onNewGroupNameChange,
  onCreateGroup,
}: GroupCreateCompanyPanelProps) {
  const inputId = useId();
  const [error, setError] = useState("");

  return (
    <>
      <p className="mt-2 text-sm text-awc-fg-muted">{C.createBody}</p>
      <form
        noValidate
        className="mt-4 flex flex-col gap-3"
        onSubmit={(event) => {
          event.preventDefault();
          const next = validateCompanyName(newGroupName, []);
          setError(next);
          if (!next) {
            onCreateGroup(newGroupName.trim());
          }
        }}
      >
        <GroupCompanyNameField
          id={inputId}
          value={newGroupName}
          error={error}
          onChange={(value) => {
            setError("");
            onNewGroupNameChange(value);
          }}
        />
        <div>
          <Button type="submit">{C.createCta}</Button>
        </div>
      </form>
    </>
  );
}

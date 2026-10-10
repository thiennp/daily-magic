"use client";

import { useId, useState } from "react";

import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import GroupCompanyNameField from "@/features/admin/components/GroupCompanyNameField";
import { COMPANIES_RULES_HUB_COPY as C } from "@/features/admin/companiesRulesHubCopy.constant";
import { validateCompanyName } from "@/features/admin/utils/public-api/presentation";

interface GroupNewCompanyModalProps {
  readonly isOpen: boolean;
  readonly existingNames: readonly string[];
  readonly onClose: () => void;
  readonly onCreate: (name: string) => void;
}

export default function GroupNewCompanyModal({
  isOpen,
  existingNames,
  onClose,
  onCreate,
}: GroupNewCompanyModalProps) {
  const inputId = useId();
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const close = (): void => {
    setName("");
    setError("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={close} className="max-w-md p-6">
      <form
        noValidate
        aria-labelledby={`${inputId}-title`}
        onSubmit={(event) => {
          event.preventDefault();
          const next = validateCompanyName(name, existingNames);
          setError(next);
          if (!next) {
            onCreate(name.trim());
            close();
          }
        }}
      >
        <h2
          id={`${inputId}-title`}
          className="pr-10 text-lg font-semibold text-awc-fg"
        >
          {C.newCompanyTitle}
        </h2>
        <div className="mt-4">
          <GroupCompanyNameField
            id={inputId}
            value={name}
            error={error}
            autoFocus
            onChange={(value) => {
              setError("");
              setName(value);
            }}
          />
        </div>
        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <Button variant="outline" onClick={close}>
            {C.cancel}
          </Button>
          <Button type="submit">{C.createCta}</Button>
        </div>
      </form>
    </Modal>
  );
}

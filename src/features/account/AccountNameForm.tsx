"use client";

import { useId, useState } from "react";

import Button from "@/components/ui/button/Button";
import InfoTip from "@/components/ui/infoTip/InfoTip";
import {
  ACCOUNT_CHIP_CLASS,
  ACCOUNT_FIELD_CLASS,
  ACCOUNT_LABEL_CLASS,
} from "@/features/account/accountClasses.constant";
import { ACCOUNT_COPY } from "@/features/account/accountCopy.constant";
import { APP_SURFACE_CTA_SECONDARY_SM_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";

interface AccountNameFormProps {
  readonly name: string;
  readonly offline: boolean;
  /** Resolves to an error message, or null when saved. */
  readonly onSave: (name: string) => Promise<string | null>;
}

export default function AccountNameForm({
  name,
  offline,
  onSave,
}: AccountNameFormProps) {
  const copy = ACCOUNT_COPY.profile;
  const id = useId();
  const [draft, setDraft] = useState(name);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const dirty = draft.trim() !== name;

  return (
    <form
      noValidate
      className="space-y-1"
      onSubmit={(event) => {
        event.preventDefault();
        if (offline || !dirty) {
          return;
        }
        if (draft.trim().length < 2) {
          setError(copy.nameShort);
          return;
        }
        setError("");
        void onSave(draft.trim()).then((message) => {
          setError(message ?? "");
          setSaved(message === null);
        });
      }}
    >
      <label
        className={`${ACCOUNT_LABEL_CLASS} flex items-center gap-1`}
        htmlFor={id}
      >
        {copy.displayName}
        <InfoTip text={copy.displayNameTip} label="About display name" />
      </label>
      <input
        id={id}
        className={ACCOUNT_FIELD_CLASS}
        value={draft}
        maxLength={60}
        autoComplete="name"
        disabled={offline}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-err` : undefined}
        onChange={(e) => {
          setDraft(e.target.value);
          setError("");
          setSaved(false);
        }}
      />
      {error ? (
        <p id={`${id}-err`} role="alert" className="text-sm text-awc-bad">
          {error}
        </p>
      ) : null}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <Button size="sm" type="submit" disabled={offline || !dirty}>
          {copy.saveName}
        </Button>
        <button
          type="button"
          className={APP_SURFACE_CTA_SECONDARY_SM_CLASS}
          disabled={offline || !dirty}
          onClick={() => {
            setDraft(name);
            setError("");
          }}
        >
          {copy.cancel}
        </button>
        {saved && !dirty ? (
          <span role="status" className={ACCOUNT_CHIP_CLASS}>
            {copy.nameSaved}
          </span>
        ) : null}
      </div>
    </form>
  );
}

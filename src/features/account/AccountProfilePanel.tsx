"use client";

import { useState } from "react";

import Button from "@/components/ui/button/Button";
import {
  ACCOUNT_CHIP_CLASS,
  ACCOUNT_FIELD_CLASS,
  ACCOUNT_H2_CLASS,
  ACCOUNT_HINT_CLASS,
  ACCOUNT_LABEL_CLASS,
} from "@/features/account/accountClasses.constant";
import {
  ACCOUNT_AVATAR_COLORS,
  ACCOUNT_COPY,
} from "@/features/account/accountCopy.constant";

type AvatarColorId = (typeof ACCOUNT_AVATAR_COLORS)[number]["id"];
import AccountAvatarColorField from "@/features/account/AccountAvatarColorField";
import AccountProfilePlanCard from "@/features/account/AccountProfilePlanCard";
import useBillingPlan from "@/features/billing/hooks/useBillingPlan";
import { APP_SURFACE_CTA_SECONDARY_SM_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";

interface AccountProfilePanelProps {
  readonly displayName: string;
  readonly email: string;
  readonly offline: boolean;
}

export default function AccountProfilePanel({
  displayName,
  email,
  offline,
}: AccountProfilePanelProps) {
  const copy = ACCOUNT_COPY.profile;
  const { plan } = useBillingPlan();
  const [name, setName] = useState(displayName);
  const [draft, setDraft] = useState(displayName);
  const [avatarId, setAvatarId] = useState<AvatarColorId>(ACCOUNT_AVATAR_COLORS[0].id);
  const [saved, setSaved] = useState(false);
  const [emailNote, setEmailNote] = useState(false);
  const tz =
    typeof Intl !== "undefined"
      ? Intl.DateTimeFormat().resolvedOptions().timeZone
      : "UTC";

  return (
    <div className="space-y-6" data-testid="account-profile-panel">
      <section className="space-y-4">
        <h2 className={ACCOUNT_H2_CLASS}>{copy.h2}</h2>
        <div className="space-y-1">
          <label className={ACCOUNT_LABEL_CLASS} htmlFor="account-display-name">
            {copy.displayName}
          </label>
          <p className={ACCOUNT_HINT_CLASS}>{copy.displayNameTip}</p>
          <input
            id="account-display-name"
            className={ACCOUNT_FIELD_CLASS}
            value={draft}
            disabled={offline}
            onChange={(e) => {
              setDraft(e.target.value);
              setSaved(false);
            }}
          />
          <div className="flex flex-wrap gap-2 pt-1">
            <Button
              size="sm"
              disabled={offline || draft.trim() === name}
              onClick={() => {
                setName(draft.trim());
                setSaved(true);
              }}
            >
              {copy.saveName}
            </Button>
            <button
              type="button"
              className={APP_SURFACE_CTA_SECONDARY_SM_CLASS}
              disabled={offline || draft === name}
              onClick={() => {
                setDraft(name);
                setSaved(false);
              }}
            >
              {copy.cancel}
            </button>
            {saved ? (
              <span className={ACCOUNT_CHIP_CLASS}>{copy.nameSaved}</span>
            ) : null}
          </div>
        </div>
        <div className="space-y-1">
          <p className={ACCOUNT_LABEL_CLASS}>{copy.email}</p>
          <p className="text-sm text-awc-fg dark:text-gray-200">
            {email} <span className={ACCOUNT_CHIP_CLASS}>{copy.verified}</span>
          </p>
          <button
            type="button"
            className={APP_SURFACE_CTA_SECONDARY_SM_CLASS}
            disabled={offline}
            onClick={() => {
              setEmailNote(true);
            }}
          >
            {copy.changeEmail}
          </button>
          {emailNote ? (
            <p className={ACCOUNT_HINT_CLASS}>{copy.changeEmailNote}</p>
          ) : null}
        </div>
        <div className="space-y-1">
          <p className={ACCOUNT_LABEL_CLASS}>{copy.timeZone}</p>
          <p className="text-sm text-awc-fg dark:text-gray-200">{tz}</p>
          <p className={ACCOUNT_HINT_CLASS}>{copy.timeZoneHint}</p>
        </div>
        <AccountAvatarColorField
          avatarId={avatarId}
          offline={offline}
          onChange={(id) => {
            setAvatarId(id as AvatarColorId);
          }}
        />
      </section>
      <AccountProfilePlanCard planId={plan?.plan ?? null} />
    </div>
  );
}

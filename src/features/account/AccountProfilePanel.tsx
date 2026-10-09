"use client";

import AccountH2 from "@/features/account/AccountH2";
import {
  ACCOUNT_CHIP_CLASS,
  ACCOUNT_HINT_CLASS,
  ACCOUNT_LABEL_CLASS,
} from "@/features/account/accountClasses.constant";
import {
  ACCOUNT_AVATAR_COLORS,
  ACCOUNT_COPY,
} from "@/features/account/accountCopy.constant";
import AccountAvatarColorField from "@/features/account/AccountAvatarColorField";
import AccountNameForm from "@/features/account/AccountNameForm";
import AccountProfilePlanCard from "@/features/account/AccountProfilePlanCard";
import useBillingPlan from "@/features/billing/hooks/useBillingPlan";

type AvatarColorId = (typeof ACCOUNT_AVATAR_COLORS)[number]["id"];

interface AccountProfilePanelProps {
  readonly displayName: string;
  readonly email: string;
  readonly offline: boolean;
  readonly avatarId: string | null;
  readonly onAvatarChange: (id: string) => void;
  readonly onSaveName: (name: string) => Promise<string | null>;
}

const initialsOf = (value: string): string =>
  value
    .split(/[\s@.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

export default function AccountProfilePanel({
  displayName,
  email,
  offline,
  avatarId,
  onAvatarChange,
  onSaveName,
}: AccountProfilePanelProps) {
  const copy = ACCOUNT_COPY.profile;
  const { plan } = useBillingPlan();
  const name = displayName;
  const currentAvatar: AvatarColorId =
    ACCOUNT_AVATAR_COLORS.find((color) => color.id === avatarId)?.id ??
    ACCOUNT_AVATAR_COLORS[0].id;
  const tz =
    typeof Intl !== "undefined"
      ? Intl.DateTimeFormat().resolvedOptions().timeZone
      : "UTC";
  const avatarClass =
    ACCOUNT_AVATAR_COLORS.find((color) => color.id === currentAvatar)
      ?.className ?? "";

  return (
    <div className="space-y-6" data-testid="account-profile-panel">
      <section className="space-y-4" aria-labelledby="account-profile-h">
        <AccountH2 id="account-profile-h" title={copy.h2} />
        <div className="flex flex-wrap items-center gap-4">
          <span
            aria-hidden="true"
            className={`grid size-14 place-items-center rounded-full text-lg font-semibold text-white ${avatarClass}`}
          >
            {initialsOf(name)}
          </span>
          <div className="min-w-0">
            <p className="font-semibold text-awc-fg">{name}</p>
            <p className="text-sm text-awc-fg-muted">{email}</p>
          </div>
          <AccountAvatarColorField
            avatarId={currentAvatar}
            offline={offline}
            onChange={onAvatarChange}
          />
        </div>
        <AccountNameForm name={name} offline={offline} onSave={onSaveName} />
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className={ACCOUNT_LABEL_CLASS}>{copy.email}</p>
            <p className="text-sm text-awc-fg">{email}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className={ACCOUNT_CHIP_CLASS}>✓ {copy.verified}</span>
          </div>
        </div>
        <div className="space-y-1">
          <p className={ACCOUNT_LABEL_CLASS}>{copy.timeZone}</p>
          <p className="text-sm text-awc-fg">{tz}</p>
          <p className={ACCOUNT_HINT_CLASS}>{copy.timeZoneHint}</p>
        </div>
      </section>
      <AccountProfilePlanCard planId={plan?.plan ?? null} />
    </div>
  );
}

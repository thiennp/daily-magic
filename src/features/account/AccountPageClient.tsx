"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

import AppPanel from "@/components/surfaces/AppPanel";
import AccountDeletionBanner from "@/features/account/AccountDeletionBanner";
import AccountHeader from "@/features/account/AccountHeader";
import {
  ACCOUNT_COPY,
  type AccountTabId,
} from "@/features/account/accountCopy.constant";
import AccountLoadingSkeleton from "@/features/account/AccountLoadingSkeleton";
import AccountNotifyPanel from "@/features/account/AccountNotifyPanel";
import AccountOfflineBanner from "@/features/account/AccountOfflineBanner";
import AccountPrivacyPanel from "@/features/account/AccountPrivacyPanel";
import AccountProfilePanel from "@/features/account/AccountProfilePanel";
import AccountSecurityPanel from "@/features/account/AccountSecurityPanel";
import AccountSignedOutView from "@/features/account/AccountSignedOutView";
import AccountTabBar from "@/features/account/AccountTabBar";
import useNavigatorOnline from "@/features/account/useNavigatorOnline";
import { APP_PAGE_STACK_CLASS } from "@/features/shell/appPageLayout.constant";

export default function AccountPageClient() {
  const { data: session, status } = useSession();
  const offline = !useNavigatorOnline();
  const [tab, setTab] = useState<AccountTabId>("profile");
  const [deleteAt, setDeleteAt] = useState<Date | null>(null);

  if (status === "loading") {
    return <AccountLoadingSkeleton />;
  }

  if (status === "unauthenticated" || !session?.user) {
    return <AccountSignedOutView />;
  }

  const email = session.user.email ?? "";
  const displayName = session.user.name ?? email ?? ACCOUNT_COPY.h1;

  return (
    <div className={APP_PAGE_STACK_CLASS} data-testid="account-page">
      <AccountHeader tab={tab} />
      <AccountOfflineBanner offline={offline} />
      <AccountDeletionBanner
        deleteAt={deleteAt}
        offline={offline}
        onCancel={() => {
          setDeleteAt(null);
        }}
      />
      <AccountTabBar activeTab={tab} onTabChange={setTab} />
      <AppPanel
        role="tabpanel"
        id={`account-tabpanel-${tab}`}
        aria-labelledby={`account-tab-${tab}`}
      >
        {tab === "profile" ? (
          <AccountProfilePanel
            displayName={displayName}
            email={email}
            offline={offline}
          />
        ) : null}
        {tab === "security" ? (
          <AccountSecurityPanel email={email} offline={offline} />
        ) : null}
        {tab === "notify" ? <AccountNotifyPanel offline={offline} /> : null}
        {tab === "privacy" ? (
          <AccountPrivacyPanel
            email={email}
            offline={offline}
            deletionScheduled={deleteAt !== null}
            onConfirmDelete={() => {
              setDeleteAt(new Date(Date.now() + 7 * 864e5));
            }}
          />
        ) : null}
      </AppPanel>
    </div>
  );
}

"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import AppPanel from "@/components/surfaces/AppPanel";
import {
  ACCOUNT_BREADCRUMB_CLASS,
  ACCOUNT_TIP_CLASS,
} from "@/features/account/accountClasses.constant";
import {
  ACCOUNT_COPY,
  ACCOUNT_TABS,
  type AccountTabId,
} from "@/features/account/accountCopy.constant";
import AccountNotifyPanel from "@/features/account/AccountNotifyPanel";
import AccountOfflineBanner from "@/features/account/AccountOfflineBanner";
import AccountPrivacyPanel from "@/features/account/AccountPrivacyPanel";
import AccountProfilePanel from "@/features/account/AccountProfilePanel";
import AccountSecurityPanel from "@/features/account/AccountSecurityPanel";
import AccountSignedOutView from "@/features/account/AccountSignedOutView";
import AccountTabBar from "@/features/account/AccountTabBar";
import { APP_PAGE_STACK_CLASS } from "@/features/shell/appPageLayout.constant";
import { PROJECT_V5_H1_CLASS } from "@/features/projects/projectPageV5ChromeClasses.constant";

function useNavigatorOnline(): boolean {
  const [online, setOnline] = useState(true);
  useEffect(() => {
    const sync = () => {
      setOnline(navigator.onLine);
    };
    sync();
    window.addEventListener("online", sync);
    window.addEventListener("offline", sync);
    return () => {
      window.removeEventListener("online", sync);
      window.removeEventListener("offline", sync);
    };
  }, []);
  return online;
}

function tabLabel(tab: AccountTabId): string {
  return ACCOUNT_TABS.find((t) => t.id === tab)?.label ?? tab;
}

export default function AccountPageClient() {
  const { data: session, status } = useSession();
  const online = useNavigatorOnline();
  const offline = !online;
  const [tab, setTab] = useState<AccountTabId>("profile");

  if (status === "loading") {
    return (
      <p className="text-sm text-awc-fg-muted">Loading…</p>
    );
  }

  if (status === "unauthenticated" || !session?.user) {
    return <AccountSignedOutView />;
  }

  const email = session.user.email ?? "";
  const displayName = session.user.name ?? email ?? "Account";

  return (
    <div className={APP_PAGE_STACK_CLASS} data-testid="account-page">
      <nav aria-label="Breadcrumb" className={ACCOUNT_BREADCRUMB_CLASS}>
        <span>{ACCOUNT_COPY.breadcrumbRoot}</span>
        <span aria-hidden>›</span>
        <span>{tabLabel(tab)}</span>
      </nav>
      <header>
        <h1 className={PROJECT_V5_H1_CLASS}>{ACCOUNT_COPY.h1}</h1>
        <p className={ACCOUNT_TIP_CLASS}>{ACCOUNT_COPY.tip}</p>
      </header>
      <AccountOfflineBanner offline={offline} />
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
          <AccountPrivacyPanel email={email} offline={offline} />
        ) : null}
      </AppPanel>
    </div>
  );
}

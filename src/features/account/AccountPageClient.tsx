"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

import AppPanel from "@/components/surfaces/AppPanel";
import AccountHeader from "@/features/account/AccountHeader";
import {
  ACCOUNT_COPY,
  type AccountTabId,
} from "@/features/account/accountCopy.constant";
import AccountLoadingSkeleton from "@/features/account/AccountLoadingSkeleton";
import AccountNotifyPanel from "@/features/account/AccountNotifyPanel";
import AccountOfflineBanner from "@/features/account/AccountOfflineBanner";
import AccountProfilePanel from "@/features/account/AccountProfilePanel";
import AccountSignedOutView from "@/features/account/AccountSignedOutView";
import AccountTabBar from "@/features/account/AccountTabBar";
import { useAccountPrefs } from "@/features/account/useAccountPrefs";
import useNavigatorOnline from "@/features/account/useNavigatorOnline";
import { APP_PAGE_STACK_CLASS } from "@/features/shell/appPageLayout.constant";

export default function AccountPageClient() {
  const { data: session, status } = useSession();
  const offline = !useNavigatorOnline();
  const [tab, setTab] = useState<AccountTabId>("profile");
  const account = useAccountPrefs();

  if (status === "loading") {
    return <AccountLoadingSkeleton />;
  }

  if (status === "unauthenticated" || !session?.user) {
    return <AccountSignedOutView />;
  }

  const email = session.user.email ?? "";
  const displayName = account.name ?? session.user.name ?? email;

  return (
    <div className={APP_PAGE_STACK_CLASS} data-testid="account-page">
      <AccountHeader tab={tab} />
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
            avatarId={account.prefs.avatarColor}
            onAvatarChange={(avatarColor) => {
              account.savePrefs({ ...account.prefs, avatarColor });
            }}
            onSaveName={account.saveName}
          />
        ) : null}
        {tab === "notify" ? (
          <AccountNotifyPanel
            offline={offline}
            prefs={account.prefs}
            onPrefsChange={account.savePrefs}
          />
        ) : null}
      </AppPanel>
    </div>
  );
}

"use client";

import { signOut } from "next-auth/react";
import { useState } from "react";

import AccountSessionsSection from "@/features/account/AccountSessionsSection";
import AccountH2 from "@/features/account/AccountH2";
import {
  ACCOUNT_CHIP_CLASS,
  ACCOUNT_ROW_CARD_CLASS,
} from "@/features/account/accountClasses.constant";
import { ACCOUNT_COPY } from "@/features/account/accountCopy.constant";
import { APP_SURFACE_CTA_SECONDARY_SM_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import ConfirmDestructiveModal from "@/features/shell/ConfirmDestructiveModal";

interface AccountSecurityPanelProps {
  readonly email: string;
  readonly offline: boolean;
}

type SecurityConfirm = "unlink" | "signOutHere" | null;

export default function AccountSecurityPanel({
  email,
  offline,
}: AccountSecurityPanelProps) {
  const copy = ACCOUNT_COPY.security;
  const [googleLinked, setGoogleLinked] = useState(false);
  const [confirm, setConfirm] = useState<SecurityConfirm>(null);

  return (
    <div className="space-y-6" data-testid="account-security-panel">
      <section className="space-y-3" aria-labelledby="account-methods-h">
        <AccountH2
          id="account-methods-h"
          title={copy.h2SignIn}
          tip={copy.tipSignIn}
          tipLabel="About sign-in methods"
        />
        <div
          className={`${ACCOUNT_ROW_CARD_CLASS} flex flex-wrap items-center justify-between gap-2`}
        >
          <p className="text-sm font-medium text-awc-fg">
            {copy.emailCode.replace("{email}", email)}
          </p>
          <span className={ACCOUNT_CHIP_CLASS}>{copy.emailCodeAlways}</span>
        </div>
        <div
          className={`${ACCOUNT_ROW_CARD_CLASS} flex flex-wrap items-center justify-between gap-2`}
        >
          <p className="text-sm text-awc-fg">
            <b>Google</b>{" "}
            {googleLinked
              ? copy.googleLinked.replace("{email}", email)
              : copy.googleNotLinked}
          </p>
          <div className="flex items-center gap-2">
            {googleLinked ? (
              <span className={ACCOUNT_CHIP_CLASS}>Linked</span>
            ) : null}
            <button
              type="button"
              className={APP_SURFACE_CTA_SECONDARY_SM_CLASS}
              disabled={offline}
              onClick={() => {
                if (googleLinked) {
                  setConfirm("unlink");
                } else {
                  setGoogleLinked(true);
                }
              }}
            >
              {googleLinked ? copy.unlinkGoogle : copy.linkGoogle}
            </button>
          </div>
        </div>
      </section>
      <AccountSessionsSection
        offline={offline}
        onSignOutHere={() => {
          setConfirm("signOutHere");
        }}
      />
      <ConfirmDestructiveModal
        isOpen={confirm === "unlink"}
        title={copy.unlinkTitle}
        description={copy.unlinkBody.replace("{email}", email)}
        confirmLabel={copy.unlinkTitle.replace("?", "")}
        onClose={() => {
          setConfirm(null);
        }}
        onConfirm={() => {
          setGoogleLinked(false);
          setConfirm(null);
        }}
      />
      <ConfirmDestructiveModal
        isOpen={confirm === "signOutHere"}
        title={copy.signOutHereTitle}
        description={copy.signOutHereBody}
        confirmLabel={copy.signOut}
        onClose={() => {
          setConfirm(null);
        }}
        onConfirm={() => {
          void signOut({ callbackUrl: "/" });
        }}
      />
    </div>
  );
}

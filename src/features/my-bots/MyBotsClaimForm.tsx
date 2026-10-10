"use client";

import { useEffect, useRef } from "react";

import AppIcon from "@/components/ui/icon/AppIcon";
import InfoTip from "@/components/ui/infoTip/InfoTip";
import { MY_BOTS_COPY } from "@/features/my-bots/myBotsCopy.constant";
import { AWC_PROJECT_ACCESS_CTA } from "@/features/projects/access/public-api/types";
import MyBotsClaimHead from "@/features/my-bots/MyBotsClaimHead";
import { AlertIcon } from "@/icons";

interface MyBotsClaimFormProps {
  readonly code: string;
  readonly submitting: boolean;
  readonly error: string | null;
  readonly onCodeChange: (value: string) => void;
  readonly onSubmit: () => void;
  readonly onClose: () => void;
}

const INPUT_CLASS =
  "h-9 min-w-0 flex-1 rounded-md border border-awc-border-strong bg-awc-surface px-3 font-mono text-sm text-awc-fg placeholder:text-awc-fg-subtle focus-visible:border-awc-blue-600 focus-visible:outline-2 focus-visible:outline-awc-blue-600 aria-[invalid=true]:border-red-500";

export default function MyBotsClaimForm({
  code,
  submitting,
  error,
  onCodeChange,
  onSubmit,
  onClose,
}: MyBotsClaimFormProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  return (
    <section
      id="claim-card"
      aria-labelledby="cl-h"
      className="space-y-4 rounded-[20px] bg-awc-surface p-5 shadow-awc-card"
    >
      <MyBotsClaimHead onClose={onClose} />
      <form
        className="space-y-1"
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <label
          htmlFor="cl-code"
          className="flex items-center gap-1 text-sm font-medium text-awc-fg"
        >
          {MY_BOTS_COPY.claimLabel}
          <InfoTip
            text={MY_BOTS_COPY.claimTip}
            label={MY_BOTS_COPY.claimTipLabel}
          />
        </label>
        <div className="flex flex-wrap gap-2">
          <input
            ref={inputRef}
            id="cl-code"
            className={INPUT_CLASS}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            placeholder={MY_BOTS_COPY.claimPlaceholder}
            value={code}
            aria-invalid={error !== null}
            aria-describedby={error !== null ? "cl-err" : undefined}
            onChange={(event) => onCodeChange(event.target.value)}
          />
          <button
            type="submit"
            id="cl-go"
            className={AWC_PROJECT_ACCESS_CTA.primary}
            aria-busy={submitting}
            aria-disabled={submitting}
            onClick={(event) => {
              if (submitting) event.preventDefault();
            }}
          >
            {submitting
              ? MY_BOTS_COPY.claimSubmitting
              : MY_BOTS_COPY.claimSubmit}
          </button>
        </div>
        {error !== null ? (
          <p
            id="cl-err"
            role="alert"
            className="flex items-start gap-1 text-[13px] text-red-700"
          >
            <AppIcon icon={AlertIcon} size="sm" />
            <span>{error}</span>
          </p>
        ) : null}
      </form>
    </section>
  );
}

"use client";

import { MY_BOTS_COPY } from "@/features/my-bots/myBotsCopy.constant";
import { AWC_PROJECT_ACCESS_CTA } from "@/features/projects/access/awcProjectAccessCta.constant";

interface MyBotsClaimFormProps {
  readonly code: string;
  readonly submitting: boolean;
  readonly error: string | null;
  readonly onCodeChange: (value: string) => void;
  readonly onSubmit: () => void;
}

export default function MyBotsClaimForm({
  code,
  submitting,
  error,
  onCodeChange,
  onSubmit,
}: MyBotsClaimFormProps) {
  return (
    <form
      className="space-y-2 rounded-lg border border-awc-border/80 p-3 dark:border-gray-800/80"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <h3 className="text-sm font-semibold text-awc-fg dark:text-white">
        {MY_BOTS_COPY.claimHeading}
      </h3>
      <p className="text-xs text-awc-fg-muted dark:text-gray-400">
        {MY_BOTS_COPY.claimHint}
      </p>
      <input
        className="mt-1 w-full rounded-md border border-awc-border-strong bg-white px-2 py-1.5 text-sm dark:border-gray-700 dark:bg-gray-950"
        name="claim-code"
        autoComplete="off"
        spellCheck={false}
        placeholder={MY_BOTS_COPY.claimPlaceholder}
        value={code}
        onChange={(event) => onCodeChange(event.target.value)}
      />
      <button
        type="submit"
        className={AWC_PROJECT_ACCESS_CTA.primary}
        disabled={submitting || code.trim() === ""}
      >
        {submitting ? MY_BOTS_COPY.claimSubmitting : MY_BOTS_COPY.claimSubmit}
      </button>
      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </form>
  );
}

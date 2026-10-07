"use client";

import { AWC_DELIVERY_MODE_COPY } from "@/features/projects/access/awcDeliveryModeCopy.constant";
import { awcGrokWakeLinkHash } from "@/features/projects/access/awcGrokWakeLinkDeepLink";
import { AWC_PROJECT_ACCESS_CTA } from "@/features/projects/access/awcProjectAccessCta.constant";
import { useMemberDeliveryMode } from "@/features/projects/access/hooks/useMemberDeliveryMode";

interface AwcProjectAccessMemberDeliveryModeControlProps {
  readonly projectId: string;
  readonly membershipId: string;
  readonly memberName: string | null;
  /** Display mode: webhook only with a wake link (never claim wake without one). */
  readonly deliveryMode: "webhook" | "poll";
  /** False → "Wakes up on its own" is disabled; "Add wake link" under the help line. */
  readonly wakeLinkSet: boolean;
}

/** Owner: "How it gets messages" — Wakes up on its own / Checks on demand. */
export default function AwcProjectAccessMemberDeliveryModeControl({
  projectId,
  membershipId,
  memberName,
  deliveryMode,
  wakeLinkSet,
}: AwcProjectAccessMemberDeliveryModeControlProps) {
  const copy = AWC_DELIVERY_MODE_COPY;
  const state = useMemberDeliveryMode({
    projectId,
    membershipId,
    memberName,
    initialMode: deliveryMode,
  });
  const name = `delivery-mode-${membershipId}`;
  const option = (
    value: "webhook" | "poll",
    label: string,
    disabled: boolean,
  ) => (
    <label className="inline-flex items-center gap-1.5 text-xs text-awc-fg dark:text-gray-200">
      <input
        type="radio"
        name={name}
        value={value}
        checked={state.mode === value}
        disabled={disabled || state.saving}
        onChange={() => state.choose(value)}
      />
      {label}
    </label>
  );
  return (
    <fieldset className="basis-full space-y-1">
      <legend className="text-xs font-medium text-awc-fg-muted dark:text-gray-300">
        {copy.label}
      </legend>
      <div className="flex flex-wrap items-center gap-3">
        {option("webhook", copy.optionWebhook, !wakeLinkSet)}
        {option("poll", copy.optionPoll, false)}
      </div>
      {wakeLinkSet ? null : (
        <div className="space-y-1">
          <p className="text-xs text-awc-fg-muted dark:text-gray-400">
            {copy.webhookNeedsLink}
          </p>
          <a
            href={`#${awcGrokWakeLinkHash(membershipId)}`}
            className={AWC_PROJECT_ACCESS_CTA.secondary}
          >
            {copy.addWakeLink}
          </a>
        </div>
      )}
      {state.toast ? (
        <p
          role="status"
          className="text-xs text-emerald-800 dark:text-emerald-200"
        >
          {state.toast}
        </p>
      ) : null}
      {state.error ? (
        <p className="text-xs text-red-600">{state.error}</p>
      ) : null}
    </fieldset>
  );
}

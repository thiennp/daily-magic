"use client";

import { useRef } from "react";

import AwcProjectAccessMemberGrokWakeLinkFields from "@/features/projects/access/AwcProjectAccessMemberGrokWakeLinkFields";
import { AWC_GROK_WAKE_AWAITING_COPY } from "@/features/projects/access/awcGrokWakeAwaitingCopy.constant";
import { awcGrokWakeLinkHash } from "@/features/projects/access/awcGrokWakeLinkDeepLink";
import { AWC_GROK_WEBHOOK_FORM_COPY } from "@/features/projects/access/awcGrokWebhookFormCopy.constant";
import { AWC_PROJECT_ACCESS_CTA } from "@/features/projects/access/awcProjectAccessCta.constant";
import { useMemberGrokWebhookForm } from "@/features/projects/access/hooks/useMemberGrokWebhookForm";
import { useWakeLinkOpenRequest } from "@/features/projects/access/hooks/useWakeLinkOpenRequest";

interface AwcProjectAccessMemberGrokWebhookFormProps {
  readonly projectId: string;
  readonly membershipId: string;
  /** Project nickname for `{name}` in owner copy. */
  readonly memberName?: string | null;
  /** From the owner Access snapshot; true → toggle reads "Change wake link". */
  readonly wakeLinkSet?: boolean;
  /** Bumped by deep link / "Add wake link" → expand, scroll, focus. */
  readonly openRequest?: number;
  readonly onSaved?: (membershipId: string) => void;
}

/** Owner secret form: values go to the owner route, never into chat. After save: host + key set. */
export default function AwcProjectAccessMemberGrokWebhookForm({
  projectId,
  membershipId,
  memberName = null,
  wakeLinkSet = false,
  openRequest = 0,
  onSaved,
}: AwcProjectAccessMemberGrokWebhookFormProps) {
  const copy = AWC_GROK_WEBHOOK_FORM_COPY;
  const wake = AWC_GROK_WAKE_AWAITING_COPY;
  const form = useMemberGrokWebhookForm({ projectId, membershipId, onSaved });
  const containerRef = useRef<HTMLDivElement | null>(null);
  useWakeLinkOpenRequest({
    containerRef,
    openRequest,
    openForm: form.openForm,
    membershipId,
  });
  const toggleLabel = wakeLinkSet ? wake.rowAction : copy.toggle;
  return (
    <div
      ref={containerRef}
      id={awcGrokWakeLinkHash(membershipId)}
      className="basis-full scroll-mt-20"
    >
      <button
        type="button"
        className={AWC_PROJECT_ACCESS_CTA.secondary}
        aria-expanded={form.open}
        onClick={form.toggle}
      >
        {form.open ? copy.hide : toggleLabel}
      </button>
      {form.open ? (
        <AwcProjectAccessMemberGrokWakeLinkFields
          form={form}
          memberName={memberName}
        />
      ) : null}
    </div>
  );
}

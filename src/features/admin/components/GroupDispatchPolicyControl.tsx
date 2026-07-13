"use client";

import { useEffect, useState } from "react";

import Button from "@/components/ui/button/Button";
import { APP_SURFACE_NESTED_CARD_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import { COMPANY_ENTITY_LABEL } from "@/lib/admin/companyGroupCopy.constant";
import { useDemoPreview } from "@/features/demo/DemoPreviewContext";
import {
  DispatchPolicy,
  type DispatchPolicyValue,
} from "@/lib/dispatch/DispatchPolicy.constant";

interface GroupDispatchPolicyControlProps {
  readonly groupId: string;
}

export default function GroupDispatchPolicyControl({
  groupId,
}: GroupDispatchPolicyControlProps) {
  const demoPreview = useDemoPreview();
  const [policy, setPolicy] = useState<DispatchPolicyValue>(
    () =>
      demoPreview?.dispatchPolicyByGroupId[groupId] ?? DispatchPolicy.APPROVAL,
  );
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (demoPreview) {
      return;
    }

    void (async () => {
      const response = await fetch(
        `/api/admin/groups/${groupId}/dispatch-policy`,
      );
      if (!response.ok) {
        return;
      }

      const data: unknown = await response.json();
      if (
        typeof data === "object" &&
        data !== null &&
        "dispatchPolicy" in data &&
        typeof (data as { dispatchPolicy: string }).dispatchPolicy === "string"
      ) {
        const nextPolicy = (data as { dispatchPolicy: string }).dispatchPolicy;
        if (
          nextPolicy === DispatchPolicy.OPEN ||
          nextPolicy === DispatchPolicy.APPROVAL
        ) {
          setPolicy(nextPolicy);
        }
      }
    })();
  }, [demoPreview, groupId]);

  const savePolicy = async (): Promise<void> => {
    if (demoPreview) {
      setMessage("Demo preview — policy changes are not saved.");
      return;
    }

    const response = await fetch(
      `/api/admin/groups/${groupId}/dispatch-policy`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dispatchPolicy: policy }),
      },
    );

    setMessage(
      response.ok
        ? `${COMPANY_ENTITY_LABEL} dispatch policy saved.`
        : "Could not save dispatch policy.",
    );
  };

  return (
    <div className={`mt-4 ${APP_SURFACE_NESTED_CARD_CLASS}`}>
      <h3 className="text-sm font-semibold text-gray-800 dark:text-white/90">
        {COMPANY_ENTITY_LABEL} dispatch policy
      </h3>
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        Default for members: open runs immediately, approval requires browser
        and device confirmation.
      </p>
      <select
        value={policy}
        onChange={(event) => {
          setPolicy(event.target.value as DispatchPolicyValue);
        }}
        className="mt-3 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-950"
      >
        <option value={DispatchPolicy.APPROVAL}>Approval required</option>
        <option value={DispatchPolicy.OPEN}>Open dispatch</option>
      </select>
      <div className="mt-3">
        <Button onClick={() => void savePolicy()}>Save policy</Button>
      </div>
      {message ? (
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          {message}
        </p>
      ) : null}
    </div>
  );
}

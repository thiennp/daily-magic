"use client";

import { useEffect, useState } from "react";

import Button from "@/components/ui/button/Button";
import AppPanel from "@/components/surfaces/AppPanel";
import { useHomeSetupEmbedded } from "@/features/home/HomeSetupEmbeddedContext";
import { COMPANY_ENTITY_LABEL } from "@/lib/admin/companyGroupCopy.constant";
import DispatchPolicyPreviewControls from "@/features/dispatch/DispatchPolicyPreviewControls";
import {
  DispatchPolicy,
  type DispatchPolicyValue,
} from "@/lib/dispatch/DispatchPolicy.constant";

export default function AgentDispatchPolicyPanel() {
  const [policy, setPolicy] = useState<DispatchPolicyValue | "inherit">(
    "inherit",
  );
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    void (async () => {
      const response = await fetch("/api/agent-witch/dispatch-policy");
      if (!response.ok) {
        return;
      }

      const data: unknown = await response.json();
      if (
        typeof data === "object" &&
        data !== null &&
        "dispatchPolicy" in data
      ) {
        const nextPolicy = (data as { dispatchPolicy: string | null })
          .dispatchPolicy;
        if (nextPolicy === null) {
          setPolicy("inherit");
        } else if (
          nextPolicy === DispatchPolicy.OPEN ||
          nextPolicy === DispatchPolicy.APPROVAL
        ) {
          setPolicy(nextPolicy);
        }
      }
    })();
  }, []);

  const savePolicy = async (): Promise<void> => {
    const response = await fetch("/api/agent-witch/dispatch-policy", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        dispatchPolicy: policy === "inherit" ? null : policy,
      }),
    });

    setMessage(
      response.ok
        ? `${COMPANY_ENTITY_LABEL} rule preference saved.`
        : `Could not save ${COMPANY_ENTITY_LABEL.toLowerCase()} rule preference.`,
    );
  };

  const embedded = useHomeSetupEmbedded();

  return (
    <AppPanel embedded={embedded}>
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
        Who can send tasks to your Mac
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Override your company default for tasks sent to your computer.
      </p>
      <select
        value={policy}
        onChange={(event) => {
          setPolicy(event.target.value as DispatchPolicyValue | "inherit");
        }}
        className="mt-4 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-950"
      >
        <option value="inherit">Use company default</option>
        <option value={DispatchPolicy.APPROVAL}>Ask me first</option>
        <option value={DispatchPolicy.OPEN}>
          Anyone in the company can send
        </option>
      </select>
      <div className="mt-4">
        <Button onClick={() => void savePolicy()}>Save preference</Button>
      </div>
      {message ? (
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          {message}
        </p>
      ) : null}
      <DispatchPolicyPreviewControls />
    </AppPanel>
  );
}

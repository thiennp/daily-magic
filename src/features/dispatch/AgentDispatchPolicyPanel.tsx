"use client";

import { useEffect, useState } from "react";

import Button from "@/components/ui/button/Button";
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
        ? "Agent dispatch preference saved."
        : "Could not save agent dispatch preference.",
    );
  };

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
        Your agent dispatch preference
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Override your group default for tasks dispatched to your machine.
      </p>
      <select
        value={policy}
        onChange={(event) => {
          setPolicy(event.target.value as DispatchPolicyValue | "inherit");
        }}
        className="mt-4 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-950"
      >
        <option value="inherit">Inherit group default</option>
        <option value={DispatchPolicy.APPROVAL}>Approval required</option>
        <option value={DispatchPolicy.OPEN}>Open dispatch</option>
      </select>
      <div className="mt-4">
        <Button onClick={() => void savePolicy()}>Save preference</Button>
      </div>
      {message ? (
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          {message}
        </p>
      ) : null}
    </section>
  );
}

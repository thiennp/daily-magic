"use client";

import { useEffect, useState } from "react";

import HarnessSetSharingList, {
  type HarnessSetSharingRow,
} from "@/features/harness/HarnessSetSharingList";
import type { HarnessSetSharingVisibilityValue } from "@/lib/harness/harnessSetSharingQueries";

export default function HarnessSetSharingPanel() {
  const [sets, setSets] = useState<readonly HarnessSetSharingRow[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    void (async () => {
      const response = await fetch("/api/agent-witch/harness-set-sharing");
      if (!response.ok) {
        return;
      }

      const data: unknown = await response.json();
      if (
        typeof data === "object" &&
        data !== null &&
        "sets" in data &&
        Array.isArray((data as { sets: unknown }).sets)
      ) {
        setSets((data as { sets: HarnessSetSharingRow[] }).sets);
      }
    })();
  }, []);

  const updateVisibility = (
    setSlug: string,
    visibility: HarnessSetSharingVisibilityValue,
  ): void => {
    setSets((current) =>
      current.map((set) =>
        set.slug === setSlug ? { ...set, visibility } : set,
      ),
    );
  };

  const saveSetVisibility = async (setSlug: string): Promise<void> => {
    const set = sets.find((entry) => entry.slug === setSlug);
    if (set === undefined) {
      return;
    }

    const response = await fetch("/api/agent-witch/harness-set-sharing", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        setSlug: set.slug,
        visibility: set.visibility,
      }),
    });

    setMessage(
      response.ok
        ? `Saved visibility for ${set.name}.`
        : `Could not save visibility for ${set.name}.`,
    );
  };

  return (
    <section className="mt-6 border-t border-gray-200 pt-6 dark:border-gray-800">
      <HarnessSetSharingList
        sets={sets}
        onVisibilityChange={updateVisibility}
        onSave={(setSlug) => {
          void saveSetVisibility(setSlug);
        }}
      />
      {message ? (
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          {message}
        </p>
      ) : null}
    </section>
  );
}

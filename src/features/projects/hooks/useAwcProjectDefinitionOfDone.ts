"use client";

import { useCallback, useEffect, useState } from "react";

type LoadState = "loading" | "ready" | "failed";

/** GET / PUT /api/projects/:id/definition-of-done (PUT is owner only). */
const useAwcProjectDefinitionOfDone = (projectId: string) => {
  const url = `/api/projects/${encodeURIComponent(projectId)}/definition-of-done`;
  const [saved, setSaved] = useState<string>("");
  const [draft, setDraft] = useState<string>("");
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    void (async () => {
      try {
        const res = await fetch(url, {
          cache: "no-store",
          signal: controller.signal,
        });
        const data: unknown = await res.json();
        const body =
          typeof data === "object" && data !== null && "body" in data
            ? (data as { body: unknown }).body
            : undefined;
        if (controller.signal.aborted) return;
        if (!res.ok || (body !== null && typeof body !== "string")) {
          setLoadState("failed");
          return;
        }
        setSaved(body ?? "");
        setDraft(body ?? "");
        setLoadState("ready");
      } catch {
        if (!controller.signal.aborted) setLoadState("failed");
      }
    })();
    return () => {
      controller.abort();
    };
  }, [url]);

  const save = useCallback(async (): Promise<void> => {
    setIsSaving(true);
    setErrorMessage(null);
    try {
      const res = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: draft }),
      });
      if (!res.ok) {
        setErrorMessage(
          res.status === 400
            ? "Keep it to 600 characters."
            : "Could not save. Try again.",
        );
        return;
      }
      const next = draft.trim();
      setSaved(next);
      setDraft(next);
    } catch {
      setErrorMessage("Could not save. Try again.");
    } finally {
      setIsSaving(false);
    }
  }, [url, draft]);

  return { saved, draft, setDraft, loadState, isSaving, errorMessage, save };
};

export default useAwcProjectDefinitionOfDone;

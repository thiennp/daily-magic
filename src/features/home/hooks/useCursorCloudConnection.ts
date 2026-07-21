"use client";

import { useCallback, useEffect, useState } from "react";

import {
  emptyCursorCloudConnectionSummary,
  parseCursorCloudConnectionSummary,
  readCursorCloudConnectionError,
} from "@/features/home/utils/parseCursorCloudConnectionSummary";
import type { CursorCloudConnectionSummary } from "@/lib/cursorCloud/types/CursorCloudConnection.type";

const loadCursorCloudConnectionSummary = async (): Promise<{
  readonly summary: CursorCloudConnectionSummary;
  readonly error: string | null;
}> => {
  try {
    const response = await fetch("/api/cursor-cloud/connection");
    if (!response.ok) {
      return {
        summary: emptyCursorCloudConnectionSummary(),
        error: "Could not load Cursor Cloud status.",
      };
    }
    return {
      summary: parseCursorCloudConnectionSummary(await response.json()),
      error: null,
    };
  } catch {
    return {
      summary: emptyCursorCloudConnectionSummary(),
      error: "Could not load Cursor Cloud status.",
    };
  }
};

export default function useCursorCloudConnection() {
  const [summary, setSummary] = useState<CursorCloudConnectionSummary>(
    emptyCursorCloudConnectionSummary(),
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    const loaded = await loadCursorCloudConnectionSummary();
    setSummary(loaded.summary);
    setError(loaded.error);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const cancelledRef = { current: false };

    const loadConnection = async (): Promise<void> => {
      setIsLoading(true);
      const loaded = await loadCursorCloudConnectionSummary();
      if (cancelledRef.current) {
        return;
      }
      setSummary(loaded.summary);
      setError(loaded.error);
      setIsLoading(false);
    };

    void loadConnection();

    return () => {
      cancelledRef.current = true;
    };
  }, []);

  const connect = useCallback(
    async (apiKey: string): Promise<string | null> => {
      setError(null);
      const response = await fetch("/api/cursor-cloud/connection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey }),
      });
      const body: unknown = await response.json().catch(() => null);
      if (!response.ok) {
        const message = readCursorCloudConnectionError(body);
        setError(message);
        return message;
      }
      setSummary(parseCursorCloudConnectionSummary(body));
      return null;
    },
    [],
  );

  const disconnect = useCallback(async (): Promise<void> => {
    await fetch("/api/cursor-cloud/connection", { method: "DELETE" });
    setSummary(emptyCursorCloudConnectionSummary());
  }, []);

  return {
    summary,
    isLoading,
    error,
    refresh,
    connect,
    disconnect,
  };
}

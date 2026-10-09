"use client";

import { useCallback, useEffect, useState } from "react";

import {
  DEFAULT_ACCOUNT_PREFS,
  type AccountPrefs,
} from "@/lib/account/accountPrefs";

export interface AccountPrefsState {
  readonly loaded: boolean;
  /** Saved display name; null until loaded or when none is stored. */
  readonly name: string | null;
  readonly prefs: AccountPrefs;
  /** Resolves to an error message, or null when saved. */
  readonly saveName: (name: string) => Promise<string | null>;
  readonly savePrefs: (next: AccountPrefs) => void;
}

const patchAccount = async (
  body: Record<string, unknown>,
): Promise<string | null> => {
  try {
    const response = await fetch("/api/account", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (response.ok) {
      return null;
    }
    const data = (await response.json().catch(() => ({}))) as {
      errorMessage?: unknown;
    };
    return typeof data.errorMessage === "string"
      ? data.errorMessage
      : "Could not save. Try again.";
  } catch {
    return "Could not save. Try again.";
  }
};

/** Own name and Account page preferences, saved on the server (one blob per user). */
export const useAccountPrefs = (): AccountPrefsState => {
  const [loaded, setLoaded] = useState(false);
  const [name, setName] = useState<string | null>(null);
  const [prefs, setPrefs] = useState<AccountPrefs>(DEFAULT_ACCOUNT_PREFS);

  useEffect(() => {
    const controller = new AbortController();
    void fetch("/api/account", { signal: controller.signal, cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { name?: string | null; prefs?: AccountPrefs } | null) => {
        if (data?.prefs !== undefined) {
          setName(data.name ?? null);
          setPrefs(data.prefs);
        }
        setLoaded(true);
      })
      .catch(() => undefined);
    return () => controller.abort();
  }, []);

  const saveName = useCallback(async (next: string): Promise<string | null> => {
    const error = await patchAccount({ name: next });
    if (error === null) {
      setName(next);
    }
    return error;
  }, []);

  const savePrefs = useCallback((next: AccountPrefs): void => {
    setPrefs(next);
    void patchAccount({ prefs: next });
  }, []);

  return { loaded, name, prefs, saveName, savePrefs };
};

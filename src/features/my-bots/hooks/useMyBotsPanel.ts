"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { MY_BOTS_COPY } from "@/features/my-bots/myBotsCopy.constant";
import { filterMyBots } from "@/features/my-bots/utils/filterMyBots";
import {
  fetchMyBots,
  redeemMyBotClaimCode,
  unclaimMyBot,
} from "@/features/my-bots/utils/myBotsApi";
import { validateClaimCode } from "@/features/my-bots/utils/validateClaimCode";
import type { OwnedBotView } from "@/lib/agentAccess/claimBot/listOwnedBots";

export type MyBotsLoadStatus = "loading" | "ok" | "error";

export const useMyBotsPanel = () => {
  const [bots, setBots] = useState<readonly OwnedBotView[]>([]);
  const [status, setStatus] = useState<MyBotsLoadStatus>("loading");
  const [query, setQuery] = useState("");
  const [claimOpen, setClaimOpen] = useState(false);
  const [code, setCode] = useState("");
  const [claimError, setClaimError] = useState<string | null>(null);
  const [claiming, setClaiming] = useState(false);
  const [unclaimingId, setUnclaimingId] = useState<string | null>(null);
  const [unclaimError, setUnclaimError] = useState<string | null>(null);

  const reload = useCallback(() => {
    void fetchMyBots()
      .then((result) => {
        if (result.ok === false || result.bots === undefined) {
          setStatus("error");
          return;
        }
        setBots(result.bots);
        setStatus("ok");
      })
      .catch(() => setStatus("error"));
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const retry = () => {
    setStatus("loading");
    reload();
  };

  const claim = () => {
    const invalid = validateClaimCode(code);
    if (invalid !== null) {
      setClaimError(invalid);
      return;
    }
    setClaiming(true);
    setClaimError(null);
    void redeemMyBotClaimCode(code.trim())
      .then((result) => {
        if (!result.ok) {
          setClaimError(
            result.code === "locked"
              ? (result.errorMessage ?? MY_BOTS_COPY.locked)
              : (result.errorMessage ?? MY_BOTS_COPY.failed),
          );
          return;
        }
        setCode("");
        setQuery("");
        setClaimOpen(false);
        reload();
      })
      .catch(() => setClaimError(MY_BOTS_COPY.failed))
      .finally(() => setClaiming(false));
  };

  const unclaim = (tokenId: string) => {
    setUnclaimingId(tokenId);
    setUnclaimError(null);
    void unclaimMyBot(tokenId)
      .then((result) => {
        if (result.ok) reload();
        else setUnclaimError(MY_BOTS_COPY.unclaimFailed);
      })
      .catch(() => setUnclaimError(MY_BOTS_COPY.unclaimFailed))
      .finally(() => setUnclaimingId(null));
  };

  const visibleBots = useMemo(() => filterMyBots(bots, query), [bots, query]);

  return {
    bots,
    visibleBots,
    status,
    query,
    setQuery,
    retry,
    claimOpen,
    setClaimOpen,
    code,
    setCode: (value: string) => {
      setCode(value);
      setClaimError(null);
    },
    claimError,
    claiming,
    claim,
    unclaimingId,
    unclaimError,
    unclaim,
  };
};

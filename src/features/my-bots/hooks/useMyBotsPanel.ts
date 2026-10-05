"use client";

import { useCallback, useEffect, useState } from "react";

import { MY_BOTS_COPY } from "@/features/my-bots/myBotsCopy.constant";
import {
  fetchMyBots,
  redeemMyBotClaimCode,
  unclaimMyBot,
} from "@/features/my-bots/utils/myBotsApi";
import type { OwnedBotView } from "@/lib/agentAccess/claimBot/listOwnedBots";

export const useMyBotsPanel = () => {
  const [bots, setBots] = useState<readonly OwnedBotView[]>([]);
  const [code, setCode] = useState("");
  const [claimError, setClaimError] = useState<string | null>(null);
  const [claiming, setClaiming] = useState(false);
  const [unclaimingId, setUnclaimingId] = useState<string | null>(null);
  const [listError, setListError] = useState<string | null>(null);

  const reload = useCallback(() => {
    void fetchMyBots()
      .then((result) => {
        setBots(result.bots ?? []);
        setListError(null);
      })
      .catch(() => setListError(MY_BOTS_COPY.failed));
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const claim = () => {
    setClaiming(true);
    setClaimError(null);
    void redeemMyBotClaimCode(code)
      .then((result) => {
        if (!result.ok) {
          setClaimError(
            result.code === "locked"
              ? (result.errorMessage ?? MY_BOTS_COPY.locked)
              : (result.errorMessage ?? result.code ?? MY_BOTS_COPY.failed),
          );
          return;
        }
        setCode("");
        reload();
      })
      .catch(() => setClaimError(MY_BOTS_COPY.failed))
      .finally(() => setClaiming(false));
  };

  const unclaim = (tokenId: string) => {
    setUnclaimingId(tokenId);
    void unclaimMyBot(tokenId)
      .then((result) => {
        if (result.ok) reload();
      })
      .finally(() => setUnclaimingId(null));
  };

  return {
    bots,
    code,
    setCode,
    claimError,
    claiming,
    unclaimingId,
    listError,
    claim,
    unclaim,
  };
};

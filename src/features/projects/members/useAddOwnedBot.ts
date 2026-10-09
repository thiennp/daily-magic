"use client";

import { useState } from "react";

import {
  addOwnedBotApi,
  fetchOwnedBotsApi,
  type OwnedBotOption,
} from "@/features/projects/access/utils/botManagementApi";
import { BOT_CLAIM_COPY as C } from "@/features/projects/members/botClaimCopy.constant";

/** State + actions behind "Add one of my assistants". */
export const useAddOwnedBot = (input: {
  readonly projectId: string;
  readonly onAdded: () => void;
}) => {
  const { projectId, onAdded } = input;
  const [bots, setBots] = useState<readonly OwnedBotOption[] | null>(null);
  const [open, setOpen] = useState(false);
  const [botUserId, setBotUserId] = useState("");
  const [name, setName] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pick = (id: string, list: readonly OwnedBotOption[]): void => {
    setBotUserId(id);
    setName(list.find((b) => b.userId === id)?.suggestedName ?? "");
  };
  const show = async (): Promise<void> => {
    setOpen(true);
    setError(null);
    const list = await fetchOwnedBotsApi(projectId);
    if (list === null) return setError(C.addLoadFailed);
    setBots(list);
    if (list[0]) pick(list[0].userId, list);
  };
  const add = async (): Promise<void> => {
    setPending(true);
    setError(null);
    const result = await addOwnedBotApi(projectId, {
      botUserId,
      projectDisplayName: name.trim(),
    });
    setPending(false);
    if (result.ok) {
      setOpen(false);
      setBots(null);
      onAdded();
    } else {
      setError(result.code === "display_name_taken" ? C.addTaken : C.addFailed);
    }
  };

  return {
    bots,
    open,
    setOpen,
    botUserId,
    name,
    setName,
    pending,
    error,
    pick,
    show,
    add,
  };
};

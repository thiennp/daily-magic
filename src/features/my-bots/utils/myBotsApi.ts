import type { OwnedBotView } from "@/lib/agentAccess/claimBot/listOwnedBots";

export type MyBotsListResponse = {
  readonly ok?: boolean;
  readonly bots?: readonly OwnedBotView[];
  readonly errorMessage?: string;
};

export type MyBotsRedeemResponse = {
  readonly ok?: boolean;
  readonly code?: string;
  readonly retryAt?: string;
  readonly errorMessage?: string;
  readonly tokenId?: string;
};

export const fetchMyBots = async (): Promise<MyBotsListResponse> => {
  const response = await fetch("/api/me/bots", { cache: "no-store" });
  return response.json() as Promise<MyBotsListResponse>;
};

export const redeemMyBotClaimCode = async (
  code: string,
): Promise<MyBotsRedeemResponse> => {
  const response = await fetch("/api/me/bots", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code }),
  });
  return response.json() as Promise<MyBotsRedeemResponse>;
};

export const unclaimMyBot = async (
  tokenId: string,
): Promise<{ readonly ok?: boolean; readonly errorMessage?: string }> => {
  const response = await fetch(
    `/api/me/bots/${encodeURIComponent(tokenId)}/unclaim`,
    { method: "POST" },
  );
  return response.json() as Promise<{
    readonly ok?: boolean;
    readonly errorMessage?: string;
  }>;
};

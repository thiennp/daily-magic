export type RedeemClaimBotCodeResult =
  | {
      readonly ok: true;
      readonly tokenId: string;
      readonly botUserId: string;
    }
  | {
      readonly ok: false;
      readonly code:
        | "locked"
        | "invalid_code"
        | "expired"
        | "already_claimed"
        | "already_redeemed"
        | "assistant_connect_limit";
      readonly retryAt?: string;
    };

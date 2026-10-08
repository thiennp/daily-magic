import { MY_BOTS_COPY } from "@/features/my-bots/myBotsCopy.constant";

/** Client-side check before spending a claim attempt; null when the code looks valid. */
export const validateClaimCode = (code: string): string | null => {
  const value = code.trim();
  if (value === "") return MY_BOTS_COPY.claimEnterCode;
  if (!value.startsWith("awc_claim_")) return MY_BOTS_COPY.claimBadFormat;
  return null;
};

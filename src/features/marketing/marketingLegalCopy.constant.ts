import { MARKETING_PRIVACY_DOC } from "@/features/marketing/marketingPrivacyCopy.constant";
import { MARKETING_TERMS_DOC } from "@/features/marketing/marketingTermsCopy.constant";
import type { MarketingLegalDoc } from "@/features/marketing/marketingLegalDoc.type";

export type {
  MarketingLegalDoc,
  MarketingLegalSection,
} from "@/features/marketing/marketingLegalDoc.type";

/** Claude "Privacy and Terms" design — shared meta chip. */
export const MARKETING_LEGAL_UPDATED = "Updated 1 October 2026";

export const MARKETING_PRIVACY_COPY: MarketingLegalDoc = MARKETING_PRIVACY_DOC;
export const MARKETING_TERMS_COPY: MarketingLegalDoc = MARKETING_TERMS_DOC;

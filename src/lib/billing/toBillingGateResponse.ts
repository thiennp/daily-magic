import type { BillingGateDenial } from "@/lib/billing/types/BillingGateDenial.type";

/** Map a billing denial to the shared API JSON shape (403). */
export const toBillingGateResponse = (denial: BillingGateDenial): Response =>
  Response.json(
    { error: denial.errorMessage, code: denial.code },
    { status: 403 },
  );

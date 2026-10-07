import type { BillingGateDenial } from "@/lib/billing/types/BillingGateDenial.type";

/** Thrown by computer-pair HARD gate so API layers can map status codes. */
export class BillingGateError extends Error {
  readonly code: BillingGateDenial["code"];

  constructor(denial: BillingGateDenial) {
    super(denial.errorMessage);
    this.name = "BillingGateError";
    this.code = denial.code;
  }
}

export const isBillingGateError = (error: unknown): error is BillingGateError =>
  error instanceof BillingGateError;

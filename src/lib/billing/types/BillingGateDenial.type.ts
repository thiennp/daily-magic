export type BillingGateDenial = {
  readonly ok: false;
  readonly code:
    | "computer_limit"
    | "assistant_connect_limit"
    | "cloud_message_storage_off"
    | "trial_closed";
  readonly errorMessage: string;
};

export type BillingGateOk = { readonly ok: true };

export type BillingGateResult = BillingGateOk | BillingGateDenial;

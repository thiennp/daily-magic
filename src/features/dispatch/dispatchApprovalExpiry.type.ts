/** What the run approval card shows about its 15-minute window. */
export type DispatchApprovalExpiryView =
  | { readonly kind: "none" }
  | { readonly kind: "open"; readonly line: string }
  | { readonly kind: "ended"; readonly title: string; readonly body: string };

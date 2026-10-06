/** Locked EN for the device-code verify page (S1 minimal; S4 polishes). */
export const DEVICE_VERIFY_COPY = {
  title: "Approve this assistant",
  ownerLine: "You'll be this assistant's owner",
  codeLabel: "Code",
  clientLabel: "Assistant",
  clientFallback: "this assistant",
  confirm: "Confirm",
  deny: "Deny",
  confirmed: "Confirmed. The assistant can finish connecting now.",
  denied: "You denied this request. It did not get access.",
  expired: "This code expired. The assistant must start again.",
  notFound: "That code was not found.",
  alreadyDecided: "This code was already used.",
  loginRequired: "Sign in to confirm ownership of this assistant.",
} as const;

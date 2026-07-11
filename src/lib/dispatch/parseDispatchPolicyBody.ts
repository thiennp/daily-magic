import {
  isDispatchPolicy,
  type DispatchPolicyValue,
} from "@/lib/dispatch/DispatchPolicy.constant";

export const parseDispatchPolicyBody = (
  body: unknown,
): DispatchPolicyValue | null | undefined => {
  if (!body || typeof body !== "object") {
    return undefined;
  }

  const policy = (body as { readonly dispatchPolicy?: unknown }).dispatchPolicy;

  if (policy === null) {
    return null;
  }

  if (typeof policy === "string" && isDispatchPolicy(policy)) {
    return policy;
  }

  return undefined;
};

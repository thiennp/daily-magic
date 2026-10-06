import { DISPATCH_APPROVAL_CARD_COPY as C } from "@/features/dispatch/dispatchApprovalCardCopy.constant";

/** Pure: card body with the requester's name or label, or the no-name line. */
export const formatDispatchApprovalCardBody = (
  requester: string | null,
): string => {
  const name = requester?.trim() ?? "";
  return name.length > 0 ? C.body.replace("{requester}", name) : C.bodyNoRequester;
};

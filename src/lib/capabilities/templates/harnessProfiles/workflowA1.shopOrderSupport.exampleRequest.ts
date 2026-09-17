export const SHOP_ORDER_SUPPORT_EXAMPLE_REQUEST = `Handle customer support for shopName using inboxFocus.

Read ordersFolderPath and policiesFolderPath on this Mac before drafting anything.
Honor replyTone when set; otherwise use warm, concise, policy-safe language.
Append resolutions to supportLogPath when set after the operator sends.

## 1. Ground truth from orders and policies
- Open the inbox scope described in inboxFocus (unread, WISMO, refund threads, etc.).
- Load shipping, refund, and replacement rules from policiesFolderPath.
- Match each thread to orders under ordersFolderPath (email, order ID, carrier, tracking, last scan).
- Note gaps (missing tracking, late shipment) without promising outcomes outside policy.

## 2. Draft one reply per thread (facts first)
- Answer the customer question in the first sentence.
- State carrier, tracking link, and last scan when available.
- Offer next steps only when allowed by policy (wait window, replacement, refund).
- Present draft previews in [[PROGRESS]]; the operator approves at the next human checkpoint.
- Do not send email or mark tickets resolved — sending stays with the operator.

## 3. After approval — log and hand off to send
- Apply per-thread edits from the operator before treating a draft as approved.
- Prepare one-line resolution summaries for supportLogPath when configured.
- Remind the operator to paste approved replies into Shopify, Etsy, email, or their helpdesk.
- Emit [[PROGRESS]] through: ground truth → drafts → approval → log lines → operator send.`;

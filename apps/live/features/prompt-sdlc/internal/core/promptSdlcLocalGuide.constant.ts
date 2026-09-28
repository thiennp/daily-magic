export const PROMPT_SDLC_LOCAL_GUIDE_EXAMPLE = "support-reply";

export const PROMPT_SDLC_LOCAL_GUIDE_GOAL =
  "When this prompt is used on a customer email, the reply answers the question they asked, uses only facts present in the thread, and offers a refund only when the policy text allows that exact case.";

export const PROMPT_SDLC_LOCAL_GUIDE_WEAK_PROMPT = [
  "You are a support agent. Read the customer's email and write a helpful, professional reply.",
  "Solve their problem. If they ask for a refund, follow the refund policy.",
  "Keep the tone warm.",
].join("\n");

export const PROMPT_SDLC_LOCAL_GUIDE_STRONGER_PROMPT = [
  "Write the one reply the customer will read.",
  "",
  "You will be given:",
  "- CUSTOMER_MESSAGE",
  "- ORDER_FACTS, the only facts that exist",
  "- REFUND_POLICY, the only rules that exist",
  "",
  "Steps:",
  "1. Name the question they actually asked, in one sentence inside the reply.",
  "2. Answer from ORDER_FACTS. When a needed fact is absent, say it is not in the thread and ask for that one fact.",
  "3. Offer a refund only by quoting the REFUND_POLICY rule that matches this case. Otherwise say a refund is not available under the policy you were given.",
  "",
  "Reply text only. Leave out your reasoning and any restatement of these steps.",
].join("\n");

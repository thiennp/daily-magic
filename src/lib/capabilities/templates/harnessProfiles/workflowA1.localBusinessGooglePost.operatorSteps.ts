import type OperatorStepDefinition from "@/lib/workflows/types/OperatorStepDefinition.type";

export const LOCAL_BUSINESS_GOOGLE_POST_OPERATOR_STEPS: readonly OperatorStepDefinition[] =
  [
    {
      id: "local-business-google-post-operator-verify",
      title: "Verify hours, offer, and photos",
      content: [
        "1. Confirm hoursOrOffer and postTopic match what the business can honor.",
        "2. Open Google Business Profile in the browser if you want a live check.",
        "3. Reply ready when facts are correct for the post.",
      ].join("\n"),
    },
    {
      id: "local-business-google-post-operator-approve",
      title: "Approve the Google post copy",
      content: [
        "1. Review headline, body, CTA, and any promo dates for accuracy.",
        "2. Reject misleading discounts or expired events.",
        "3. Reply approve when you are ready to publish.",
      ].join("\n"),
    },
    {
      id: "local-business-google-post-operator-publish",
      title: "Publish on Google Business Profile",
      content: [
        "1. Create the post in Google Business Profile; the agent does not log in.",
        "2. Attach photos from your Mac if the draft references them.",
        "3. Ask the agent to append the post to postHistoryPath.",
      ].join("\n"),
    },
  ];

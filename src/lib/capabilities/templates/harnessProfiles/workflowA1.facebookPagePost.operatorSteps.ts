import type OperatorStepDefinition from "@/lib/workflows/types/OperatorStepDefinition.type";

export const FACEBOOK_PAGE_POST_OPERATOR_STEPS: readonly OperatorStepDefinition[] =
  [
    {
      id: "facebook-page-post-operator-login",
      title: "Log in to Facebook and open the Page",
      content: [
        "1. In Chrome, log in to Facebook with an account that can publish to the target Page.",
        "2. Open the Page and confirm you can create a post (not just view insights).",
        "3. Reply ready in the live terminal when the Page composer is reachable.",
      ].join("\n"),
    },
    {
      id: "facebook-page-post-operator-history",
      title: "Keep a post history file on your Mac",
      content: [
        "1. Maintain the post history path from the workflow field (JSON or markdown is fine).",
        "2. Each entry should include date, Page name, caption snippet, and media type.",
        "3. Tell the agent if the file is missing so it can create the first entry after publish.",
      ].join("\n"),
    },
    {
      id: "facebook-page-post-operator-approve",
      title: "Approve caption and media before publish",
      content: [
        "1. Review the generated caption, hashtags, and image or video preview.",
        "2. Ask for edits if the post is too similar to recent history or off-brand.",
        "3. Reply approve only when you want the agent to publish to the Page.",
      ].join("\n"),
    },
  ];

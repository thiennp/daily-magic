import type OperatorStepDefinition from "@/lib/workflows/types/OperatorStepDefinition.type";

export const EMAIL_INBOX_REPLY_OPERATOR_STEPS: readonly OperatorStepDefinition[] =
  [
    {
      id: "email-inbox-reply-operator-login",
      title: "Open your inbox in the browser",
      content: [
        "1. In Chrome or Mail, log in to the mailbox you want the agent to work from.",
        "2. Open the inbox view that matches inboxFocus (unread, sender, or thread).",
        "3. Reply ready in the live terminal when the messages to handle are visible.",
      ].join("\n"),
    },
    {
      id: "email-inbox-reply-operator-knowledge",
      title: "Confirm the knowledge folder on your Mac",
      content: [
        "1. Verify knowledgeFolderPath exists and the agent can read it from this Mac.",
        "2. Keep FAQs, policies, and product notes there as markdown, text, or PDF.",
        "3. Tell the agent if anything important lives in a subfolder it should scan.",
      ].join("\n"),
    },
    {
      id: "email-inbox-reply-operator-approve",
      title: "Approve each reply before it is sent",
      content: [
        "1. Review every drafted reply for accuracy against the knowledge folder.",
        "2. Edit or reject replies that guess beyond the provided material.",
        "3. Reply approve per message when you want the agent to send (or save as draft).",
      ].join("\n"),
    },
  ];

import type { ShowcaseArticleSection } from "@/features/showcases/types/ShowcaseArticle.type";

const IMAGE_DIR = "/showcases/bot-to-bot";

export const botToBotFlowSections: readonly ShowcaseArticleSection[] = [
  {
    heading: "4. One bot hands a task to the other",
    bullets: [
      "Anna asks Drafter to have Coder build the pricing page from the repo",
      "Drafter dispatches the task to Coder and tells Anna it sent",
      "The server wakes Coder through Coder's own Grok routine webhook. No bot polls on a timer",
      "Coder posts one short received line in its own window within 30 seconds",
      "The server sends Drafter a task.processing receipt, and Drafter relays it to Anna",
    ],
    image: {
      src: `${IMAGE_DIR}/mock-received-and-receipt.png`,
      alt: "Two chat windows: the recipient's received line and the sender relaying the receipt",
      caption:
        "Illustration of live behavior: the recipient's received line and the sender relaying task.processing. The chat windows belong to the bot platform. Names are example data.",
    },
  },
  {
    paragraphs: [
      "As the owner, Anna sees the same traffic in the project's Messages: what was sent, from whom to whom, and whether it was acked.",
    ],
    image: {
      src: `${IMAGE_DIR}/real-project-inbox.png`,
      alt: "Messages panel listing task.assign, task.processing, task.status and peer.joined",
      caption:
        "Real screen: Messages, with message kinds and Acked / Unacked. Names and message text are example data.",
    },
  },
  {
    heading: "5. Status and silence",
    bullets: [
      "While working, Coder sends a status every 5 minutes, and Drafter relays it",
      "After 5 minutes with no activity from Coder, the server sends Drafter a notice; Drafter tells Anna and asks Coder once",
      "At 10 minutes with no activity, the server marks the delivery blocked and tells Drafter, which tells Anna and stops",
      "Blocked is final. A late reply cannot reopen it; Anna sends a new task instead",
    ],
    image: {
      src: `${IMAGE_DIR}/mock-silence-and-blocked.png`,
      alt: "Mock of the 5-minute silence notice and the 10-minute blocked state",
      caption:
        "Illustration of live behavior: the 5-minute silence notice and the final 10-minute blocked state. Names are example data.",
    },
  },
  {
    heading: "6. Done or blocked, then ack",
    paragraphs: [
      "Coder sends done or blocked back to Drafter, then acks the message it handled. Only the recipient can ack, so acked always means the bot that got the work says it handled it.",
    ],
  },
  {
    heading: "When you don't need it",
    bullets: [
      "You are a single owner with a few bots. Talking to them directly is usually faster",
      "It is a quick one-off ask. Setting up a project and webhooks costs more than the question",
      "Talking to your own bot is simpler, and for most tasks it is",
    ],
  },
  {
    heading: "When it helps",
    bullets: [
      "Two people's bots need to pass work back and forth, and neither person wants to be the relay",
      "Someone is away. Drafter can still hand a task to Coder, and the receipt tells Anna it landed",
      "One person owns the project, each bot knows its part, and every member bot can read the same project links",
    ],
  },
  {
    heading: "How it is built",
    paragraphs: [
      "The join steps are one function per file, called in order by one orchestrator: connect, redeem, access check, briefing and peers, dispatch, wake webhook, leave. On the message side, the wake step and the silence check each live in their own file, and the server runs the silence check every 60 seconds.",
    ],
    image: {
      src: `${IMAGE_DIR}/diagram-orchestrator.png`,
      alt: "Diagram of the join orchestrator calling one step function per file",
      caption:
        "Diagram: the join orchestrator and its step files, plus the message-side wake step and silence check.",
    },
  },
  {
    heading: "What's next",
    paragraphs: [
      "Coming soon: a member-side webhook form for bots the owner does not own.",
      'Coming soon: a short, debounced "project updated" wake, so member bots read the project info again when the owner changes it, its folders or its links.',
    ],
  },
];

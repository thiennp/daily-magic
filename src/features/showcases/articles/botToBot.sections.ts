import type { ShowcaseArticleSection } from "@/features/showcases/types/ShowcaseArticle.type";

const IMAGE_DIR = "/showcases/bot-to-bot";

export const botToBotSections: readonly ShowcaseArticleSection[] = [
  {
    paragraphs: [
      "A few people are starting to run bots of their own, and sometimes two of them end up on the same project. Bot-to-bot connection is for that case. It is one option, not the only one: often, talking to your own bot is enough.",
      "Example: Anna and Ben are colleagues on a project called Docs site refresh, and both have started using Grok Bot. Anna's bot, Drafter, plans pages. Ben's bot, Coder, builds them. When Drafter has a page ready, it hands the task to Coder through the project, so Anna does not have to message Ben and Ben does not copy anything across.",
      "The same shape can work at home: two family members who both use bots, planning a trip, with a NotebookLM link added to the project.",
    ],
    image: {
      src: `${IMAGE_DIR}/diagram-flow-sequence.png`,
      alt: "Sequence diagram of the bot-to-bot flow from invite to ack",
      caption:
        "Diagram: the whole flow, from invite to ack, with generic roles (owner, Bot A, Bot B), including the server-side silence handling in step 5.",
    },
  },
  {
    heading: "Who does what",
    bullets: [
      "Agent Witch is the harness for agent work",
      "Agent Witch Cloud is access control plus the registry: who is in the project, who may message whom, and a thin inbox for short messages",
      "Grok Bot is the bot platform in this example; each Grok Bot is woken through its own routine webhook",
      "The owner can add links to the project, such as a GitHub repo or a NotebookLM notebook. Each member bot can read them with the rest of the project info whenever it asks; opening or editing them depends on each bot's own access, and Agent Witch does not grant access to those services",
      "Coming soon: shared playbooks and skills in a project, which members can list and pull, with versions and a way to revoke them",
    ],
  },
  {
    heading: "Which bots can join",
    bullets: [
      "Grok Bot — supported via routine webhook; covered by automated tests",
      "Any agent that can call the agent-access API and receive an HMAC-signed webhook (for example Muse) — supported via HMAC webhook, not yet tested end to end",
    ],
  },
  {
    heading: "1. Join by invite prompt",
    bullets: [
      "Anna creates a bot invite and clicks Copy prompt. She shares the prompt, not a link",
      "Ben gives the prompt to Coder. Coder redeems it and checks its own status",
      "If Coder is pending, Anna clicks Approve and picks a project nickname. A bot that is already an active member skips Approve",
      "Anna can Revoke a bot at any time, bots can leave on their own, and no bot can approve itself",
    ],
    image: {
      src: `${IMAGE_DIR}/real-project-access-people.png`,
      alt: "People panel with a pending bot awaiting Approve and two active members",
      caption:
        "Real screen: People, with a pending bot (Approve, Deny, nickname) and two active members. Names are example data.",
    },
  },
  {
    heading: "2. The owner enters the bot's wake webhook",
    bullets: [
      "A bot cannot see its own routine webhook POST URL or key, so it never asks for them in chat",
      "Coder tells Ben where to find them: in the Grok Bot desktop app, the bot's info pane, under Routines",
      "The project owner opens Project Access → People → Members, clicks Grok webhook on that bot, and enters the POST URL and Key in two masked fields. The key is stored and never shown again",
      "Coder then runs a read-only status check to confirm the webhook is registered",
      "Coming soon: a member-side form, so people can enter the webhook for bots the owner does not own",
    ],
    image: {
      src: `${IMAGE_DIR}/real-webhook-key-fields.png`,
      alt: "Grok webhook form under Members with masked POST URL and Key fields",
      caption:
        "Real screen: Project Access → People → Members → Grok webhook, with masked POST URL and Key fields. Project and bot names are example data.",
    },
  },
  {
    heading: "3. The bot reads the room",
    paragraphs: [
      "Each bot can read the shared project info and links (name, peers, folders, repo links) whenever it asks. Coder reads it when it joins and prints a short summary for Ben. Nothing is pushed to bots when that info changes; a bot reads it again when it needs fresh details.",
      'Coming soon: when the owner changes the project info, folders or links, member bots get a short, debounced "project updated" wake and read the project info again.',
    ],
  },
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
      "Coming soon: shared playbooks and skills in a project, which members can list and pull, with versions and a way to revoke them.",
    ],
  },
];

import { AWC_BOT_TO_BOT_SUPPORT_ROWS } from "@/features/projects/access/invites/awcBotToBotSupportCopy.constant";
import type { ShowcaseArticleSection } from "@/features/showcases/types/ShowcaseArticle.type";

const IMAGE_DIR = "/showcases/bot-to-bot";

export const botToBotSetupSections: readonly ShowcaseArticleSection[] = [
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
      "AgentWitch is the harness for agent work",
      "AgentWitch Cloud is access control plus the registry: who is in the project, who may message whom, and a thin inbox for short messages",
      "Grok Bot is the bot platform in this example; each Grok Bot is woken through its own wake link",
      "The owner can add links to the project, such as a GitHub repo or a NotebookLM notebook. Each member bot can read them with the rest of the project info whenever it asks; opening or editing them depends on each bot's own access, and AgentWitch does not grant access to those services",
      "Shared project skills are live on Project Access → Skills (Publish / Save draft / Revoke). Owner and active members can share short text skills (up to 64KB each, last 20 versions kept). Other playbooks and files still stay on local machines",
    ],
  },
  {
    heading: "Which bots can join",
    bullets: AWC_BOT_TO_BOT_SUPPORT_ROWS.map((row) => row.label),
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
    heading: "2. The owner enters the bot's wake link",
    bullets: [
      "A bot cannot see its own wake link or key, so it never asks for them in chat",
      "Coder tells Ben where to find them: in the Grok Bot desktop app, the bot's info pane, under Routines",
      "The project owner opens Project Access → People → Members, clicks Grok wake link on that bot, and enters the wake link and Key in two masked fields. The key is stored and never shown again",
      "Coder then checks that the wake link is registered",
      "Coming soon: a member-side form, so people can enter the wake link for bots the owner does not own",
    ],
    image: {
      src: `${IMAGE_DIR}/real-webhook-key-fields.png`,
      alt: "Grok wake-link form under Members with masked wake link and Key fields",
      caption:
        "Real screen: Project Access → People → Members → Grok wake link, with masked wake link and Key fields. Project and bot names are example data.",
    },
  },
  {
    heading: "3. The bot reads the room",
    paragraphs: [
      "Each bot can read the shared project info and links (name, peers, folders, repo links) whenever it asks. Coder reads it when it joins and prints a short summary for Ben. Nothing is pushed to bots when that info changes; a bot reads it again when it needs fresh details.",
      'Coming soon: when the owner changes the project info, folders or links, member bots get a short, debounced "project updated" wake and read the project info again.',
    ],
  },
];

import { botToBotSections } from "@/features/showcases/articles/botToBot.sections";
import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

const botToBot: ShowcaseArticle = {
  slug: "bot-to-bot",
  title: "When two people's bots share one project",
  subtitle:
    "One option for when two people who both use bots end up on the same project: their Grok Bots hand tasks across it.",
  category: "Bot to bot",
  supportLevel: "partial",
  readMinutes: 6,
  whatYouNeed: [
    "One project with an owner who approves who joins",
    "Two people who both use Grok Bot, with their bots joined by Copy prompt",
    "Each bot's wake link entered by the owner under Members",
  ],
  tryNext: { label: "Projects", href: "/projects" },
  relatedShowcases: [
    {
      slug: "agent-delegates-inside-your-company",
      label: "Agent to agent inside your company",
    },
  ],
  sections: botToBotSections,
};

export default botToBot;

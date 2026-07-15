import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

const notJustAnotherChatgpt: ShowcaseArticle = {
  slug: "not-just-another-chatgpt",
  title: "This is not just another ChatGPT tab",
  subtitle: "Dispatch, local files, shared playbooks, and a paper trail.",
  category: "Common questions",
  supportLevel: "full",
  readMinutes: 3,
  whatYouNeed: [
    "A Mac connected to run jobs (yours or a teammate's)",
    "At least one saved capability in the library",
  ],
  tryNext: {
    label: "Run your first task",
    href: "/showcases/first-agent-task-in-5-minutes",
  },
  sections: [
    {
      paragraphs: [
        "Chat apps answer in a window. Agent Witch sends work to a machine — with your rules, local context, and a record you can open next Monday. That difference matters when tasks repeat and teammates delegate.",
      ],
    },
    {
      heading: "Chat is for thinking out loud",
      bullets: [
        "One-off questions and brainstorming",
        "Paste context manually each time",
        "History is a scroll, not an operations log",
      ],
    },
    {
      heading: "Agents are for repeat work",
      bullets: [
        "Saved prompts and workflows in a library",
        "Runs on the Mac where files already live",
        "Team dispatch — you ask, their Mac executes",
        "Run again without retyping the whole prompt",
      ],
    },
    {
      heading: "Still use chat when it fits",
      paragraphs: [
        'Quick "how do I phrase this email?" stays in ChatGPT or Claude. Agent Witch earns its place when the same job shows up every week and you are tired of reconstructing the prompt from memory.',
      ],
    },
  ],
};

export default notJustAnotherChatgpt;

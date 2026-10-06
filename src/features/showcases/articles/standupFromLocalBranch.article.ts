import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

const standupFromLocalBranch: ShowcaseArticle = {
  slug: "standup-from-local-branch",
  title: "Standup notes from your local branch — without pasting diffs",
  subtitle:
    "Point the agent at the repo on your computer; get yesterday's work in plain English.",
  category: "Workflows",
  supportLevel: "full",
  readMinutes: 4,
  whatYouNeed: [
    "Mac connected with the repo already checked out locally",
    "A saved workflow or one-shot task with repo path and date range fields",
  ],
  tryNext: {
    label: "Open projects",
    href: "/projects?intent=new-task",
  },
  sections: [
    {
      paragraphs: [
        "Engineers lose ten minutes every morning reconstructing what changed. ChatGPT cannot see your branch. AgentWitch runs on the computer that already has the checkout — you describe the scope, it reads local git state, and you paste the summary into standup or Slack.",
      ],
    },
    {
      heading: "Example prompt shape",
      bullets: [
        "Repo: ~/projects/my-app",
        "Since: yesterday 5pm",
        "Output: 3 bullets — shipped, in progress, blocked",
        "Do not push or commit anything",
      ],
    },
    {
      heading: "Why this beats chat",
      bullets: [
        "Files stay on your machine — no upload of private diffs",
        "Same prompt every day → save as a library workflow",
        "Run again from Reports when standup time moves",
      ],
    },
    {
      heading: "Best results",
      paragraphs: [
        "Keep the computer with the repo awake and connected. Run history stays in your browser so you can Run again from the same place next week.",
      ],
    },
  ],
};

export default standupFromLocalBranch;

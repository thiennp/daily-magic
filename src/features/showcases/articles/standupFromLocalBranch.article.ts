import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

const standupFromLocalBranch: ShowcaseArticle = {
  slug: "standup-from-local-branch",
  title: "Standup notes from your local branch — without pasting diffs",
  subtitle:
    "Point the agent at the repo on your Mac; get yesterday's work in plain English.",
  category: "Workflows",
  supportLevel: "full",
  readMinutes: 4,
  whatYouNeed: [
    "Mac connected with the repo already checked out locally",
    "A saved workflow or one-shot task with repo path and date range fields",
  ],
  tryNext: {
    label: "Open Send a task",
    href: "/?sendTask=1",
  },
  sections: [
    {
      paragraphs: [
        "Engineers lose ten minutes every morning reconstructing what changed. ChatGPT cannot see your branch. Agent Witch runs on the Mac that already has the checkout — you describe the scope, it reads local git state, and you paste the summary into standup or Slack.",
      ],
    },
    {
      heading: "Example prompt shape",
      bullets: [
        "Repo: ~/projects/daily-magic",
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
        "Run again from Job history when standup time moves",
      ],
    },
    {
      heading: "Best results",
      paragraphs: [
        "Keep the Mac with the repo awake and connected. Job history stays in your browser so you can Run again from the same place next week.",
      ],
    },
  ],
};

export default standupFromLocalBranch;

import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

const promptOptimizerInTheProject: ShowcaseArticle = {
  slug: "prompt-optimizer-in-the-project",
  title: "A prompt optimizer that can see the project",
  subtitle:
    "The judge and the improver run in the folder on your Mac, with the Playbook and the code.",
  category: "Common questions",
  supportLevel: "full",
  readMinutes: 3,
  whatYouNeed: [
    "Agent Witch Live on this Mac",
    "A project folder the prompt is about",
  ],
  tryNext: {
    label: "Open the prompt optimizer",
    href: "/prompt-sdlc",
  },
  relatedShowcases: [
    {
      slug: "why-local-mac-not-cloud",
      label: "Why runs happen on a Mac",
    },
  ],
  sections: [
    {
      paragraphs: [
        "A prompt optimizer that runs somewhere else only sees the text you paste. It cannot open the Playbook or the code on your Mac, so its score is a guess about a prompt in the abstract.",
        "The prompt optimizer is different because it runs inside that local context. You choose the project folder. The judge and the improver run there, so they can read the harness and the code. The score is about this project.",
      ],
    },
    {
      heading: "What you do",
      bullets: [
        "Open the prompt optimizer in Agent Witch Live on this Mac",
        "Paste the prompt and the goal, and choose the project folder",
        "Choose who scores the prompt and who rewrites it, or do one of those steps yourself",
        "Set the pass score. The usual mark is 90",
      ],
    },
    {
      heading: "What a bot on this Mac does",
      paragraphs: [
        "A bot does not ask you to paste the prompt into a different optimizer. Before it sends a Task, it runs the prompt optimizer on this Mac, waits until the run passes, and uses that prompt. The steps are on the agent guideline.",
      ],
    },
  ],
};

export default promptOptimizerInTheProject;

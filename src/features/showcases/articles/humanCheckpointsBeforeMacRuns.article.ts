import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

const humanCheckpointsBeforeMacRuns: ShowcaseArticle = {
  slug: "human-checkpoints-before-mac-runs",
  title: "Human checkpoints before the Mac runs",
  subtitle:
    "You approve, upload, and send. The Mac agent only sees a short summary.",
  category: "Workflows",
  supportLevel: "full",
  readMinutes: 4,
  whatYouNeed: [
    "A workflow with operator steps (Marketplace A1 presets include examples)",
    "Mac connected for the automated portion",
    "You at the keyboard for steps the agent cannot do (email, contracts, uploads)",
  ],
  tryNext: {
    label: "Browse Marketplace presets",
    href: "/marketplace",
  },
  relatedShowcases: [
    {
      slug: "request-sensitive-work-with-approval",
      label: "Manager approval before sensitive runs",
    },
    {
      slug: "schedule-workflow-on-your-mac",
      label: "Schedule the Mac portion on a timer",
    },
    {
      slug: "see-what-the-agent-did",
      label: "Read the run log after dispatch",
    },
  ],
  sections: [
    {
      paragraphs: [
        "Some work must stay human: approving a client proposal, uploading to a portal, or confirming budget before anything sends. Operator steps live in the browser checklist — not as files copied onto your Mac — while Claude still runs locally for research and drafting.",
      ],
    },
    {
      heading: "What you see in the task composer",
      bullets: [
        "An amber “Your steps” panel lists each checkpoint with full instructions",
        "Workflow fields still collect names, dates, and paths as usual",
        "Only checkpoint titles are appended to the Mac prompt as a short summary",
        "Agent harness files install to ~/.agent-witch; operator rules stay in the app",
      ],
    },
    {
      heading: "Example: freelancer client proposal preset",
      bullets: [
        "Confirm brief and portfolio fit (you)",
        "Mac drafts scope, timeline, and pricing from your folders",
        "You approve before anything is sent",
        "You send through Upwork or email; the agent logs the pitch path",
      ],
    },
    {
      heading: "How this differs from manager approval",
      paragraphs: [
        "Operator steps are part of the playbook — they guide the person at the keyboard on every run. Company approval dispatch is a separate gate for sensitive jobs on someone else's Mac. You can use both: approval for governance, operator steps for human-only actions.",
      ],
    },
    {
      heading: "Honest limits",
      bullets: [
        "The browser checklist does not auto-tick steps; you follow them manually",
        "Mid-run questions use the agent input protocol when the CLI supports it",
        "Teammates see checkpoint titles in the prompt, not your private portal passwords",
      ],
    },
  ],
};

export default humanCheckpointsBeforeMacRuns;

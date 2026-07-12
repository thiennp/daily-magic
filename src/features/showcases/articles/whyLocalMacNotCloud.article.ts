import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

const whyLocalMacNotCloud: ShowcaseArticle = {
  slug: "why-local-mac-not-cloud",
  title: "Why runs happen on a Mac, not mystery cloud VMs",
  subtitle: "Local files, harness rules, and clearer ownership for companies.",
  category: "Common questions",
  supportLevel: "full",
  readMinutes: 4,
  whatYouNeed: [
    "A Mac you control (or a teammate's, with policy)",
    "Agent Witch client installed and paired",
  ],
  tryNext: {
    label: "See one employee, one agent",
    href: "/showcases/one-employee-one-agent",
  },
  sections: [
    {
      paragraphs: [
        "Uploading client folders to a random SaaS sandbox makes security teams nervous — often for good reason. Agent Witch dispatches to a known machine: yours or a colleague's, with harness rules about what the agent can touch.",
      ],
    },
    {
      heading: "What local execution gives you",
      bullets: [
        "Files stay on the Mac that already has access",
        'Clear executor in job history — not "the platform"',
        "Company can set group dispatch and approval policies",
        "Audit trail: requester, prompt, result, timestamp",
      ],
    },
    {
      heading: "Tradeoffs you accept",
      bullets: [
        "Executor must be online for send",
        "Each person maintains their own paired Mac",
        "Not a fit if you need 24/7 cloud runners with zero ops",
      ],
    },
    {
      heading: "Who this suits",
      paragraphs: [
        "Teams with Macs, sensitive repos, and repeat AI workflows who want delegation without shipping everything to a multi-tenant AI host. You still use Claude — the difference is where it runs and who can see the log.",
      ],
    },
  ],
};

export default whyLocalMacNotCloud;

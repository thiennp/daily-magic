import { buildShowcaseTeamDispatchArticleImage } from "@/features/showcases/buildShowcaseTeamDispatchArticleImage";
import { TEAM_DISPATCH_SHOWCASE_SCREEN } from "@/features/showcases/teamDispatchShowcaseScreens.constant";
import type { ShowcaseArticleSection } from "@/features/showcases/types/ShowcaseArticle.type";

export const agentDelegatesInsideYourCompanySections: readonly ShowcaseArticleSection[] =
  [
    {
      paragraphs: [
        "Agent Witch is not one cloud bot everyone shares. Each person keeps an agent on their Mac. Inside a company group, you become the requester and pick a teammate plus their published workflow — Claude runs on their machine with their repo paths and files.",
      ],
    },
    {
      heading: "Sample workflow: Repo branch standup",
      bullets: [
        "Template in Marketplace: Repo branch standup (teammate Mac)",
        "Fields: repo path on their Mac, branch name, optional since date",
        "Teammate publishes it to Library; you pick it under their assistant when sending",
        "Good demo prompt: summarize commits on feature/checkout for yesterday's standup",
      ],
    },
    {
      heading: "1. Open Send a task and choose the company",
      bullets: [
        "Home → Send a task (or /?sendTask=1)",
        "Under Who receives this task, pick your company — not My Mac (self)",
        "Select the teammate who owns the repo on their Mac",
        "Pick their published workflow (e.g. Repo branch standup)",
      ],
      image: buildShowcaseTeamDispatchArticleImage(
        TEAM_DISPATCH_SHOWCASE_SCREEN.REQUEST_TASK,
        {
          alt: "Send a task form with company, teammate, and workflow selected",
          caption:
            "Send a task to Alex Chen at Acme Design Co with the Repo branch standup workflow.",
        },
      ),
    },
    {
      heading: "2. Approval when policy requires it",
      bullets: [
        "Group dispatch policy can be open or approval",
        "If approval: job stays pending until the executor (or manager) taps Approve",
        "Executor must be online after approval for Claude to start",
        "Both sides see the run in Job history in their browsers",
      ],
      image: buildShowcaseTeamDispatchArticleImage(
        TEAM_DISPATCH_SHOWCASE_SCREEN.APPROVAL,
        {
          alt: "Dispatch approval modal for a teammate task",
          caption: "Pending repo standup request from Jamie Lee.",
        },
      ),
    },
    {
      heading: "3. Their Mac runs; you watch the terminal",
      bullets: [
        "After dispatch (or approval), command.claude.run reaches their Agent Witch client",
        "With session continuation, Claude reuses the warmed writer session",
        "Terminal stream chunks appear in your browser while they work locally",
        "Result lands in Job history for both requester and executor views",
      ],
      image: buildShowcaseTeamDispatchArticleImage(
        TEAM_DISPATCH_SHOWCASE_SCREEN.MAC_RUNNING,
        {
          alt: "Live terminal showing Claude output on teammate Mac",
          caption: "Standup bullets streaming from Alex's Mac.",
        },
      ),
    },
    {
      heading: "Agent-to-agent process (inside one company)",
      bullets: [
        "Requester agent (browser): composes prompt, picks executor + capability, sends over WebSocket/API",
        "Company gate: shared group membership and optional approval policy",
        "Executor agent (Mac): receives command.claude.run, streams terminal output back",
        "No mystery VM — executor is always a named person and Mac",
      ],
    },
    {
      heading: "Honest limits",
      paragraphs: [
        "Team dispatch needs real sign-in and database rows for groups, memberships, and published capabilities — the localhost dev dashboard mode only exercises self-dispatch. Job history is local-first per browser today, not a company-wide audit log.",
      ],
    },
  ];

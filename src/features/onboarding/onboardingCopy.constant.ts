/**
 * Shipping UI copy — Claude HTML + Product EN HARD freeze (2026-10-06).
 * assistant not bot; computer not machine in titles; AgentWitch one word.
 * First task = project chat only. Download AgentWitch Local always visible.
 */
export const ONBOARDING_COPY = {
  skipForNow: "Skip for now",
  skipConfirmTitle: "Skip setup for now?",
  skipConfirmGo: "Skip setup",
  skipNote: "Not now? Use Skip for now at the top. You can finish later.",
  stepOf: (n: number) => `Step ${n} of 4`,
  progressLabel: "Setup progress",
  skipToContent: "Skip to content",
  cancel: "Cancel",
  skipStepGo: "Skip this step",
  offlineBold: "No internet.",
  offlineText: " You can look around. Changes wait until it is back.",
  offlineWhy: "No internet connection.",

  welcomeTitle: "Welcome to AgentWitch",
  welcomeLead:
    "Hand work to assistants. Set up your first project in about five minutes.",
  welcomePts: [
    {
      title: "Give work to assistants",
      detail: "Say what you need. An assistant does it.",
    },
    {
      title: "Work in projects",
      detail: "Assistants, computers and people live together.",
    },
    {
      title: "Your files stay with you",
      detail: "Work happens on your own computer.",
    },
  ] as const,
  getStarted: "Get started",

  createTitle: "Create your first project",
  createLead:
    "A project is where your assistants, computers and people come together.",
  projectNameLabel: "Project name",
  projectNameHelp: "Letters, numbers, dots and dashes.",
  projectNameSavedAs: (slug: string) => `Saved as ${slug}`,
  nameIdeasLabel: "Ideas:",
  nameIdeas: ["my-first-project", "daily-helper", "team-notes"] as const,
  back: "Back",
  createProject: "Create project",
  creating: "Creating…",
  createdTitle: "Project created",
  createdLead: "Next, connect your computer so assistants can work.",
  createdOwnerLine: "You are the owner",
  openProject: "Open project",
  connectComputer: "Connect your computer",
  createSkipText:
    "Nothing runs outside a project, so you will need one later. You can create it from Projects.",

  machineTitle: "Connect your computer",
  machineTitleReady: "Your computer is ready",
  machineLead:
    "Assistants work on your own computer. Install AgentWitch Local and sign in.",
  machineLeadReady: (project: string) =>
    `Assistants in ${project} can work on it.`,
  machineSkipText:
    "Assistants need a computer to work on. You can connect one later from Home or Projects.",
  machineContinue: "Continue",
  machineSkipConfirmTitle: "Skip connecting a computer?",
  machineWaitingTitle: "Waiting for your computer…",
  machineWaitingText: "Keep AgentWitch Local open. This updates by itself.",
  machinePausedTitle: "Paused while offline",
  machinePausedText: "We will keep looking when the internet is back.",
  machineConnectedText: "is connected",
  machineNeedConnect: "Connect a computer first, or skip for now.",
  downloadTitle: "Download AgentWitch Local",
  downloadTitleAnother: "Connect another computer",
  downloadButton: "Download AgentWitch Local",

  botTitle: "Add an assistant",
  botLead: (project: string) =>
    `Choose who works in ${project}. Invite an assistant, then continue.`,
  botSkipText:
    "Without an assistant or tool nothing can run. You can add one later in your project.",
  botSkipConfirmTitle: "Skip adding an assistant?",
  botContinue: "Continue",
  botNeedAdd: "Add at least one assistant or tool, or skip for now.",
  botNothingAdded: "Nothing added yet",
  botAdded: (n: number, project: string) =>
    `${n} ${n === 1 ? "item" : "items"} added to ${project}`,
  botOpenTeam: "Open team invites in project",
  botSection: "Assistants",

  taskTitle: "Give your first task",
  taskLead: (project: string) =>
    `Assign work in ${project} chat — not on a separate New task page.`,
  taskSkipText:
    "You can give your first task any time from your project’s chat.",
  taskSkipConfirmTitle: "Skip the first task?",
  taskCta: "Open project chat",
  taskHint:
    "New tasks happen only through project chat. The chat dock opens so you can assign your first task.",
  finishSetup: "Finish setup",
} as const;

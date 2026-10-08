type HomeWhatYouCanDoAction =
  | { readonly kind: "link"; readonly label: string; readonly href: string }
  | { readonly kind: "connect" };

export interface HomeWhatYouCanDoItem {
  readonly id: string;
  readonly title: string;
  readonly body: string;
  readonly action: HomeWhatYouCanDoAction;
}

/** Design home-v1 "What you can do" accordion; targets are existing routes. */
export const HOME_WHAT_YOU_CAN_DO_ITEMS: readonly HomeWhatYouCanDoItem[] = [
  {
    id: "give-task",
    title: "Give a task to a bot",
    body: "Open a project, pick a bot and describe the task. It reports back in Activity.",
    action: { kind: "link", label: "Open projects", href: "/projects" },
  },
  {
    id: "wake-grok",
    title: "Wake a bot from Grok",
    body: "Save a wake link so a bot starts when someone mentions it.",
    action: { kind: "link", label: "Open projects", href: "/projects" },
  },
  {
    id: "share-playbook",
    title: "Share a playbook",
    body: "Publish an offering so other teams can find it in Marketplace.",
    action: { kind: "link", label: "Open Marketplace", href: "/marketplace" },
  },
  {
    id: "keep-files",
    title: "Keep files on your computers",
    body: "Project files stay on your computers. The cloud keeps members and activity.",
    action: { kind: "connect" },
  },
];

/**
 * Project Settings → Connections — Product EN from
 * docs/design/project-connections/COPY.md (EN PASS soft needles aligned).
 */
export const PROJECT_CONNECTIONS_COPY = {
  heading: "Connections",
  intro:
    "Link Slack, Linear, Gmail, GitHub, Notion, and Google Drive so assistants in this project can use them.",
  empty: "Connect a service so assistants in this project can use it.",
  vsResources:
    "Pasted links in Resources stay bookmarks. Connections are signed-in services.",
  vsConnectHint:
    "Connect pairs this computer. Connections link services for this project.",
  loading: "Loading connections…",
  error: "Could not load connections. Try again.",
  errorRetry: "Try again",
  unavailable: "Connections are not available on this deploy yet.",
  forbidden: "Only the project owner can connect or disconnect services.",
  statusConnected: "Connected",
  statusExpired: "Expired",
  statusError: "Needs attention",
  statusNone: "Not connected",
  actionConnect: "Connect",
  actionReconnect: "Reconnect",
  actionDisconnect: "Disconnect",
  connectedOn: "Connected {date}",
  reconnectHint:
    "Sign-in expired. Reconnect so assistants can keep using {service}.",
  disconnectTitle: "Disconnect {service}?",
  disconnectBody:
    "Assistants in this project will stop using {service} ({accountLabel}).",
  disconnectConfirm: "Disconnect",
  disconnectCancel: "Cancel",
  providerSlack: "Slack",
  providerLinear: "Linear",
  providerGmail: "Gmail",
  providerGithub: "GitHub",
  providerNotion: "Notion",
  providerGoogleDrive: "Google Drive",
  /** Design (AgentWitch – Project Connections). */
  aboutAria: "About Connections",
  errorTitle: "Could not load connections.",
  errorBody: "Check your internet connection, then try again.",
  viewOnly: "View only",
  summary: "{count} of {total} connected",
  summaryAttention: " · {count} need attention",
  summaryAttentionOne: " · 1 needs attention",
  attentionHint: "Access changed in {service}. Reconnect to continue.",
  connectTitle: "Connect {service}",
  reconnectTitle: "Reconnect {service}",
  connectBody:
    "A {service} sign-in window is open. Sign in and allow access for {project}.",
  connectScope:
    "Only assistants in this project can use it. You can disconnect any time.",
  connectWaiting: "Waiting for {service}…",
  connectReopen: "Open sign-in window again",
  connectFailedTitle: "{service} was not connected",
  connectFailedBody:
    "The sign-in window was closed or access was not allowed. Nothing changed.",
  connectCancel: "Cancel",
  connectTryAgain: "Try again",
  toastConnected: "{service} connected for this project.",
  toastDisconnected: "{service} disconnected.",
  disconnectFailed: "Could not disconnect {service}. Try again.",
  vsConnectionsTitle: "Connections",
  vsConnectionsBody:
    "Signed-in services for this project. Assistants use them while they work.",
  vsResourcesTitle: "Resources",
  vsResourcesBody:
    "Folders and Git links you paste. They stay bookmarks, with no sign-in.",
  vsOpenResources: "Open Resources",
  descSlack: "Read channels and post messages",
  descLinear: "Read and update issues",
  descGmail: "Read mail and write drafts",
  descGithub: "Read code, issues and pull requests",
  descNotion: "Read and update pages",
  descGoogleDrive: "Read and create files",
} as const;

export const formatProjectConnectionsCopy = (
  template: string,
  vars: Readonly<Record<string, string>>,
): string =>
  Object.entries(vars).reduce(
    (text, [key, value]) => text.replaceAll(`{${key}}`, value),
    template,
  );

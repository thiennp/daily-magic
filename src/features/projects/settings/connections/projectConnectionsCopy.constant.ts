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
} as const;

export const formatProjectConnectionsCopy = (
  template: string,
  vars: Readonly<Record<string, string>>,
): string =>
  Object.entries(vars).reduce(
    (text, [key, value]) => text.replaceAll(`{${key}}`, value),
    template,
  );

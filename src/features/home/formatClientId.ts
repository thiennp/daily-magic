export function formatClientId(clientId: string): string {
  if (clientId.length <= 12) {
    return clientId;
  }

  return `${clientId.slice(0, 8)}…${clientId.slice(-4)}`;
}
